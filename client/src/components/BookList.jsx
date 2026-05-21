import BookCard from './BookCard'
import SkeletonCard from './SkeletonCard'
import EmptyState from './EmptyState'

const SKELETON_COUNT = 8

const BookList = ({ books, loading, loadingMore, error, query, hasMore, onRetry, sentinelRef }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <EmptyState type="error" message={error} onRetry={onRetry} />
  }

  if (books.length === 0) {
    return <EmptyState type="search" query={query} />
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <BookCard key={`${book.id}-${index}`} book={book} index={index % 8} />
        ))}

        {/* Skeleton saat load more */}
        {loadingMore &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`more-${i}`} />)
        }
      </div>

      {/* Sentinel untuk IntersectionObserver */}
      <div ref={sentinelRef} className="h-4" />

      {/* End of results */}
      {!hasMore && !loadingMore && books.length > 0 && (
        <p className="text-center text-sm text-slate-400 py-8">
          Semua {books.length} hasil sudah ditampilkan
        </p>
      )}
    </>
  )
}

export default BookList
