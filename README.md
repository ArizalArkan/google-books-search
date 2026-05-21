# BookSearch

Aplikasi pencarian buku berbasis web yang memungkinkan pengguna mencari jutaan buku dari Google Books API dan menyimpan buku favorit ke dalam wishlist pribadi.

Proyek ini dibuat sebagai bagian dari engineer test **Travelio**, dibangun dengan stack modern: **Express.js + MongoDB** untuk backend dan **React + Tailwind CSS** untuk frontend, seluruhnya dapat dijalankan via **Docker**.

---

## Tampilan

| Halaman Utama | Hasil Pencarian | Wishlist |
|---|---|---|
| Hero search bar dengan gradient | Grid buku dengan infinite scroll | Koleksi buku tersimpan |

---

## Fitur

- **Pencarian Buku** — cari dari jutaan buku via Google Books API, dipicu oleh Enter atau klik tombol Cari
- **Infinite Scroll** — hasil dimuat secara otomatis saat scroll ke bawah (20 buku per batch)
- **Wishlist** — simpan dan hapus buku dari wishlist, tersimpan permanen di MongoDB
- **Optimistic Update** — tombol wishlist langsung berubah tanpa menunggu respons server
- **Skeleton Loading** — placeholder animasi saat data sedang dimuat
- **Empty State** — tampilan informatif saat hasil kosong atau terjadi error
- **Toast Notification** — notifikasi saat buku ditambah/dihapus dari wishlist
- **Responsive Design** — tampilan optimal di mobile, tablet, dan desktop

---

## Tech Stack

### Backend
| Teknologi | Versi | Kegunaan |
|---|---|---|
| Node.js | 20 | Runtime |
| Express.js | 4 | HTTP framework |
| MongoDB | 6 | Database |
| Mongoose | 8 | ODM / schema modeling |
| Axios | 1.7 | HTTP client ke Google Books API |
| dotenv | 16 | Manajemen environment variable |

### Frontend
| Teknologi | Versi | Kegunaan |
|---|---|---|
| React | 18 | UI library |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router DOM | 6 | Client-side routing |
| Axios | 1.7 | HTTP client ke backend |

### Infrastructure
| Teknologi | Kegunaan |
|---|---|
| Docker | Containerisasi setiap service |
| Docker Compose | Orkestrasi multi-container |
| nginx | Web server + reverse proxy untuk client |

---

## Arsitektur

```
┌─────────────────────────────────────────────┐
│                 Docker Network               │
│                                             │
│  ┌──────────┐    ┌──────────┐    ┌───────┐ │
│  │  Client  │───▶│  Server  │───▶│ Mongo │ │
│  │  nginx   │    │ Express  │    │  DB   │ │
│  │ :80/3000 │    │  :5000   │    │:27017 │ │
│  └──────────┘    └──────────┘    └───────┘ │
│       │                │                    │
└───────┼────────────────┼────────────────────┘
        │                │
        ▼                ▼
   Browser user    Google Books API
```

Request dari browser ke `/api/*` diproxy oleh nginx ke container Express, sehingga tidak ada masalah CORS.

---

## Cara Menjalankan

### Prasyarat

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) terinstall dan berjalan

### 1. Clone repositori

```bash
git clone https://github.com/YOUR_USERNAME/book-search-app.git
cd book-search-app
```

### 2. Setup environment variable

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/bookapp
GOOGLE_BOOKS_API_KEY=your_api_key_here   # opsional, tapi direkomendasikan
```

> **Mendapatkan API Key:** Buka [Google Cloud Console](https://console.cloud.google.com/), aktifkan **Books API**, buat API key di menu Credentials.
> Tanpa API key aplikasi tetap berjalan, namun request lebih cepat di-rate-limit oleh Google.

### 3. Jalankan dengan Docker

```bash
docker compose up --build
```

Akses aplikasi di: **http://localhost:3000**

Untuk menjalankan di background:

```bash
docker compose up --build -d
```

Menghentikan semua container:

```bash
docker compose down
```

---

## Menjalankan Tanpa Docker (Mode Development)

### Backend

```bash
cd server
cp .env.example .env    # edit sesuai kebutuhan
npm install
npm run dev             # auto-restart dengan --watch
```

Server berjalan di `http://localhost:5000`

### Frontend

```bash
cd client
npm install
npm run dev
```

Client berjalan di `http://localhost:5173` (Vite dev server dengan proxy ke backend)

---

## API Endpoints

Base URL (Docker): `http://localhost:3000/api`  
Base URL (Dev): `http://localhost:5000/api`

