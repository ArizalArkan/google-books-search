import { useRef, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { useSearch } from '../hooks/useSearch'

const HeroSection = ({ onSearch }) => (
  <section className="relative min-h-[480px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 px-4 py-16 text-center">
    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 -left-16 h-80 w-80 rounded-full bg-blue-600 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-500 opacity-25 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-800 opacity-30 blur-3xl" />
    </div>

    <div className="relative z-10 w-full max-w-2xl mx-auto animate-slide-up">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6 backdrop-blur-sm">
        <span className="text-amber-400">★</span>
        Powered by Google Books API
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
        Temukan Buku
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
          Favoritmu
        </span>
      </h1>
      <p className="text-white/60 text-base sm:text-lg mb-10 max-w-md mx-auto">
        Jutaan buku tersedia. Cari, temukan, dan simpan ke wishlist pribadimu.
      </p>

      {/* Search bar */}
      <SearchBar onSearch={onSearch} size="lg" autoFocus />

      {/* Stats strip */}
      <div className="flex items-center justify-center gap-8 mt-8 text-white/50 text-xs">
        <span>📚 1M+ Buku</span>
        <span className="h-3 w-px bg-white/20" />
        <span>🌏 Berbagai Bahasa</span>
        <span className="h-3 w-px bg-white/20" />
        <span>⚡ Hasil Instan</span>
      </div>
    </div>
  </section>
)

const formatTotal = (total) => {
  if (total >= 1_000_000) return '1 juta+'
  if (total >= 1_000) return `${(total / 1000).toFixed(0)}rb+`
  return total.toLocaleString('id-ID')
}

const ResultsHeader = ({ query, totalItems, count, hasMore, onSearch }) => (
  <div className="bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 max-w-xl">
          <SearchBar onSearch={onSearch} initialValue={query} size="sm" />
        </div>
        {count > 0 && (
          <p className="text-sm text-slate-500 shrink-0">
            Menampilkan{' '}
            <span className="font-semibold text-slate-700">{count}</span>
            {hasMore && totalItems > count ? (
              <>
                {' dari ~'}
                <span className="font-semibold text-slate-700">{formatTotal(totalItems)}</span>
              </>
            ) : null}
            {' hasil untuk '}
            <span className="font-semibold text-slate-700">"{query}"</span>
          </p>
        )}
      </div>
    </div>
  </div>
)

export default function HomePage() {
  const { books, loading, loadingMore, error, totalItems, hasSearched, lastQuery, hasMore, search, loadMore } = useSearch()
  const resultsRef = useRef(null)
  const sentinelRef = useRef(null)

  const handleSearch = (keyword) => {
    search(keyword)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: '300px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  return (
    <main>
      {!hasSearched ? (
        <HeroSection onSearch={handleSearch} />
      ) : (
        <ResultsHeader query={lastQuery} totalItems={totalItems} count={books.length} hasMore={hasMore} onSearch={handleSearch} />
      )}

      {hasSearched && (
        <section ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BookList
            books={books}
            loading={loading}
            loadingMore={loadingMore}
            error={error}
            query={lastQuery}
            hasMore={hasMore}
            onRetry={() => handleSearch(lastQuery)}
            sentinelRef={sentinelRef}
          />
        </section>
      )}
    </main>
  )
}
