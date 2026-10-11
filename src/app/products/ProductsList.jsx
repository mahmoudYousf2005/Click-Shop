

export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";

const ProductsList = async ({ searchParams }) => {
  const { category, search, min, max } = (await searchParams )|| {};

  let query = supabase.from("products").select("*", { count: "exact" }).eq("is_active", true);

  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("title", `%${search}%`);
  if (min) query = query.gte("price", Number(min));
  if (max) query = query.lte("price", Number(max));

  const { data, error , count: totalCount } = await query;

  if (error) {
    console.error("Error:", error.message);
    return (
      <p className="text-center text-red-500 py-10">
        حصل خطأ في تحميل المنتجات
      </p>
    );
  }

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
        <p>لا توجد منتجات تطابق البحث</p>
        <Link
          href="/products"
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing {data.length} of {totalCount} products
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;