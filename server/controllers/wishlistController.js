import Wishlist from "../models/Wishlist.js";

export const getAllWishlist = async (req, res, next) => {
  try {
    const items = await Wishlist.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const {
      bookId,
      title,
      authors,
      thumbnail,
      averageRating,
      ratingsCount,
      publisher,
      publishedDate,
    } = req.body;

    if (!bookId || !title) {
      return res.status(400).json({
        success: false,
        message: "bookId dan title wajib diisi.",
      });
    }

    const existing = await Wishlist.findOne({ bookId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Buku sudah ada di wishlist.",
      });
    }

    const newItem = await Wishlist.create({
      bookId,
      title,
      authors,
      thumbnail,
      averageRating,
      ratingsCount,
      publisher,
      publishedDate,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const deleted = await Wishlist.findOneAndDelete({ bookId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan di wishlist.",
      });
    }

    res.json({
      success: true,
      message: "Buku berhasil dihapus dari wishlist.",
    });
  } catch (error) {
    next(error);
  }
};
