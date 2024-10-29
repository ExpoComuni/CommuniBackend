import router from "./user.routes";
import userRoutes from "./user.routes";
import reportRoutes from './report.routes'
import newsRoutes from "./news.routes"
import authRoutes from "./auth.routes"
import eventRoutes from "./event.routes"
import discussionRoutes from "./discussion.routes"
import commentRoutes from "./comment.routes"
import { Router } from "express";

export interface RouteConfig {
  path: string;
  router: Router;
}

const routes: RouteConfig[] = [
  {
    path: "/users",
    router: userRoutes,
  },
  {
    path: "/reports",
    router: reportRoutes
  },
  {
    path: "/news",
    router: newsRoutes,
  },
  {
    path: "/auth",
    router: authRoutes
  },
  {
    path: "/events",
    router: eventRoutes
  },
  {
    path: "/discussions",
    router: discussionRoutes,
  },
  {
    path: "/comments",
    router: commentRoutes,
  }
];

export default routes;
