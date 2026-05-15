import "dotenv/config";
import express from "express";
import cors from "cors";
import { createApiRouter, errorHandler } from "./api.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", createApiRouter());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Portfolio API running on http://127.0.0.1:${port}`);
});
