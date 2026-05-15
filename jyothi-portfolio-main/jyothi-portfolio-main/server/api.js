import express from "express";
import { getProfile, getProjects, getSkills, saveContactMessage } from "./services.js";

export function createApiRouter() {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    res.json({ ok: true, service: "portfolio-api" });
  });

  router.get("/profile", async (_req, res, next) => {
    try {
      res.json(await getProfile());
    } catch (error) {
      next(error);
    }
  });

  router.get("/projects", async (_req, res, next) => {
    try {
      res.json(await getProjects());
    } catch (error) {
      next(error);
    }
  });

  router.get("/skills", async (_req, res, next) => {
    try {
      res.json(await getSkills());
    } catch (error) {
      next(error);
    }
  });

  router.post("/contact", async (req, res, next) => {
    try {
      const savedMessage = await saveContactMessage(req.body);
      res.status(201).json({
        ok: true,
        stored: savedMessage.stored,
        message: "Thanks for reaching out. I will get back to you soon."
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    ok: false,
    message: statusCode === 500 ? "Something went wrong." : error.message
  });
}
