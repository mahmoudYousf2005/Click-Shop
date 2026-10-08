import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

const colors = [
  { color: "bg-pink-200", text: "text-pink-500" },
  { color: "bg-purple-200", text: "text-purple-300" },
  { color: "bg-amber-200", text: "text-amber-500" },
  { color: "bg-emerald-100", text: "text-emerald-500" },
];

const CategoryCard = ({ item, count, index }) => {
  const style = colors[index % colors.length];

  return (
    <div className="border border-gray-200 rounded-xl p-8 shadow-lg hover:scale-105 transition-all">
      <div className="flex justify-center cursor-pointer">
        <Image
          className={`${style.color} w-40 mb-4 object-contain rounded-full p-1 hover:scale-125 transition-all`}
          src={item.thumbnail?.trim()}
          width={0}
          height={0}
          unoptimized
          alt={item.category}
        />
      </div>

      <h1 className="text-lg font-bold">{item.category}</h1>
      <h1 className="text-gray-500">{count} Products</h1>

      <Link href="/products">
        <div
          className={`flex items-center justify-center gap-2 mt-2 cursor-pointer font-semibold text-lg ${style.text}`}
        >
          <h1>Shop Now</h1>
          <FaLongArrowAltRight />
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;