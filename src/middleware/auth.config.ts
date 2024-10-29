// import { Request, Response, NextFunction } from "express";
// import * as jwt from "jsonwebtoken";

// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Access denied, token missing!" });

//   jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err: any, decoded: any) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
    
//     // Store the decoded data (like user ID) in the request object
//     req.user = decoded;
//     next();
//   });
// };

// export default authenticateToken;
// x