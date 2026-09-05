
"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const FilterProducts = () => {
  const [down, setDown] = useState(true);
  const [data, setData] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const initialMin = Number(searchParams.get("minPrice")) || MIN_PRICE;
  const initialMax = Number(searchParams.get("maxPrice")) || MAX_PRICE;
  const [priceRange, setPriceRange] = useState([initialMin, initialMax]);

  const debounceTimer = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleCategoryChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value); 

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("minPrice", value[0]);
      params.set("maxPrice", value[1]);
      router.push(`/products?${params.toString()}`);
    }, 500);
  };

  const handleClearAll = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    router.push("/products");
  };

  if (!data) return null;

  const categories = [...new Set(data.products.map((p) => p.category))];
  const categoriesWithCount = categories.map((category) => ({
    category,
    count: data.products.filter((p) => p.category === category).length,
  }));

  return (
    <div className="container mx-auto">
      <div className="border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between border-b p-4 border-gray-100 pb-3">
          <h1>Filter</h1>
          <h2 className="cursor-pointer text-orange-500" onClick={handleClearAll}>
            Clear All
          </h2>
        </div>

        <div className="px-3">
          <div className="flex items-center justify-between my-2">
            <h2>Categories</h2>
            {down ? (
              <ChevronDown onClick={() => setDown(!down)} className="cursor-pointer" />
            ) : (
              <ChevronUp onClick={() => setDown(!down)} className="cursor-pointer" />
            )}
          </div>

          {!down && (
            <div className="px-3">
              <RadioGroup value={currentCategory} onValueChange={handleCategoryChange}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="all" id="cat-all" />
                    <Label htmlFor="cat-all">All Categories</Label>
                  </div>
                  <h2>({data.products.length})</h2>
                </div>
                {categoriesWithCount.map(({ category, count }) => (
                  <div key={category} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={category} id={`cat-${category}`} />
                      <Label className="capitalize font-bold" htmlFor={`cat-${category}`}>
                        {category}
                      </Label>
                    </div>
                    <h2>({count})</h2>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="mt-4 border-t border-gray-100 pt-4">
            <h2 className="font-semibold mb-3">Price Range</h2>
            <Slider
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={5}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;