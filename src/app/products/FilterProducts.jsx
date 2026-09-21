import Link from "next/link";
import { supabase } from "@/lib/supabase";


const CategoryFilter = async () => {

  const {data , error} = await supabase.from("products").select("*")
  if(error){
    console.error("Error select categorisData" , error.message)
    return
  }
    const categories = ["all",...new Set(data.map((p) => p.category))];
    console.log(categories)

  return (
    <div className="flex justify-center items-center gap-10 mb-8">
      {categories.map((cat , index) => (
        <Link
          key={index}
          href={cat === "all" ? "/products" : `/products?category=${cat}`  }
          className="py-2 px-3 bg-green-400 text-white rounded-xl"
        >
          {cat}
      {console.log(cat)}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;