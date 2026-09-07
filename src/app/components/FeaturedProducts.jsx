"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import StarRating from "./StarRating";
import { useWishlist } from "../wishlist/WishlistContext";
import { useEffect, useState } from "react";
import { useCart } from "../cart/ContextCart";

const FeaturedProducts = () => {
  const [data, setData] = useState(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart()
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  const categories = [...new Set(data.products.map((p) => p.category))].slice(8, 16);
  const filterProducts = categories.flatMap((category) => {
    return data.products.filter((product) => product.category === category).slice(0, 1);
  });

  return (
    <div className="text-center my-8 container mx-auto">
      <h1 className="text-3xl font-bold">Featured Products</h1>
      <h2 className="font-semibold mt-1 text-gray-500">
        Discover our handpicked selection of top quality products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mt-6 mx-auto p-6">
        {filterProducts.map((item) => {
          const isFavorite = isInWishlist(item.id); // ✅ هنا جوه الحلقة، لكل item لوحده

          return (
            <div
              key={item.id}
              className="relative border border-gray-200 rounded-xl p-6 hover:scale-105 transition-all shadow-lg"
            >
              <div className="relative flex justify-center cursor-pointer">
                <Image
                  className="w-40 mb-4 rounded-full p-1"
                  src={item?.thumbnail}
                  width={0}
                  height={0}
                  unoptimized
                  alt="product img"
                />
              </div>

              <Heart
                onClick={() => toggleWishlist(item)} // ✅ item مش product
                className={`absolute top-4 right-4 text-2xl cursor-pointer ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              />

              <h2 className="absolute top-4 bg-red-500 text-white font-bold py-1 px-2 rounded-full">
                -{item.discountPercentage}%
              </h2>

              <div className="text-left">
                <h2 className="font-bold text-sm">{item.title}</h2>
                <h2 className="text-gray-500 mt-1">{item.category}</h2>
                <StarRating rating={item.rating} />
                {/* <h2 className="my-1">{item.rating}</h2> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-orange-500 font-bold">${item.price}</h2>
                    <del className="text-xs">${item.discountPercentage}</del>
                  </div>
                  <button className="font-bold text-xs py-1.5 px-2 border border-orange-500 text-orange-500
                   hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all rounded-full cursor-pointer"
                   onClick={()=>{
                    addToCart(item)
                   }}
                   >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-right mt-8 px-8 flex justify-end">
        <Link href={"products"}>
          <button className="flex items-center gap-1 border border-orange-300 text-orange-500 font-bold px-2 py-1 rounded-lg cursor-pointer">
            View All Products <FaLongArrowAltRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;