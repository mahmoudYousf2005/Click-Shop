"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StateCart from "./StateCart";
const Page = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        ordersCount: 0,
        avgOrderValue: 0,
    });
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data: orders , error } = await supabase.from("orders").select("*")
      if (error) {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
        return;
      }
        const totalSales = orders.reduce((sum , order)=> sum + order.total , 0)
        const ordersCount = orders.length
        const avgOrderValue = ordersCount > 0 ? totalSales / ordersCount : 0
      
        setStats({totalSales , ordersCount , avgOrderValue});
        setLoading(false);

    };
    fetchOrders();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="grid grid-cols-1  md:grid-cols-4 gap-4 mb-4">
        {[1,2,3,4].map((i)=>(
          <div className=" animate-pulse h-28 bg-gray-100 rounded-xl" key={i}/>
        ))}
        </div>
      ):(
        <div className="grid grid-cols-1  md:grid-cols-4 gap-4 mb-4">
          <StateCart 
            label="Total Saqles"
            value={`$${stats.totalSales}`}
          />
          <StateCart label="Orders" value={stats.ordersCount} />
          <StateCart
            label="Avg. Order Value"
            value={`$${stats.avgOrderValue.toFixed(2)}`}
          />
          <StateCart label="Visitors" value="—" />
        </div>
      )}
        
    </div>
  );
};


export default Page;
