import serverless from "serverless-http";
import express from "express";
import { createApiRouter, errorHandler } from "../../server/api.js";

const app = express();

app.use(express.json());
app.use("/api", createApiRouter());
app.use(errorHandler);

export const handler = serverless(app);
