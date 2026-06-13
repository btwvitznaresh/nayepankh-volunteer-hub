import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: String,
    donorEmail: String,
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    message: String,
    paymentId: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    impact: String,
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
