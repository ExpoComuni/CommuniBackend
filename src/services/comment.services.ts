// src/services/comment.service.ts
import { Repository } from "typeorm";
import { Comment } from "../entity/Sql/comment";
import { Discussion } from "../entity/Sql/discussion";
import { User } from "../entity/Sql/User";
import DataSource from "../config/NeonDataSource";

class CommentService {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = DataSource.getRepository(Comment);
  }

  // Add a comment to a discussion
  public async addComment(content: string, user: User, discussion: Discussion): Promise<Comment> {
    const newComment = this.commentRepository.create({ content, createdBy: user, discussion });
    return await this.commentRepository.save(newComment);
  }

  // Get all comments for a specific discussion
  public async getCommentsByDiscussion(discussionId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { discussion:{ id: discussionId} },
      relations: ["createdBy"],
    });
  }

  // Get a comment by ID
  public async getCommentById(id: string): Promise<Comment> {
    
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ["discussion", "createdBy"],
    });
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  public async getAllComments():Promise<Comment[]>{
    return await this.commentRepository.find()
  }
}

export default CommentService;
