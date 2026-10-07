"use client"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import {  Trash2 , Edit2} from "lucide-react";
import { useEffect , useState} from "react";
const Page = () => {
    const [productData , setProductData] = useState([])
    const [loading , setLoading] = useState(true)
    useEffect(()=>{

        const getData = async ()=>{ 
            const {data , error} = await supabase.from("products").select("*")
            
            if(error){
                console.error("Select data from ProductDashboard" , error.message)
                setLoading(false)
                return 
            }
            setProductData(data)
            setLoading(false)
        }
        getData()
    },[])
    

    const handeleDelete = async(id) => {
        const { data , error} = await supabase.from("products").delete().eq("id" , id)
        if(error){
            console.error("Error Delete Data from productsDashboard" , error.message)
            setLoading(false)
            return
        }
        setProductData(data)
        setLoading(false)
    }

    

  return (
    <div className="w-full p-6 m-4">
        <h1 className="font-bold mb-6 text-lg">Products</h1>
        <h2 className="font-bold ext-xl text-2xl">Products</h2>
        <h4 className="text-gray-400">Manage your store products — add, edit, delete</h4>

        <div className="mx-4 mt-6 bg-white p-4 rounded-xl border border-gray-200">
     
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b pb-2 text-gray-400 text-sm ">
                <h4>Product</h4>
                <h4>Category</h4>
                <h4>Price</h4>
                <h4>Stock</h4>
                <h4>Status</h4>
            </div>

            <div className="">
                {loading ? (
                    <div className=" space-y-3">
                        {[1,2,3,4,5,].map((i)=>(
                            <div className="animate-pulse bg-gray-100 h-12 rounded-xl" key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="">
                        {productData.map((product) => (
                            <div
                                key={product.id}
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b py-4"
                                >
                                    <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden h-12">
                                    <Image 
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 50px) "
                                    className="object-cover group-hover:scale-105 transition duration-300"/>
                                </div>
                                <h4 className="flex items-center">{product.category}</h4>
                                <h4 className="flex items-center">{product.price}</h4>
                                <h4 className="flex items-center">{product.stock}</h4>
                                <div className="flex items-center">
                                    <h4 className={`${product.availabilityStatus === "In Stock" ? "bg-green-400" : "bg-red-400"}
                                    py-1 h- px-2 rounded-xl flex justify-center items-center`}>{product.availabilityStatus}</h4>
                                </div>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={()=>handeleDelete(product.id)}>
                                        <Trash2 className="bg-red text-red-500 p-1 border cursor-pointer rounded"/>
                                    </button>
                                    <button>
                                    <Edit2 className="bg-red text-green-500 p-1 border cursor-pointer rounded"/>
                                    </button>
                                    
                                </div>
                            </div>
                
                        ))}
                    </div>
                )}
               
               
            </div>
        </div>
    </div>
  )
}

export default Page
