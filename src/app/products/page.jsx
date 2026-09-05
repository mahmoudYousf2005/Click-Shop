
import FilterProducts from "./FilterProducts";
import ProductsList from "./ProductsList";
import { Suspense } from "react";

const loading = (
  <div className="flex items-center justify-center h-64">loading...</div>
);

const page = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      
      <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between">
        <div className="">
          <h2 className="text-sm font-semibold text-orange-400">SHOP NOW</h2>
          <h1 className="font-bold text-2xl">All Products</h1>
        </div>

        <p className="text-sm text-gray-500">Home &gt; Products</p>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4 mt-6">
        <div>
          <FilterProducts />
        </div>
        <div>
          <Suspense fallback={loading}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;