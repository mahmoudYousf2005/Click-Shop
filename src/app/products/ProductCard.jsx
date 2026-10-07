


"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "../components/StarRating";
import { useWishlist } from "../wishlist/WishlistContext";
import { useCart } from "../cart/ContextCart";

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm hover:scale-110 transition"
        aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      <Link href={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1">
          {product.title}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating rating={product.rating} />
      </div>

      {/* Price */}
      <p className="font-bold text-lg text-gray-900 mt-2">
        ${product.price}
      </p>

      {/* Button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;