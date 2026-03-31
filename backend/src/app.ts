import express from "express";
import cors from "cors";

import profitRoutes from "./routes/profitRoutes";
import mandiRoutes from "./routes/mandiRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profit", profitRoutes);
app.use("/api/mandi", mandiRoutes);

export default app;