import express from "express";
import History from "../models/History";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newHistory = new History(req.body);
    await newHistory.save();

    res.status(201).json({ message: "Saved successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:email", async (req, res) => {
  try {
    const data = await History.find({
      userEmail: req.params.email,
    }).sort({ timestamp: -1 });

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/latest/:email", async (req, res) => {
  try {
    const latest = await History.findOne({
      userEmail: req.params.email,
    }).sort({ timestamp: -1 });

    res.json(latest);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;