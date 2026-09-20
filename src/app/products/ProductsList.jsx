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
    return
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
    <div>
       <div className="flex items-center justify-between mb-4">
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



// import { supabase } from "@/lib/supabase";
// import Link from "next/link";
// const Page = async ({ searchParams }) => {
//   const { category } = await searchParams || {}
//   console.log(category)
//   let query = supabase
//     .from("products")
//     .select("*");

//   if (category) {
//     query = query.eq("category", category || "");
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("select data", error.message);
//   }

//   return (
//     <div>

//       <div className="flex justify-center py-10 ">
//         <Link href={"addProduct"}
//         className="py-2 px-3 bg-green-400 text-white rounded-xl"
//         >ADD PRODUCT</Link>
//       </div>
//       <div className="flex justify-center items-center gap-10 mb-8">
//         <Link
//           href="/products"
//           className="py-2 px-3 bg-green-400 text-white rounded-xl"
//         >
//           All
//         </Link>

//         <Link
//           href="/products?category=beauty"
//           className="py-2 px-3 bg-green-400 text-white rounded-xl"
//         >
//           beauty
//         </Link>

//         <Link
//           href="/products?category=mens-shoes"
//           className="py-2 px-3 bg-green-400 text-white rounded-xl"
//         >
//           mens-shoes
//         </Link>
//         <Link
//           href="/products?category=mens-shirts"
//           className="py-2 px-3 bg-green-400 text-white rounded-xl"
//         >
//           mens-shirts
//         </Link>
//       </div>

//       <div className="grid grid-cols-4 justify-center items-center gap-10">
//         {data?.map((item) => (
//           <div key={item.id} className="">
//             <h2>{item.title}</h2>
//             <p>{item.category}</p>
            
//               <img src={item?.thumbnail} width={100} height={100}  alt={item.title} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;
