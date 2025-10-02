import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    sessionToken: { type: String },
    sessionCreatedAt: Date,
  },
  { timestamps: true }
);

const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;
