"use client";
import { Heart } from "lucide-react";
import { useWishlist } from "../wishlist/WishlistContext";
import { useCart } from "../cart/ContextCart";

const FeaturedProductActions = ({ item }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFavorite = isInWishlist(item.id);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleWishlist(item)}
        aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        className="absolute top-4 right-4 z-10"
      >
        <Heart
          className={`text-2xl cursor-pointer ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-orange-500 font-bold">${item.price}</h2>
          <del className="text-xs">${item.discountPercentage}</del>
        </div>
        <button
          className="font-bold text-xs py-1.5 px-2 border border-orange-500 text-orange-500
           hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all rounded-full cursor-pointer"
          onClick={() => addToCart(item)}
        >
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default FeaturedProductActions;