"use client"
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { useState , useEffect } from "react";
const CategoryFilter =  () => {
  const [data , setData] = useState(null)
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"
  useEffect(()=>{
    const fetchData = async ()=>{
    const {data , error} = await supabase.from("products").select("*")
    if(error){
      console.error("Error select categorisData" , error.message)
      return
    }
      const categories = ["all",...new Set(data.map((p) => p.category))];
      setData(categories)
    }
    fetchData()
  },[])
  
if(!data) return null
  return (
    <div className="sticky top-40 z-40 flex justify-center items-center gap-4 mb-8 ">
      {data.map((cat , index) => {
        const isActive = currentCategory === cat;
       return (<Link
          key={index}
          href={cat === "all" ? "/products" : `/products?category=${cat}`  }
          className={`py-2 px-3   rounded-xl capitalize
          ${isActive ? "bg-gray-900 shadow-sm text-white" :
          "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"}  
          `}
        >
          {cat}
        </Link>)
      })}
    </div>
  );
};

export default CategoryFilter;