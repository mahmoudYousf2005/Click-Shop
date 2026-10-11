"use client"
import { supabase } from "@/lib/supabase"
import { useState , useEffect , Suspense} from "react"
import { useRouter  , useSearchParams} from "next/navigation"
import { Toast } from "@base-ui/react"
const ProductFormPage  = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editId = searchParams.get("edit")
    const isEdit = Boolean(editId)
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
    const [loading , setLoading] = useState(isEdit)
    const [image, setImage] = useState(null);


    useEffect(()=>{
      if(!isEdit) return
      const getProduct = async ()=>{

        const {data: product , error} = await supabase.from("products")
        .select("*")
        .eq("id" , editId).single()
        if(error){
          console.error("Error get product", error.message)
        }else{
          setData((prev)=> ({...prev , ...product}))
        }
        setLoading(false)
      }
      getProduct()
    },[editId , isEdit])

  
    const handleSubmet = async (e) => {
      e.preventDefault()
      if(!isEdit && !image){
        Toast({title:"Add Img"})
        return
      }

      let imageUrl = data.thumbnail

      if(image){
        const fileName = `${Date.now()}-${image.name}`
        const {error:uploadError} = await supabase.storage.from("products").upload(fileName , image)
        if(uploadError){
          console.error("Error upload image: ", uploadError.message)
          return
        }
        const {data: imageData} = await supabase.storage.from("products").getPublicUrl(fileName)
        imageUrl = imageData.publicUrl
      }
      if(isEdit){
        const {id , created_at , is_active , ... values} = data
      
        const { data: updated, error } = await supabase
        .from("products")
        .update({ ...values, thumbnail: imageUrl })
        .eq("id", editId)
        .select()
        if (error || !updated?.length) {
          console.error("Error update data", error?.message)
          return
        }  
        router.push("/dachpord/productsDashboard")
        return 
      }
      const {error} = await supabase.from("products")
      .insert({ ...data, thumbnail: imageUrl })
      if(error){
        console.error("error Add data ", error.message)
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


if (loading) return <div className="p-6 animate-pulse">جاري التحميل...</div>
  return (
    <div className="w-10/12 mx-auto">
      <h1 className="m-5 font-bold text-2xl">{isEdit ? "EDIT PRODUCT" : "ADD PRODUCT"}</h1>
      <form
       onSubmit={handleSubmet}
       className="mb-10 p-10 border  grid grid-cols-1 md:grid-cols-3 md:gap-10">       
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
        <button type="submet"
        className="py-3 px-4 rounded-2xl w-full border cursor-pointer bg-green-400 hover:bg-green-600">
      {isEdit ? "Save Changes" : "Add Product"}</button>
      </form>
      
   

    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">جاري التحميل...</div>}>
      <ProductFormPage />
    </Suspense>
  )
}