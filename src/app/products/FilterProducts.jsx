// components/CategoryFilter.jsx
import Link from "next/link";

const categories = [
  { label: "All", value: null },
  { label: "mens-shoes", value: "mens-shoes" },
  { label: "mens-shirts", value: "mens-shirts" },
];

const CategoryFilter = () => {
  return (
    <div className="flex justify-center items-center gap-10 mb-8">
      {categories.map((cat) => (
        <Link
          key={cat.label}
          href={cat.value ? `/products?category=${cat.value}` : "/products"}
          className="py-2 px-3 bg-green-400 text-white rounded-xl"
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;