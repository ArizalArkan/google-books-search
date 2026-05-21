import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: [true, "bookId wajib diisi"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "title wajib diisi"],
    },
    authors: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    publisher: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wishlist", wishlistSchema);
