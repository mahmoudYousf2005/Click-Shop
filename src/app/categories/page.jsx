import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";
const Page = async() => {

   const { data, error } = await supabase.from("products").select("*");
    if(error){
        console.error("Error Select data to categories" , error.message)
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
    
  return (
    <div className="container mx-auto">
     <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between">
        <div className="">
          <h2 className="text-sm font-semibold text-orange-400">SHOP NOW</h2>
          <h1 className="font-bold text-2xl">All Categories</h1>
        </div>

        <p className="text-sm text-gray-500">Home &gt; Categories</p>
        
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center gap-6 px-4 my-6 mx-auto">
                 {filterCategory.map((item,index)=>(
                      <div key={item.id} className="border border-gray-200 rounded-xl p-8 shadow-lg">
                          <div className=" relative flex  mx-auto w-40 h-40  cursor-pointer">
                                <Image 
                                src={item?.thumbnail}
                                alt={item.category}
                                className= {`${colors[index % colors.length].color} object-contain mb-4 rounded-full p-1 hover:scale-125 transition-all`}
                                fill
                                sizes="160px"

                                />
                          </div>
                          <h1 className="text-lg font-bold mt-2">{item?.category}</h1>
                          <Link href={"/products"}>
                            <h1 className="text-gray-500">{categoriesCount[index]} Products</h1>
                         </Link>
                          
                      </div>
                 ))}
                 
              </div>
    </div>
  )
}

export default Page
