import { useState, useEffect } from 'react'
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/api'

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [wishlistIds, setWishlistIds] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist()
      const items = Array.isArray(res.data?.data) ? res.data.data : []
      setWishlist(items)
      setWishlistIds(new Set(items.map((item) => item.bookId)))
    } catch {
      // fail silently — wishlist is optional
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = async (book, onSuccess) => {
    const isInWishlist = wishlistIds.has(book.id)

    // Optimistic update — update UI immediately
    if (isInWishlist) {
      setWishlistIds((prev) => {
        const next = new Set(prev)
        next.delete(book.id)
        return next
      })
      setWishlist((prev) => prev.filter((item) => item.bookId !== book.id))
    } else {
      setWishlistIds((prev) => new Set(prev).add(book.id))
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(book.id)
        onSuccess?.('removed')
      } else {
        const res = await addToWishlist({
          bookId: book.id,
          title: book.title,
          authors: book.authors,
          thumbnail: book.thumbnail,
          averageRating: book.averageRating,
          ratingsCount: book.ratingsCount,
          publisher: book.publisher,
          publishedDate: book.publishedDate,
        })
        setWishlist((prev) => [res.data.data, ...prev])
        onSuccess?.('added')
      }
    } catch {
      // Rollback if server call fails
      fetchWishlist()
    }
  }

  return { wishlist, wishlistIds, loading, toggleWishlist }
}
