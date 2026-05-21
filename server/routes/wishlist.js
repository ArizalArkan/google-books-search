import { Router } from "express";
import {
  getAllWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = Router();

router.get("/", getAllWishlist);
router.post("/", addToWishlist);
router.delete("/:bookId", removeFromWishlist);

export default router;
