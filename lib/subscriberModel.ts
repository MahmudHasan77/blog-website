import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true },
},{timestamps:true});

const subscriberModel =
  mongoose.models.subscriber || mongoose.model("subscriber", subscriberSchema);
export default subscriberModel;
