import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WishlistPage from './pages/WishlistPage'

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <ToastProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Routes>
            </div>

            <footer className="border-t border-slate-200 bg-white mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-400">
                BookSearch · Data dari{' '}
                <a
                  href="https://books.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-600 transition-colors"
                >
                  Google Books API
                </a>
              </div>
            </footer>
          </div>
        </ToastProvider>
      </WishlistProvider>
    </BrowserRouter>
  )
}
