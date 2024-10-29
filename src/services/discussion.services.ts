import { Repository } from "typeorm";
import { Discussion } from "../entity/Sql/discussion";
import DataSource from "../config/NeonDataSource";
import { DiscussionTopics } from "../enum/discussion";

class DiscussionService {
  private discussionRepository: Repository<Discussion>;

  constructor() {
    this.discussionRepository = DataSource.getRepository(Discussion);
  }

  // Create a new discussion
  public async createDiscussion(discussionData: Partial<Discussion>): Promise<Discussion> {
    const newDiscussion = this.discussionRepository.create(discussionData);
    return await this.discussionRepository.save(newDiscussion);
  }

  // Get all discussions
  public async getAllDiscussions(): Promise<Discussion[]> {
    return await this.discussionRepository.find();
  }

  // Get a discussion by ID
  public async getDiscussionById(id: string): Promise<Discussion> {
    const discussion = await this.discussionRepository.findOne({ where: { id } });
    if (!discussion) throw new Error("Discussion not found");
    return discussion;
  }

  // Get discussions by topic
  public async getDiscussionsByTopic(topic: DiscussionTopics): Promise<Discussion[]> {
    return await this.discussionRepository.find({ where: { topic }, relations:["createdBy"] });
  }
}

export default DiscussionService;
