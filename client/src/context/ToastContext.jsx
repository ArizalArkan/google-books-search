import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 2800)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastNotification key={toast.id} toast={toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  )
}

const ToastNotification = ({ toast, onClose }) => {
  const isSuccess = toast.type === 'success'

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999] flex items-center gap-3
        px-4 py-3 rounded-xl shadow-xl border
        animate-toast-in min-w-[240px] max-w-xs
        ${isSuccess
          ? 'bg-white border-emerald-100 text-slate-800'
          : 'bg-white border-rose-100 text-slate-800'
        }
      `}
    >
      <span className={`text-xl ${isSuccess ? 'text-emerald-500' : 'text-rose-400'}`}>
        {isSuccess ? '♥' : '♡'}
      </span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none"
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast harus dipakai di dalam ToastProvider')
  return context
}
