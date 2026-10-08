"use client"
import { useEffect , useState } from "react"
import { supabase } from "@/lib/supabase"
import { Divide } from "lucide-react";
const statusStyles = {
  Regular: "bg-green-50 text-green-600",
  Vip: "bg-red-50 text-red-600",
  New: "bg-blue-50 text-blue-600",
};
const CustomersProfiles = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async ()=>{
            const {data:profileData ,error:profileError} = await supabase.from("profiles").select("*")
            if(profileError){
                console.error("Error get data customers" , profileError.message)
                setLoading(false)
                return
            }
            const {data:ordersData ,error:ordersError} = await supabase.from("orders").select("*")
             if(ordersError){
                console.error("Error get data customers" , ordersError.message)
                setLoading(false)
                return
            }

            const now = new Date()
            const thirtyDaysAgo = new Date(now * 30 * 24 * 60 * 60 * 1000)

            const merged = profileData.map((profile)=>{
              const customerOrders = ordersData.filter((order)=> order.user_id === profile.id)
              const ordersCount = customerOrders.length
              const totalSpent  = customerOrders.reduce((sum , order) => sum + order.total , 0) 
              let status = "Regular"
              if(totalSpent > 500){
                status = "Vip"
              }else if(new Date(profile.created_at ) >= thirtyDaysAgo){
                status = "New"
              }
              return {
                id:profile.id,
                createdAt: profile.created_at,
                ordersCount,
                totalSpent,
                status
              }
            })

            setCustomers(merged)
            setLoading(false)
        }
        fetchData()
    },[])
  return (
    <>
        
        {loading ? (
            <tr>
                <td colSpan={5}>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div className="animate-pulse h-12 bg-gray-100 rounded-xl" key={i} />
                        ))}
                    </div>
                </td>
            </tr>
        ):( customers.length === 0 ? (
            <tr>
                <td colSpan={6} className="text-center text-sm text-gray-400 py-10">
                    No Customerse Found
                </td>
            </tr>
        ):(
            customers.map((item) => (
                <tr key={item.id} className="text-left text-gray-600 border-b border-gray-100 text-sm w-full ">
                    <td className="py-3  text-xs text-gray-600 px-2">
                        {item.id.slice(0, 8)}...
                    </td>
                    <td className="py-3 px-2">{item.ordersCount}</td>
                    <td className="py-3 px-2">${item.totalSpent.toFixed(2)}</td>
                    <td className="py-3 px-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2 ">
                        <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            statusStyles[item.status] || "bg-gray-50 text-gray-500"
                        }`}
                    >
                            {item.status}
                        </span>
                    </td>
                </tr>
            ))
        )
            
        )}

    </>
  )
}

export default CustomersProfiles


