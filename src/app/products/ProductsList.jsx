export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import FilterProducts from "./FilterProducts"
import ProductCard from "./ProductCard"

const ProductsList = async ({searchParams}) => {

  const {category} = await  searchParams || {}
console.log(category)

  let query = supabase.from("products").select("*" )
  if(category){
    query = query.eq("category" , category  )
  }
  const { data, error } = await query
  if(error){
    console.error("Error Insert Data " , error.message)
    return <p className="text-center text-red-500 py-10">حصل خطأ في تحميل الفئات</p>

  }
  // count total products

 const { count: totalCount } = await supabase
  .from("products")
  .select("*", { count: "exact", head: true })


  if(!data.length){
    return(
      <div className="flex items-center justify-center h-64 text-gray-400">
         لا توجد منتجات تطابق الفلتر
       </div>
    )
  }
  return (
    <div className="">
       <div className="flex items-center justify-between m-2 px-6">
         <p className="text-sm text-gray-500"> 
            Showing 1– {data.length}of {totalCount} products
         </p>
      </div>

      
      <div className="flex justify-center items-center gap-10 mb-8">
       <FilterProducts />
      </div>
      <div className="grid grid-cols-5">
        {data?.map((product)=>(
        <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default ProductsList

