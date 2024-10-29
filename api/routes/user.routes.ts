import { Router } from "express";
import UserService from "@/services/user.services";

const router = Router();
const userService = new UserService();

// Create a new user
router.post("/create", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
    console.error(error)
  }
});

// Get all users
router.get("/get", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
});

// Update a user by ID
router.put("/update/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(404).json({ message: "Failed to update user", error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const success = await userService.deleteUser(id);
    if (success) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: "Invalid credentials", error: error.message });
  }
});

export default router;
