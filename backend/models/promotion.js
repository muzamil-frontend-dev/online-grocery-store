import mongoose from "mongoose";

const promotionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
