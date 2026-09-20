
import Link from "next/link";
import StarRating from "../../components/StarRating"
import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";

import { supabase } from "@/lib/supabase";

const ProductDetails = async ({ params }) => {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();   // 👈 عشان تجيب object واحد مش array

  if (error || !product) {
    return <div>المنتج غير موجود</div>;
  }

  const images =
    product.images && product.images.length > 0
    ? product.images 
    : [product.thumbnail];
     const hasDiscount = product.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;
   return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link href="/products" className="hover:text-orange-500">
          Products
        </Link>{" "}
        &gt; <span className="text-gray-700 capitalize">{product.title}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* الصور */}
        <ProductGallery images={images} title={product.title} />

        {/* التفاصيل */}
        <div>
          <p className="text-sm text-orange-500 font-semibold capitalize mb-1">
            {product.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            {product.brand && (
              <span className="text-sm text-gray-400">
                Brand: {product.brand}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${oldPrice}
                </span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-sm font-medium text-green-600">
                  In Stock  — {product.stock} left
              </span>
            ) : (
              <span className="text-sm font-medium text-red-500">
                Out of Stock
              </span>
            )}
          </div>

          <ProductActions product={product} />

          {/* معلومات إضافية */}
          <div className="mt-8 border-t border-gray-100 pt-6 space-y-2 text-sm text-gray-500">
            {product.sku && <p>SKU: {product.sku}</p>}
            {product.warranty && (
              <p>Warranty: {product.warranty}</p>
            )}
            {product.shipping && (
              <p>Shipping: {product.shipping}</p>
            )}
            {product.returnPolicy && (
              <p>Return Polic: {product.returnPolicy}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
