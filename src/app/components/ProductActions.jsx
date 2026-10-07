"use client";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../cart/ContextCart";
import { useWishlist } from "../../wishlist/WishlistContext";
import { useRouter } from "next/navigation";
import ConfirmModal from "../components/";

const ProductActions = ({ product }) => {
  const { addToCart, buyNow } = useCart();
  const router = useRouter();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleConfirmBuy = async () => {
    setProcessing(true);
    const order = await buyNow(product, quantity);
    setProcessing(false);
    setShowConfirm(false);
    if (order) {
      router.push(`/order-confirmation/${order.id}`);
    }
  };

  return (
    <div className="flex items-center gap-3">
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
        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed
         text-white py-2.5 rounded-md flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart className="w-4 h-4" />
        {outOfStock ? " Out of Stock" : " Add to Cart"}
      </button>

      <button
        className="bg-amber-200 hover:bg-amber-600 flex-1 py-2.5 rounded-xl cursor-pointer"
        onClick={() => setShowConfirm(true)}
        disabled={outOfStock}
      >
        Buy Now
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

      <ConfirmModal
        open={showConfirm}
        title="Confirm your order"
        message={`Buy ${quantity} × ${product.title} for $${(
          product.price * quantity
        ).toFixed(2)}?`}
        onConfirm={handleConfirmBuy}
        onCancel={() => setShowConfirm(false)}
        loading={processing}
      />
    </div>
  );
};

export default ProductActions;