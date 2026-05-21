const StarRating = ({ rating = 0, ratingsCount, size = 'sm' }) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  if (rating === 0) {
    return (
      <span className={`${textSize} text-slate-400 italic`}>Belum ada rating</span>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`f${i}`} className="text-amber-400 text-sm leading-none">★</span>
        ))}
        {hasHalf && (
          <span className="text-amber-300 text-sm leading-none">★</span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`e${i}`} className="text-slate-200 text-sm leading-none">★</span>
        ))}
      </div>
      <span className={`${textSize} text-slate-500 tabular-nums`}>
        {rating.toFixed(1)}
        {ratingsCount > 0 && (
          <span className="text-slate-400"> · {ratingsCount.toLocaleString('id-ID')}</span>
        )}
      </span>
    </div>
  )
}

export default StarRating
