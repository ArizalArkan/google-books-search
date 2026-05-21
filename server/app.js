import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books.js";
import wishlistRoutes from "./routes/wishlist.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running." });
});

app.use("/api/books", bookRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use(errorHandler);

export default app;
