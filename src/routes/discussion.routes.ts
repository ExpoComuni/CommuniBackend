import { Router } from "express";
import DiscussionService from "../services/discussion.services";
import UserService from "../services/user.services";
import { DiscussionTopics } from "../enum/discussion";

const router = Router();
const discussionService = new DiscussionService();
const userService = new UserService();

// Create a new discussion
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user
    const user = await userService.getUserById(userId);
    const newDiscussion = {
      user,
      ...req.body
    };
    
    // Create the discussion
    const discussion = await discussionService.createDiscussion(newDiscussion);
    res.json(discussion);
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
});

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await discussionService.getAllDiscussions();
    res.json(discussions);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve discussions", error: error.message });
  }
});

// Get a discussion by ID
router.get("/:id", async (req, res) => {
  try {
    const discussion = await discussionService.getDiscussionById(req.params.id);
    res.json(discussion);
  } catch (error: any) {
    res.status(404).json({ message: "Discussion not found", error: error.message });
  }
});

// Get discussions by topic
router.get("/topic/:topic", async (req, res) => {
  try {
    const { topic } = req.params;
    console.log(topic)

    const discussions = await discussionService.getDiscussionsByTopic(topic as DiscussionTopics) 

    res.json(discussions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
