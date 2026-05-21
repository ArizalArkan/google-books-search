import { createContext, useContext } from 'react'
import { useWishlist } from '../hooks/useWishlist'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const wishlistData = useWishlist()
  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlistContext = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlistContext harus dipakai di dalam WishlistProvider')
  return context
}
