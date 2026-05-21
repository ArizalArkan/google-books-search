import { useState } from 'react'
import StarRating from './StarRating'
import WishlistButton from './WishlistButton'
import { useWishlistContext } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

const BookPlaceholder = ({ title }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
    <span className="text-5xl mb-2">📚</span>
    <p className="text-xs text-slate-500 text-center line-clamp-2 leading-snug">{title}</p>
  </div>
)

const BookCard = ({ book, index = 0 }) => {
  const [imgError, setImgError] = useState(false)
  const { wishlistIds, toggleWishlist } = useWishlistContext()
  const { showToast } = useToast()
  const isInWishlist = wishlistIds.has(book.id)

  const handleToggle = (b) => {
    toggleWishlist(b, (action) => {
      if (action === 'added') showToast(`"${b.title.slice(0, 30)}..." ditambahkan ke wishlist`, 'success')
      else showToast(`Dihapus dari wishlist`, 'removed')
    })
  }

  return (
    <div
      className="book-card-enter bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden bg-slate-100 aspect-[2/3]">
        {!imgError && book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <BookPlaceholder title={book.title} />
        )}

        {/* Year badge */}
        {book.publishedDate && (
          <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
            {book.publishedDate.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 leading-snug">
            {book.title}
          </h3>
          <p className="text-slate-500 text-xs mt-1 line-clamp-1">
            {book.authors?.length > 0
              ? `oleh ${book.authors.join(', ')}`
              : 'Penulis tidak diketahui'}
          </p>
          {book.publisher && (
            <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{book.publisher}</p>
          )}
        </div>

        <StarRating rating={book.averageRating} ratingsCount={book.ratingsCount} />

        <WishlistButton book={book} isInWishlist={isInWishlist} onToggle={handleToggle} />
      </div>
    </div>
  )
}

export default BookCard
