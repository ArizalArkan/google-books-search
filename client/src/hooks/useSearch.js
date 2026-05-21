import { useState, useCallback, useRef } from 'react'
import { searchBooks } from '../services/api'

const PAGE_SIZE = 20

export const useSearch = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const startIndexRef = useRef(0)

  const search = useCallback(async (keyword) => {
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)
    setLastQuery(keyword)
    setBooks([])
    setHasMore(false)
    startIndexRef.current = 0

    try {
      const res = await searchBooks(keyword, 0)
      const data = Array.isArray(res.data?.data) ? res.data.data : []
      setBooks(data)
      setTotalItems(res.data?.totalItems || 0)
      setHasMore(data.length === PAGE_SIZE)
      startIndexRef.current = data.length
    } catch (err) {
      const serverMsg = err?.response?.data?.message
      setError(serverMsg || 'Gagal mengambil data. Periksa koneksi internet kamu dan coba lagi.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !lastQuery) return

    setLoadingMore(true)
    try {
      const res = await searchBooks(lastQuery, startIndexRef.current)
      const data = Array.isArray(res.data?.data) ? res.data.data : []
      setBooks((prev) => [...prev, ...data])
      setHasMore(data.length === PAGE_SIZE)
      startIndexRef.current += data.length
    } catch {
      // gagal load more — tidak tampilkan error, cukup berhenti
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, lastQuery])

  return {
    books, loading, loadingMore, error,
    totalItems, hasSearched, lastQuery, hasMore,
    search, loadMore,
  }
}
