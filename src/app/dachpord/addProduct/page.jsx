"use client"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
const Page = () => {
     
    const [data , setData] = useState({
        title:"",
        description:"",
        category:"",
        price:"",
        discountPercentage:"",
        rating:"",
        brand:"",
        stock:"",
        sku:"",
        weight:"",
        width:"",
        heigth:"",
        depth:"",
        warranty:"",
        shipping:"",
        returnPolicy:"",
        availabilityStatus:"",
        minimumOrderQuantity:"",
       
    })
    const [image, setImage] = useState(null);
    const handleSubmet = async (e)=>{
        e.preventDefault() 
         const { data: { session } } = await supabase.auth.getSession();
        console.log("Session:", session)
        if(!image){
            console.log("add img")
            return
        }

        const fileName = `${Date.now()}-${image.name}`
        // رفع الصورة
        const {error:uploadError} = await supabase.storage.from("Products").upload(fileName , image)
         if(uploadError){
            console.error("Error upload image: " , uploadError.message)
            return
        }

          // الحصول على رابط الصورة
        const { data: imageData } = supabase.storage
        .from("Products")
        .getPublicUrl(fileName);

        const imageUrl = imageData.publicUrl;

        const {error} = await supabase.from("products").insert({...data , thumbnail: imageUrl})
        if(error){
          console.error("error Add data " , error.message)
          return
        }
        setData({
        title:"",
        description:"",
        category:"",
        price:"",
        discountPercentage:"",
        rating:"",
        brand:"",
        stock:"",
        sku:"",
        weight:"",
        width:"",
        heigth:"",
        depth:"",
        warranty:"",
        shipping:"",
        returnPolicy:"",
        availabilityStatus:"",
        minimumOrderQuantity:"",
    })
    setImage(null)
    }

  return (
    <div className="w-10/12 mx-auto">

      <form onSubmit={handleSubmet} className="mb-10 p-10 border  grid grid-cols-1 md:grid-cols-3 md:gap-10">       
        <input
        type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="title"
        value={data.title}
        onChange={(e)=> setData((prev)=>({...prev , title:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="description"
        value={data.description}
        onChange={(e)=> setData((prev)=>({...prev , description:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="category"
        value={data.category}
        onChange={(e)=> setData((prev)=>({...prev , category:e.target.value}))}
        />
        <input type="number" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="price"
        value={data.price}
        onChange={(e)=> setData((prev)=>({...prev , price:e.target.value}))}
        />
        <input type="number" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="discountPercentage"
        value={data.discountPercentage}
        onChange={(e)=> setData((prev)=>({...prev , discountPercentage:e.target.value}))}
        />
        <input type="number" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="rating"
        value={data.rating}
        onChange={(e)=> setData((prev)=>({...prev , rating:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="brand"
        value={data.brand}
        onChange={(e)=> setData((prev)=>({...prev , brand:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Stock"
        value={data.stock}
        onChange={(e)=> setData((prev)=>({...prev , stock:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="SKU"
        value={data.sku}
        onChange={(e)=> setData((prev)=>({...prev , sku:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Weight"
        value={data.weight}
        onChange={(e)=> setData((prev)=>({...prev , weight:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Width"
        value={data.width}
        onChange={(e)=> setData((prev)=>({...prev , width:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Heigth"
        value={data.heigth}
        onChange={(e)=> setData((prev)=>({...prev , heigth:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Depth"
        value={data.depth}
        onChange={(e)=> setData((prev)=>({...prev , depth:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Warranty"
        value={data.warranty}
        onChange={(e)=> setData((prev)=>({...prev , warranty:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="Shipping"
        value={data.shipping}
        onChange={(e)=> setData((prev)=>({...prev , shipping:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="AvailabilityStatus"
        value={data.availabilityStatus}
        onChange={(e)=> setData((prev)=>({...prev , availabilityStatus:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="ReturnPolicy"
        value={data.returnPolicy}
        onChange={(e)=> setData((prev)=>({...prev , returnPolicy:e.target.value}))}
        />
        <input type="text" 
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none"
        placeholder="MinimumOrderQuantity"
        value={data.minimumOrderQuantity}
        onChange={(e)=> setData((prev)=>({...prev , minimumOrderQuantity:e.target.value}))}
        />
        <input
        className="block w-full py-2 px-4 rounded-xl border mb-4 outline-none cursor-pointer"
        type="file"
        placeholder="URLIMAGES"
        onChange={(e)=> setImage(e.target.files[0])}
        />
        <button className="py-3 px-4 rounded-2xl w-full border cursor-pointer bg-green-400 hover:bg-green-600">
      ADD</button>
      </form>
      
   

    </div>
  )
}

export default Page