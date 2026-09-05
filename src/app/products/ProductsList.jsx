
import ProductCard from "./ProductCard";

const ProductsList = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params?.category;
  const minPrice = Number(params?.minPrice) || 0;
  const maxPrice = Number(params?.maxPrice) || Infinity;

  const url = category
    ? `https://dummyjson.com/products/category/${category}?limit=100`
    : `https://dummyjson.com/products?limit=100`;

  const res = await fetch(url);
  const data = await res.json();

  const filteredProducts = data.products.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  if (!filteredProducts.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        لا توجد منتجات تطابق الفلتر
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing 1–{filteredProducts.length} of {data.total} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;