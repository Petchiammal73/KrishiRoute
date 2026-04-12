import express from "express";
import cors from "cors";

import profitRoutes from "./routes/profitRoutes";
import mandiRoutes from "./routes/mandiRoutes";
import authRoutes from "./routes/authRoutes";
import historyRoutes from "./routes/historyRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profit", profitRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/history", historyRoutes);

export default app;