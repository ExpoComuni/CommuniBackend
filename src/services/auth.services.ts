import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "@/entity/Sql/User";
import { Session } from "@/entity/Sql/Session";
import DataSource from "@/config/NeonDataSource";

class AuthService {
  private userRepository: Repository<User>;
  private sessionRepository: Repository<Session>;

  constructor() {
    this.userRepository = DataSource.getRepository(User);
    this.sessionRepository = DataSource.getRepository(Session);
  }

  // Validate the provided password against the stored hash
  private async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Create JWT
  private createToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "72h" });
  }

  // Store session in the database
  private async storeSession(jwtToken: string): Promise<Session> {
    const session = this.sessionRepository.create({ jwt: jwtToken });
    return await this.sessionRepository.save(session);
  }


  // Get a user by email
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    console.log(user);
    if (!user) throw new Error("User not found");
    return user;
  }

  // Login user and generate JWT
  public async login(email: string, password: string): Promise<{}> {
    const user = await this.getUserByEmail(email);
    

    if (!(await this.validatePassword(user, password))) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = this.createToken(user);

    // Store the session
    await this.storeSession(token);

    return {token, user};
  }
}

export default AuthService;
