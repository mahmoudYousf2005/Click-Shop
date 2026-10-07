"use client"

import { ChevronDown, ChevronUp } from "lucide-react";
import {  useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
const statusStyles = {
  paid: "bg-green-50 text-green-600",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-red-50 text-red-600",
  shipped: "bg-blue-50 text-blue-600",
};
const OrderRow = ({order}) => {

    const [expanded, setExpanded] = useState(false);
    const [items , setItems] = useState([])
    const [loading , setLoading] = useState(false)

  
        const fetchData = async()=>{
            if(!expanded && items.length === 0){
                setLoading(true); 
                const {data , error} = await supabase.from("orderItems").select("*").eq("order_id" , order.id)
                if(error){
                    console.error("Error fetching order items:", error.message);
                }else{
                    setItems(data)
                }
                setLoading(false)
            }
          setExpanded((prev)=> !prev)
        }
        
  return (
    <>
      <tr onClick={fetchData}
       className="border-b border-gray-50 hover:bg-gray-50 rounded-xl">
        <td className="py-3 pl-2">
            {expanded ? (
                <ChevronUp className="w-4 h-4 text-gray-400"/>
            ):(
                <ChevronDown className="w-4 h-4 text-gray-400"/>
            )}
        </td>
       <td className="py-3 text-xs text-gray-500">#{order.id}</td>
        <td className="py-3  text-xs text-gray-600">
          {order.user_id.slice(0, 8)}...
        </td>
        <td className="py-3 text-gray-500">
          {new Date(order.created_at).toLocaleDateString()}
        </td>
        <td className="py-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              statusStyles[order.status] || "bg-gray-50 text-gray-500"
            }`}
          >
            {order.status}
          </span>
        </td>
        <td className="py-3 text-right font-bold pr-2">
          ${order.total.toFixed(2)}
        </td>
      </tr>

      {expanded && (
        <tr  className="bg-gray-50/60">
            <td colSpan={6} className="px-6 py-4">
                {loading ? (
                    <p className="text-xs text-gray-400">Loading items...</p>
                ): items.length === 0 ? (
                    <p className="text-xs text-gray-400">No items found</p>
                ):(
                    <ul className="space-y-2 ">
                        {items.map((item)=>(
                            <li key={item.id}
                            className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <Image 
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        unoptimized
                                        className="object-contain"
                                    />
                                </div>
                                <span>{item.title}</span>
                                <span>{item.quantity}</span>
                             </div>
                                <span>{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                )

                }
            </td>
        </tr>
      )}
    </>
  )
}

export default OrderRow
