import express from "express";
import { memberRoutes } from "../../member/routes/member-routes";
import { bookRoutes } from "../../book/routes/book-routes";

export const routes = express.Router();

routes.use(memberRoutes);
routes.use(bookRoutes);