### Books

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/books/search?q={keyword}&startIndex={n}` | Cari buku dari Google Books API |

**Query Parameters:**
- `q` (required) — kata kunci pencarian
- `startIndex` (optional, default: 0) — offset untuk pagination

**Contoh Response:**
```json
{
  "success": true,
  "totalItems": 1234,
  "data": [
    {
      "id": "abc123",
      "title": "Atomic Habits",
      "authors": ["James Clear"],
      "thumbnail": "https://...",
      "averageRating": 4.5,
      "ratingsCount": 10,
      "publisher": "Penguin",
      "publishedDate": "2018",
      "description": "..."
    }
  ]
}
```

### Wishlist

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/wishlist` | Ambil semua buku di wishlist |
| `POST` | `/wishlist` | Tambah buku ke wishlist |
| `DELETE` | `/wishlist/:bookId` | Hapus buku dari wishlist |

**Contoh Request Body (POST):**
```json
{
  "bookId": "abc123",
  "title": "Atomic Habits",
  "authors": ["James Clear"],
  "thumbnail": "https://...",
  "averageRating": 4.5,
  "ratingsCount": 10,
  "publisher": "Penguin",
  "publishedDate": "2018",
  "description": "..."
}
```

---

## Struktur Proyek

```
book-search-app/
├── docker-compose.yml
│
├── server/                          # Express.js backend
│   ├── Dockerfile
│   ├── .env.example
│   ├── server.js                    # Entry point
│   ├── app.js                       # Express app setup
│   ├── config/
│   │   └── db.js                    # Koneksi MongoDB
│   ├── routes/
│   │   ├── books.js
│   │   └── wishlist.js
│   ├── controllers/
│   │   ├── booksController.js       # Proxy ke Google Books API
│   │   └── wishlistController.js    # CRUD wishlist
│   ├── models/
│   │   └── Wishlist.js              # Mongoose schema
│   └── middlewares/
│       └── errorHandler.js
│
└── client/                          # React frontend
    ├── Dockerfile
    ├── nginx.conf                   # Web server + API proxy config
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx         # Halaman pencarian + infinite scroll
    │   │   └── WishlistPage.jsx     # Halaman daftar wishlist
    │   ├── components/
    │   │   ├── BookCard.jsx         # Kartu buku individual
    │   │   ├── BookList.jsx         # Grid buku + sentinel
    │   │   ├── SearchBar.jsx        # Input pencarian
    │   │   ├── Navbar.jsx           # Navigasi + wishlist counter
    │   │   ├── SkeletonCard.jsx     # Loading placeholder
    │   │   ├── EmptyState.jsx       # Tampilan kosong/error
    │   │   ├── StarRating.jsx       # Komponen bintang rating
    │   │   └── WishlistButton.jsx   # Tombol simpan ke wishlist
    │   ├── hooks/
    │   │   ├── useSearch.js         # State + logic pencarian & pagination
    │   │   └── useWishlist.js       # State + logic wishlist
    │   ├── context/
    │   │   ├── WishlistContext.jsx  # Global wishlist state
    │   │   └── ToastContext.jsx     # Global toast notifications
    │   └── services/
    │       └── api.js               # Axios instance + API calls
    └── vite.config.js               # Proxy /api ke backend (dev only)
```

---

## Cara Penggunaan

### Mencari Buku
1. Buka `http://localhost:3000`
2. Ketik judul atau nama penulis di search bar
3. Tekan **Enter** atau klik tombol **Cari**
4. Scroll ke bawah untuk memuat lebih banyak hasil (infinite scroll otomatis)

### Menyimpan ke Wishlist
1. Klik tombol **Simpan** di bawah kartu buku
2. Buku tersimpan ke database dan tombol berubah menjadi **Tersimpan**
3. Klik lagi untuk menghapus dari wishlist

### Melihat Wishlist
1. Klik **Wishlist** di navbar kanan atas
2. Semua buku tersimpan ditampilkan dalam grid
3. Klik tombol **Tersimpan** untuk menghapus buku dari wishlist

---

## Catatan

- `totalItems` dari Google Books API adalah estimasi kasar, bukan hitungan pasti — angka tersebut mencerminkan banyaknya dokumen di index Google yang mengandung kata kunci, bukan judul yang persis cocok.
- Tanpa API key, Google Books API memiliki rate limit yang lebih ketat (~100 request/hari per IP).
- Data wishlist tersimpan di MongoDB volume Docker — data tidak hilang saat container di-restart, namun akan hilang jika volume dihapus (`docker compose down -v`).
