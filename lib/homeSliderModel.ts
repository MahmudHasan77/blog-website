import mongoose from "mongoose";

const homeSliderSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
});

const homeSliderModel =
  mongoose.models.homeSlider || mongoose.model("homeSlider", homeSliderSchema);

export default homeSliderModel;
