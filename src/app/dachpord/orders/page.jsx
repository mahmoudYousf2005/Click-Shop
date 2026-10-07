"use client"

import { supabase } from "@/lib/supabase";
import { useState , useEffect } from "react";
import OrderRow from "./OrderRow";
const Page = () => {

  const [orders, setOrders] =useState([])
  const [loading , setLoading] =useState(true)
  const [statusFilter , setStatusFilter] = useState("all")
 const tabs = ["all", "pending", "paid", "shipped", "failed"];

  // get data
  useEffect(()=>{
    const fetchOrders = async ()=>{

      const {data , error} = await supabase.from("orders")
      .select("*")
      .order("created_at" , {ascending: false})
      if(error){
        console.error("Error fetching orders:", error.message);
        setLoading(false);
        return;
      }
      setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  },[])

  const filterOrders = 
  statusFilter === "all" ?
  orders : orders.filter((o)=> o.status === statusFilter)


  return (
    <div className="w-full p-6 m-4">
      <h1 className="text-2xl font-bold mb-1">Orders</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage and track all customer orders
      </p>

      <div className="flex flex-col w-full md:flex-row gap-2 items-center mb-5">
        {tabs.map((tab)=>(
          <button 
          key={tab}
          onClick={()=> setStatusFilter(tab)}
          className={`w-full py-2 rounded-full text-sm font-medium capitalize cursor-pointer transition
          ${statusFilter === tab ?
            "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}>
            {tab}
          </button>
        ))}
      </div>
            
        
      <div className="bg-white border border-gray-100 p-5 rounded-xl ">
        
        {loading ? (
          <div className="space-y-3">
             {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) :  filterOrders.length === 0 ?(
              <p className="text-sm text-gray-400 text-center py-10">
                No orders found
              </p>
        )  : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 text-sm">
              <th className="pb-2 font-medium w-8"></th>
              <th className="pb-2 font-medium">Order</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right pr-2">Amount</th>
            </tr>
          </thead>
            
          <tbody>
            {filterOrders.map((order)=>(
              <OrderRow key={order.id} order={order}/>
            ))}
          </tbody>
        </table>
        )

         }
       
     </div>


    </div>
  )
}

export default Page