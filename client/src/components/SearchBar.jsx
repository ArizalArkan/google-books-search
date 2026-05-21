import { useState, useEffect } from 'react'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const SearchBar = ({ onSearch, initialValue = '', size = 'lg', autoFocus = false }) => {
  const [value, setValue] = useState(initialValue)
  const [showError, setShowError] = useState(false)

  // Sync value jika initialValue berubah dari luar (misal navigasi balik)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) {
      setShowError(true)
      return
    }
    setShowError(false)
    onSearch(value.trim())
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    if (showError && e.target.value.trim()) setShowError(false)
  }

  const isLarge = size === 'lg'

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} role="search">
        <div
          className={`
            flex items-center gap-2 rounded-2xl border-2 shadow-md
            transition-all duration-200
            ${showError
              ? 'border-red-400 shadow-red-100'
              : 'focus-within:border-blue-400 focus-within:shadow-blue-500/20 focus-within:shadow-lg'
            }
            ${isLarge ? 'border-white/20 bg-white/10 backdrop-blur-sm' : 'bg-white border-slate-200'}
          `}
        >
          <span className={`pl-4 flex-shrink-0 ${isLarge ? 'text-white/60' : 'text-slate-400'}`}>
            <SearchIcon />
          </span>

          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Cari judul, penulis, atau topik..."
            autoFocus={autoFocus}
            aria-label="Cari buku"
            aria-invalid={showError}
            aria-describedby={showError ? 'search-error' : undefined}
            className={`
              flex-1 bg-transparent outline-none font-medium placeholder:font-normal
              ${isLarge
                ? 'py-4 text-base text-white placeholder:text-white/50'
                : 'py-3 text-sm text-slate-800 placeholder:text-slate-400'
              }
            `}
          />

          <button
            type="submit"
            aria-label="Mulai pencarian"
            className={`
              mr-2 px-5 py-2 rounded-xl font-semibold text-sm
              transition-all duration-150 shrink-0
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
              ${isLarge
                ? 'bg-white text-blue-600 hover:bg-blue-50 focus-visible:ring-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400'
              }
            `}
          >
            Cari
          </button>
        </div>
      </form>

      {showError && (
        <p
          id="search-error"
          role="alert"
          className={`mt-2 text-xs font-medium ${isLarge ? 'text-red-300' : 'text-red-500'}`}
        >
          Masukkan kata kunci terlebih dahulu.
        </p>
      )}
    </div>
  )
}

export default SearchBar
