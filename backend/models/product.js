import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Product name is required."],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
    },
    fabric: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
