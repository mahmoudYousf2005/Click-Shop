

import { Suspense } from "react";
import ProductsList from "./ProductsList";
import FilterProducts from "./FilterProducts";

const Page = async ({ searchParams }) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-6 px-6 md:px-10 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xs md:text-sm font-semibold text-orange-500 tracking-wide">
            SHOP NOW
          </h2>
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
            All Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Discover the best products for you
          </p>
        </div>

        <div className="text-sm text-gray-500">
          <span className="hover:text-orange-500 cursor-pointer">Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700 font-medium">Products</span>
        </div>
      </div>

      {/* Sidebar + Products */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 self-start">
          <Suspense fallback={null}>
            <FilterProducts />
          </Suspense>
        </aside>

        <div className="flex-1">
          <ProductsList searchParams={params} />
        </div>
      </div>
    </div>
  );
};

export default Page;