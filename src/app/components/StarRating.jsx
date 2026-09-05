import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 0, showNumber = true, size = "text-sm" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center text-orange-400 ${size}`}>
        {/* نجوم ممتلئة */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}

        {/* نص نجمة لو موجود */}
        {hasHalfStar && <FaStarHalfAlt key="half" />}

        {/* نجوم فاضية */}
        {Array.from({ length: emptyStars }).map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
        </div>

        {showNumber && (
            <span className="text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
        )}
    </div>
  )
}

export default StarRating
