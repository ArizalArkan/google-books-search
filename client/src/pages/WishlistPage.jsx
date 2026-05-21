import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import { useWishlistContext } from '../context/WishlistContext'

export default function WishlistPage() {
  const { wishlist, loading } = useWishlistContext()

  const adaptedWishlist = wishlist.map((item) => ({
    ...item,
    id: item.bookId,
  }))

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex items-end justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <span className="text-rose-500">♥</span>
            Wishlist Saya
          </h1>
          {!loading && (
            <p className="text-slate-500 text-sm mt-1">
              {wishlist.length > 0
                ? `${wishlist.length} buku tersimpan`
                : 'Belum ada buku yang disimpan'}
            </p>
          )}
        </div>

        {wishlist.length > 0 && (
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
          >
            + Tambah buku
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : wishlist.length === 0 ? (
        <EmptyState
          type="wishlist"
          action={{ href: '/', label: '🔍 Cari Buku Sekarang' }}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {adaptedWishlist.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      )}
    </main>
  )
}
