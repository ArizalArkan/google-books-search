import { useState } from 'react'

const WishlistButton = ({ book, isInWishlist, onToggle, size = 'sm' }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (!isInWishlist) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 450)
    }
    onToggle(book)
  }

  const isLarge = size === 'lg'

  return (
    <button
      onClick={handleClick}
      aria-label={isInWishlist ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
      className={`
        w-full flex items-center justify-center gap-1.5 font-medium
        rounded-full border transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        ${isLarge ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'}
        ${isInWishlist
          ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 focus-visible:ring-rose-400'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-400'
        }
      `}
    >
      <span
        className={`text-base leading-none transition-transform ${
          isAnimating ? 'animate-bounce-heart' : ''
        } ${isInWishlist ? 'text-rose-500' : 'text-slate-400'}`}
      >
        {isInWishlist ? '♥' : '♡'}
      </span>
      <span>{isInWishlist ? 'Tersimpan' : 'Simpan'}</span>
    </button>
  )
}

export default WishlistButton
