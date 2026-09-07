"use client";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart , updateQuantity } from "../../cart/ContextCart";
import { useWishlist } from "../../wishlist/WishlistContext";

const ProductActions = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const isFavorite = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* عدّاد الكمية */}
      <div className="flex items-center border border-gray-200 rounded-md">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-50"
          type="button"
        >
          -
        </button>
        <span className="px-4 text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-50"
          type="button"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={outOfStock}
        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-md flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart className="w-4 h-4" />
        {outOfStock ? " Out of Stock" : " Add to Cart"}
      </button>

      <button
        onClick={() => toggleWishlist(product)}
        className="border border-gray-200 rounded-md p-2.5 hover:bg-gray-50"
        type="button"
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

export default ProductActions;