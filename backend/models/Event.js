import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {
      type: Date,
      required: true,
    },
    location: String,
    city: String,
    category: String,
    volunteersNeeded: Number,
    registeredVolunteers: [mongoose.Schema.Types.ObjectId],
    createdBy: mongoose.Schema.Types.ObjectId,
    image: String,
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    hoursPerVolunteer: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
