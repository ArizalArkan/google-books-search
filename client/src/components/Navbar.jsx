import { Link, useLocation } from 'react-router-dom'
import { useWishlistContext } from '../context/WishlistContext'

const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Navbar() {
  const { wishlist } = useWishlistContext()
  const { pathname } = useLocation()

  const navLink = (to, label, icon) => {
    const isActive = pathname === to
    return (
      <Link
        to={to}
        className={`
          flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium
          transition-all duration-150
          ${isActive
            ? to === '/wishlist'
              ? 'bg-rose-50 text-rose-600'
              : 'bg-blue-50 text-blue-600'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }
        `}
      >
        {icon && <span className="text-base leading-none">{icon}</span>}
        <span>{label}</span>
        {to === '/wishlist' && wishlist.length > 0 && (
          <span
            className={`
              inline-flex items-center justify-center min-w-[18px] h-[18px]
              px-1 text-[10px] font-bold rounded-full
              ${isActive ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'}
            `}
          >
            {wishlist.length > 99 ? '99+' : wishlist.length}
          </span>
        )}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors"
          >
            <BookIcon />
            <span>BookSearch</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLink('/', 'Beranda', '🏠')}
            {navLink('/wishlist', 'Wishlist', '♥')}
          </nav>
        </div>
      </div>
    </header>
  )
}
