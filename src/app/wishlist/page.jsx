
"use client";
import { useWishlist } from "./WishlistContext"
import ProductCard from "../products/ProductCard";

const Page = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-64 text-gray-400">
        <p>مفيش منتجات في المفضلة لسه</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="bg-amber-50 py-4 px-10 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-orange-400">YOUR PICKS</h2>
        <h1 className="font-bold text-2xl">المفضلة ({wishlist.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
