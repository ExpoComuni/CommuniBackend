import { Repository } from "typeorm";
import { News } from "../entity/MongoDB/news";
import MongoDataSource from "../config/MongoDataSource";


class NewsService {
  private newsRepository: Repository<News>;

  constructor() {
    this.newsRepository = MongoDataSource.getRepository(News);
  }

  // Create a new news entry
  public async createNews(newsData: Partial<News>): Promise<News> {
    const news = this.newsRepository.create(newsData);
    return await this.newsRepository.save(news);
}

  // Get all news entries
  public async getAllNews(): Promise<News[]> {
    return await this.newsRepository.find();
  }

  // Get news by ID
  public async getNewsById(id: string): Promise<News | null> {
    return await this.newsRepository.findOneBy(id as any);
  }

  // Update news by ID
  public async updateNews(newsId: string, updateData: Partial<News>): Promise<News | null> {
    const news = await this.getNewsById(newsId);
    if (!news) throw new Error("News not found");
    const updatedNews = Object.assign(news, updateData);
    return await this.newsRepository.save(updatedNews);
  }

  // Delete news by ID
  public async deleteNews(newsId: string): Promise<boolean> {
    const deleteResult = await this.newsRepository.delete(newsId);
    return deleteResult.affected !== 0;
  }
}

export default NewsService;
