

"use client";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Trash2, Edit2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
const Page = () => {

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter , setStatusFilter] = useState("all")  
  const tabs = [
  { label: "All", value: "all" },
  { label: "Visible", value: "active" },
  { label: "Hidden", value: "hidden" },
];

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Select data from ProductDashboard", error.message);
      } else {
        setProductData(data);
      }
      setLoading(false);
    };
    getData();
  }, []);

    const filterProducts =  productData.filter((product)=>{
        if(statusFilter === "active") return product.is_active;
        if(statusFilter === "hidden") return !product.is_active;
        return true
    })

  const toggleActive = async (product) => {
    const newValue = !product.is_active;

    const { error } = await supabase
      .from("products")
      .update({ is_active: newValue })
      .eq("id", product.id);

    if (error) {
      console.error("Error Toggle Product", error.message);
      return;
    }

    setProductData((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_active: newValue } : p))
    );
  };



  return (
    <div className="w-full p-6 m-4">
      <h1 className="font-bold mb-6 text-lg">Products</h1>
      <h2 className="font-bold text-2xl">Products</h2>
      <h4 className="text-gray-400">Manage your store products — add, edit, hide</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {tabs.map((tab)=>(
            <button key={tab.value}
            onClick={()=> setStatusFilter(tab.value)}
            className={` py-2 px-3 rounded-full text-sm font-medium capitalize cursor-pointer transition
            ${statusFilter === tab.value ?
            "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
            >
                {tab.label}
            </button>
        ))}
      </div>  
      
      <div className="flex justify-end mt-5 md:mt-0">
        <Link href={"addProduct"}
         className="bg-green-400 hover:bg-green-500 py-2 px-3 w-full md:w-fit text-center
          rounded-xl text-white font-bold
         ">
            ADD PRODUCT
        </Link>
      </div>
      </div>
      
      <div className="mx-4 mt-6 bg-white p-4 rounded-xl border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="animate-pulse bg-gray-100 h-12 rounded-xl" key={i} />
            ))}
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-400 text-sm">
                <th className="pb-2 font-normal">Product</th>
                <th className="pb-2 font-normal">Category</th>
                <th className="pb-2 font-normal">Price</th>
                <th className="pb-2 font-normal">Stock</th>
                <th className="pb-2 font-normal">Status</th>
                <th className="pb-2 font-normal">Visibility</th>
                <th className="pb-2 font-normal text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filterProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b ${!product.is_active ? "opacity-50" : ""}`}
                >
                  <td className="py-4">
                    <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`${
                        product.availabilityStatus === "In Stock"
                          ? "bg-green-400"
                          : "bg-red-400"
                      } py-1 px-2 rounded-xl text-sm`}
                    >
                      {product.availabilityStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {product.is_active ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => toggleActive(product)}
                        aria-label={product.is_active ? "إخفاء المنتج" : "استرجاع المنتج"}
                      >
                        {product.is_active ? (
                          <Trash2 className="text-red-500 p-1 border cursor-pointer rounded" />
                        ) : (
                          <RotateCcw className="text-green-600 p-1 border cursor-pointer rounded" />
                        )}
                      </button>
                      <Link href={`/dachpord/addProduct?edit=${product.id}`}
                      aria-label="تعديل المنتج" >
                        <Edit2 className="text-green-500 p-1 border cursor-pointer rounded" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Page;