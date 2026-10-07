"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const { data, error } = await supabase.from("orderItems").select("*");

      if (error) {
        console.error("Error fetching order items:", error.message);
        setLoading(false);
        return;
      }

      const grouped = {};

      data.forEach((item) => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            product_id: item.product_id,
            title: item.title,
            category: item.category,
            total_sold: 0,
            total_revenue: 0,
            thumbnail: item.thumbnail
          };
        }
        grouped[item.product_id].total_sold += item.quantity;
        grouped[item.product_id].total_revenue += item.price * item.quantity;
      });

      const topProducts = Object.values(grouped)
        .sort((a, b) => b.total_sold - a.total_sold)
        .slice(0, 4);

      setProducts(topProducts);
      setLoading(false);
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="font-bold text-sm mb-4">Top Products</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 border border-gray-100 rounded-xl">
      <h2 className="font-bold text-sm mb-4">Top Products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-gray-400">No sales yet</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {products.map((item) => (
            <li
              key={item.product_id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                <Image src={item.thumbnail}
                width={50}
                height={50}
                alt="product thumbnail"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {item.category} — {item.total_sold} sold
                </p>
              </div>
              <p className="text-sm font-bold">${item.total_revenue.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopProducts;