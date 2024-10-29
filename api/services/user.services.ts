import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "@/entity/Sql/User";
import { Session } from "@/entity/Sql/Session";
import DataSource from "@/config/NeonDataSource";
import { UserInput } from "@/interfaces/user";

class UserService {
  private userRepository: Repository<User>;
  private sessionRepository: Repository<Session>;

  constructor() {
    this.userRepository = DataSource.getRepository(User);
    this.sessionRepository = DataSource.getRepository(Session);
  }

  // Generate a hashed password
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // Validate the provided password against the stored hash
  private async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Create JWT
  private createToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" });
  }

  // Store session in the database
  private async storeSession(jwtToken: string): Promise<Session> {
    const session = this.sessionRepository.create({ jwt: jwtToken });
    return await this.sessionRepository.save(session);
  }

  // Create a new user
  public async createUser(userInput: UserInput): Promise<User> {
    const hashedPassword = await this.hashPassword(userInput.password);
    const user = this.userRepository.create({ ...userInput, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  // Get all users
  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get a user by ID
  public async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    return user;
  }

  // Get a user by email
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    console.log(user);
    if (!user) throw new Error("User not found");
    return user;
  }

  // Update a user's details
  public async updateUser(userId: string, updateData: Partial<UserInput>): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error("User not found");

    // Update password if included in updateData
    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    const updatedUser = Object.assign(user, updateData);
    return await this.userRepository.save(updatedUser);
  }

  // Delete a user by ID
  public async deleteUser(userId: string): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(userId);
    return deleteResult.affected !== 0;
  }

  // Login user and generate JWT
  public async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    

    if (!(await this.validatePassword(user, password))) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = this.createToken(user);

    // Store the session
    await this.storeSession(token);

    return token;
  }
}

export default UserService;
