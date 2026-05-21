import { Link } from 'react-router-dom'

const illustrations = {
  search: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="34" r="22" stroke="#CBD5E1" strokeWidth="3" fill="#F1F5F9" />
      <path d="M50 50L64 64" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 34h16M34 26v16" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  wishlist: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="52" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2.5" />
      <path d="M20 28h24M20 36h24M20 44h16" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M52 52c0-2.2 1.8-4 4-4s4 1.8 4 4c0 5-8 10-8 10s-8-5-8-10c0-2.2 1.8-4 4-4s4 1.8 4 4z"
        fill="#FDA4AF"
        stroke="#F43F5E"
        strokeWidth="1.5"
      />
    </svg>
  ),
  error: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="28" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2.5" />
      <path d="M40 26v18M40 52v2" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
}

const EmptyState = ({ type = 'search', query = '', message, action, onRetry }) => {
  const config = {
    search: {
      illustration: illustrations.search,
      title: query ? `Tidak ada hasil untuk "${query}"` : 'Mulai pencarian',
      subtitle: query
        ? 'Coba kata kunci lain atau periksa ejaan kamu.'
        : 'Ketik judul buku, nama penulis, atau topik yang kamu cari.',
    },
    wishlist: {
      illustration: illustrations.wishlist,
      title: 'Wishlist masih kosong',
      subtitle: 'Simpan buku favorit kamu agar mudah ditemukan lagi.',
    },
    error: {
      illustration: illustrations.error,
      title: 'Gagal memuat data',
      subtitle: message || 'Terjadi kesalahan. Silakan coba lagi.',
    },
  }

  const { illustration, title, subtitle } = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="mb-5 opacity-80">{illustration}</div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-6">{subtitle}</p>

      {/* Retry button untuk error state */}
      {type === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors mb-3"
        >
          🔄 Coba Lagi
        </button>
      )}

      {action && (
        <Link
          to={action.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
