import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

export const searchBooks = (keyword, startIndex = 0) =>
  api.get('/books/search', { params: { q: keyword, startIndex } })

export const getWishlist = () => api.get('/wishlist')
export const addToWishlist = (bookData) => api.post('/wishlist', bookData)
export const removeFromWishlist = (bookId) => api.delete(`/wishlist/${bookId}`)

export default api
