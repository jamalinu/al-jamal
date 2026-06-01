import express from "express";
import apiRouter from "../src/api.js";

const app = express();
app.use(express.json());

// Mount our shared API routes
app.use("/api", apiRouter);

export default app;
