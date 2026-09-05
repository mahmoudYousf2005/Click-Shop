
"use client";
import { Heart, ShoppingCart, Star } from "lucide-react";
import StarRating from "../components/StarRating";
import { useWishlist } from "../wishlist/WishlistContext";
import { useCart } from "../cart/ContextCart";
const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);
  const { addToCart } = useCart()

  return (
    <div className="border border-gray-100 rounded-lg p-4 relative hover:shadow-md transition-shadow">
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      <div className="aspect-square mb-3 flex items-center justify-center bg-gray-50 rounded">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
      <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>

      <div className="flex items-center gap-1 my-1">
        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
        <StarRating rating={product.rating}/>
      </div>

      <p className="font-bold text-lg mb-3">${product.price}</p>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md flex items-center
       justify-center gap-2 font-medium"
       onClick={()=>{
        addToCart(product)
       }}
       >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;