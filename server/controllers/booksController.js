import axios from "axios";

export const searchBooks = async (req, res, next) => {
  try {
    const { q, startIndex = 0 } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Parameter pencarian (q) wajib diisi.",
      });
    }

    const params = { q, maxResults: 20, startIndex: parseInt(startIndex) || 0 };
    if (process.env.GOOGLE_BOOKS_API_KEY) {
      params.key = process.env.GOOGLE_BOOKS_API_KEY;
    }

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      { params }
    );

    const items = response.data.items || [];

    const books = items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title || "Judul tidak tersedia",
      authors: item.volumeInfo.authors || [],
      thumbnail: (item.volumeInfo.imageLinks?.thumbnail || "").replace(
        "http://",
        "https://"
      ),
      averageRating: item.volumeInfo.averageRating || 0,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
      publisher: item.volumeInfo.publisher || "",
      publishedDate: item.volumeInfo.publishedDate || "",
      description: item.volumeInfo.description || "",
    }));

    res.json({
      success: true,
      totalItems: response.data.totalItems || 0,
      data: books,
    });
  } catch (error) {
    // Wrap axios/network errors with a user-friendly message
    const isAxiosError = error?.response || error?.request
    if (isAxiosError) {
      return res.status(502).json({
        success: false,
        message: "Gagal mengambil data dari Google Books. Coba beberapa saat lagi.",
      });
    }
    next(error);
  }
};
