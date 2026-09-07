import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
const page = async() => {

   const response = await fetch("https://dummyjson.com/products?limit=0",{
        next:{
            revalidate:120
        }
    })

    const data = await response.json()

    const categories = [... new Set(data.products.map((p)=> p.category))]
    const filterCategory = categories.flatMap((cat)=>{

        return data.products.filter((p)=> p.category === cat).slice(0,1)

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
    colors.map((c)=>{
        return c
    })
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
                          <div className="flex justify-center  cursor-pointer">
                              <Image 
                              alt={item.category}
                              className= {`${colors[index % colors.length].color} w-40 mb-4 rounded-full p-1 hover:scale-125 transition-all`}
                                src={item?.thumbnail} width={0} height={0} unoptimized/>
                          </div>
                          <h1 className="text-lg font-bold">{item?.category}</h1>
                          <h1 className="text-gray-500">{item?.category.length -1} Products</h1>
                          {/* <Link href={"products"}>
                            <div className={`flex items-center justify-center gap-2 mt-2  cursor-pointer font-semibold text-lg ${colors[index % colors.length].text}`}>
                                <h1>Shop Now </h1>
                                <FaLongArrowAltRight />
                            </div>
                          </Link> */}
                          
                      </div>
                 ))}
                 
              </div>
    </div>
  )
}

export default page
