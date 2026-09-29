
"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const FilterProducts = () => {
  const [categories, setCategories] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  const currentCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("products").select("category");
      if (error) {
        console.error("Error select categories", error.message);
        return;
      }
      setCategories(["all", ...new Set(data.map((p) => p.category))]);
    };
    fetchCategories();
  }, []);

  const buildCategoryHref = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") params.delete("category");
    else params.set("category", cat);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("min", min); else params.delete("min");
    if (max) params.set("max", max); else params.delete("max");
    router.push(`${pathname}?${params.toString()}`);
  };

  const reset = () => {
    setMin("");
    setMax("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("min");
    params.delete("max");
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!categories) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-orange-500 mb-3">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <Link
                key={cat}
                href={buildCategoryHref(cat)}
                className={`py-2.5 px-4 rounded-xl capitalize transition
                  ${isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"}`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold text-orange-500 mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg outline-none focus:border-orange-400"
          />
          <input
            type="number"
            min="0"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={apply}
            className="py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
          >
            Apply
          </button>
          <button
            onClick={reset}
            className="py-2 border border-gray-300 hover:bg-gray-100 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;