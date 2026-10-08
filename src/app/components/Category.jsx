import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import Image from "next/image"
export const dynamic = "force-dynamic";
const Category = async () => {

   
    const {data , error} = await  supabase.from("products").select("*")
     if(error){
        console.error("Error Select Data " , error.message)
        return <p className="text-center text-red-500 py-10">حصل خطأ في تحميل الفئات</p>
     }

     const categories = [... new Set(data.map((p)=>p.category))]
     const filterCategory = categories.flatMap((category)=>{
        return data.filter((prod)=> prod.category === category).slice(0,1)
     }) 

     const categoriesCount = categories.map((category)=>{
        return data.filter((prod)=> prod.category === category).length
     }) 

    const colors = [
        {
            color: "bg-pink-200",
            text:"text-pink-500"
        },
        {
            color: "bg-purple-200",
            text:"text-purple-300"
        },
        {
            color: "bg-amber-200",
            text:"text-amber-500"
        },
        {
            color: "bg-emerald-100",
            text:"text-emerald-500"
        },
    ]
   
    if(data.length === 0){
        return
    }

  return (
    <div className="text-center my-6 container mx-auto">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <h3 className="font-semibold mt-1 text-gray-500">Browse our Top categories</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center gap-6 px-4 my-6 mx-auto">
           {filterCategory.map((item,index)=>(
                <div key={item.id} className="border border-gray-200 rounded-xl p-8 shadow-lg hover:scale-105 transition-all">
                    <div className="flex justify-center  cursor-pointer">
                        <Image className= {`${colors[index % colors.length].color} w-40 mb-4 object-contain rounded-full p-1 
                        hover:scale-125 transition-all`}
                        src={item?.thumbnail.trim()}
                        width={0} height={0}
                        unoptimized
                        alt="category img"                     
                        />
                    </div>
                    <h1 className="text-lg font-bold">{item?.category}</h1>
                    {/* {categoriesCount.map((index,item)=>(
                        <h1 key={index} className="text-gray-500">{item.count} Products</h1>
                    ))} */}
                    <h1>{categoriesCount[index]}</h1>
                    <Link href={"/products"}>
                        <div className={`flex items-center justify-center gap-2 mt-2  cursor-pointer font-semibold text-lg ${colors[index % colors.length].text}`}>
                            <h1>Shop Now </h1>
                            <FaLongArrowAltRight />
                        </div>
                    </Link>
                    
                </div>
           ))}
           
        </div>
         <div className="text-right mt-8 px-8 flex justify-end ">
                    <Link href={"/categories"}>
                        <button className="flex items-center gap-1 border border-orange-300 text-orange-500
                        font-bold px-2 py-1 rounded-lg cursor-pointer">View All Categories  <FaLongArrowAltRight />
                        </button>
                    </Link>
        
                </div>
    </div>
  )
}

export default Category




// import Link from "next/link";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import { supabase } from "@/lib/supabase";
// // import { isNetworkError } from "@/lib/isNetworkError";
// import CategoryCard from "./CategoryCard";
// import RetryLoader from "./RetryLoader";

//  const isNetworkError = (error) => {
//   const msg = (error?.message || String(error || "")).toLowerCase();
//   return msg.includes("fetch failed") || msg.includes("network");
// };



// export const dynamic = "force-dynamic";

// const Category = async () => {
//   let data, error;

//   try {
//     ({ data, error } = await supabase.from("products").select("*"));
//   } catch (e) {
//     // الـ fetch فشل خالص (النت فاصل)
//     if (isNetworkError(e)) return <RetryLoader />;
//     console.error("Unexpected error", e);
//     return <p className="text-center text-red-500 py-10">حصل خطأ في تحميل الفئات</p>;
//   }

//   if (error) {
//     if (isNetworkError(error)) return <RetryLoader />; // من غير console.error

//     console.error("Error Select Data", error.message);
//     return <p className="text-center text-red-500 py-10">حصل خطأ في تحميل الفئات</p>;
//   }

//   if (!data || data.length === 0) return null;

//   // نجمّع المنتجات حسب الفئة: أول منتج + العدد
//   const grouped = {};
//   data.forEach((prod) => {
//     if (!grouped[prod.category]) {
//       grouped[prod.category] = { item: prod, count: 0 };
//     }
//     grouped[prod.category].count++;
//   });
//   const categories = Object.values(grouped);

//   return (
//     <div className="text-center my-6 container mx-auto">
//       <h2 className="text-3xl font-bold">Shop by Category</h2>
//       <h3 className="font-semibold mt-1 text-gray-500">Browse our Top categories</h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center gap-6 px-4 my-6 mx-auto">
//         {categories.map(({ item, count }, index) => (
//           <CategoryCard key={item.id} item={item} count={count} index={index} />
//         ))}
//       </div>

//       <div className="text-right mt-8 px-8 flex justify-end">
//         <Link href="/categories">
//           <button className="flex items-center gap-1 border border-orange-300 text-orange-500 font-bold px-2 py-1 rounded-lg cursor-pointer">
//             View All Categories <FaLongArrowAltRight />
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Category;