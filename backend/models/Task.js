import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    assignedTo: mongoose.Schema.Types.ObjectId,
    assignedBy: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    pointsReward: {
      type: Number,
      default: 10,
    },
    hoursReward: {
      type: Number,
      default: 1,
    },
    completedDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
