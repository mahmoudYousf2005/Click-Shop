import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import StarRating from "./StarRating";
import { supabase } from "@/lib/supabase";
import FeaturedProductActions from "./FeaturedProductActions";

// 🟢 السيرفر بيجيب البيانات ويفلترها، مش المتصفح
async function getFeaturedProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Error Select Data", error.message);
    return <p className="text-center text-red-500 py-10">حصل خطأ في تحميل الفئات</p>

  }
  const categories = [...new Set(data.map((p) => p.category))];
  return categories.flatMap((category) =>
    data.filter((prod) => prod.category === category).slice(1, 2)
  );
}

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();

 

  return (
    <div className="text-center my-8 container mx-auto">
      <h1 className="text-3xl font-bold">Featured Products</h1>
      <h2 className="font-semibold mt-1 text-gray-500">
        Discover our handpicked selection of top quality products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mt-6 mx-auto p-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="relative border border-gray-200 rounded-xl p-6 hover:scale-105 transition-all shadow-lg"
          >
            <div className="relative flex justify-center cursor-pointer w-40 h-40 mx-auto mb-4">
              <Image
                className="object-contain rounded-full p-1"
                src={item?.thumbnail?.trim()}
                fill
                sizes="160px"
                unoptimized
                alt={item?.title || "Product image"}
              />
            </div>

            <h2 className="absolute top-4 bg-red-500 text-white font-bold py-1 px-2 rounded-full">
              -{item.discountPercentage}%
            </h2>

            <div className="text-left">
              <h2 className="font-bold text-sm">{item.title}</h2>
              <h2 className="text-gray-500 mt-1">{item.category}</h2>
              <StarRating rating={item.rating} />
              <FeaturedProductActions item={item} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-8 px-8 flex justify-end">
        <Link href={"/products"}>
          <button className="flex items-center gap-1 border border-orange-300 text-orange-500 font-bold px-2 py-1 rounded-lg cursor-pointer">
            View All Products <FaLongArrowAltRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;