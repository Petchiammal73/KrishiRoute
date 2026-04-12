import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    userEmail: String,
    crop: String,
    bestMarket: String,
    quantity: Number,
    vehicle: String,
    profit: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("History", HistorySchema);