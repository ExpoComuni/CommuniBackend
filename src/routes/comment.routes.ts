// src/routes/comment.routes.ts
import { Router } from "express";
import CommentService from "../services/comment.services";
import UserService from "../services/user.services";
import DiscussionService from "../services/discussion.services";

const router = Router();
const commentService = new CommentService();
const userService = new UserService();
const discussionService = new DiscussionService();

// Add a comment to a discussion
router.post("/discussion/:discussionId/user/:userId", async (req, res) => {
  try {
    const  {content} = req.body;
    const { discussionId, userId } = req.params;

    // Fetch the user and discussion
    const user = await userService.getUserById(userId);
    const discussion = await discussionService.getDiscussionById(discussionId);

    // Add the comment
    const comment = await commentService.addComment(content, user, discussion);
    res.json(comment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all comments for a discussion
router.get("/discussion/:discussionId", async (req, res) => {
  try {
    const { discussionId } = req.params;

    // Get comments for the discussion
    const comments = await commentService.getCommentsByDiscussion(discussionId);
    res.json(comments);
  } catch (error: any) {
    res.status(404).json({ message: "Discussion not found", error: error.message });
  }
});

// Get a comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.json(comment);
  } catch (error: any) {
    res.status(404).json({ message: "Comment not found", error: error.message });
  }
});

router.get("/", async(req, res)=>{
  try {
    const comments = commentService.getAllComments();
  } catch (error:any) {
    throw new Error(error)
  }
})

export default router;
