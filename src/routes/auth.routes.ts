import { Router } from "express";
import AuthService from "../services/auth.services";
const authService = new AuthService();


const router = Router();
router.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.json(user);
    } catch (error: any) {
      res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
  });

export default router;