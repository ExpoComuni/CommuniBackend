import { Router } from "express";
import NewsService from "../services/news.services";

const router = Router();
const newsService = new NewsService();

// Create a new news entry
router.post("/", async (req, res) => {
  try {
    const news = await newsService.createNews(req.body);
    res.status(201).json(news);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create news", error: error.message });
    console.error(error)
  }
});

// Get all news entries
router.get("/", async (req, res) => {
  try {
    const newsList = await newsService.getAllNews();
    res.json(newsList);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve news", error: error.message });
  }
});

// Get news by ID
router.get("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await newsService.getNewsById(newsId);
    if (!news) {
      res.status(404).json({ message: "News not found" });
    } else {
      res.json(news);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve news", error: error.message });
  }
});

// Update news by ID
router.put("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const updatedNews = await newsService.updateNews(newsId, req.body);
    if (!updatedNews) {
      res.status(404).json({ message: "News not found" });
    } else {
      res.json(updatedNews);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update news", error: error.message });
  }
});

// Delete news by ID
router.delete("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const success = await newsService.deleteNews(newsId);
    if (success) {
      res.status(200).json({ message: "News deleted successfully" });
    } else {
      res.status(404).json({ message: "News not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete news", error: error.message });
  }
});

export default router;
