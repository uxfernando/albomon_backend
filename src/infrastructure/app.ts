import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import healthRoutes from "../presentation/routes/health.routes";
import { httpLogger } from "./middlewares/httpLogger";

export const app = express();

// Middlewares for security and utility
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// API Routes
app.use("/api/health", healthRoutes);
