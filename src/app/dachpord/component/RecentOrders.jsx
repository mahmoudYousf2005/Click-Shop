
"use client"
import { useEffect , useState } from "react"
import { supabase } from "@/lib/supabase"

const RecentOrders = () => {

    const [orders , setOrders] = useState([])
    const [loading , setLoading] = useState(false)
    useEffect(()=>{
        const fetchRecentOrders = async ()=>{
            const {data:ordersData , error:ordersError} = await supabase.from("orders")
            .select("id,total,status,created_at,user_id")
            .order("created_at", { ascending: false })
            .limit(5)

            if(ordersError){
                console.error("Error fetching recent orders:", ordersError.message);
                setLoading(false);
                return;
            }

         

            setOrders(ordersData)
            setLoading(false)
        }
        fetchRecentOrders()
    },[])

    if(loading){
        return(
            <div className="bg-white border border-gray-100 rounded-xl p-5">
                <h2 className="font-bold text-sm mb-4">Recent Orders</h2>
                <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                ))}
                </div>
            </div>
        )
    }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 overflow-x-auto mt-6">
      <h2 className="font-bold text-sm mb-4">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-400">No orders yet</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 last:border-none">
                <td className="py-3 font-mono text-xs text-gray-600">
                  {order.user_id.slice(0, 8)}...
                </td>
                <td className="py-3 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      [order.status] || "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-right font-bold">
                  ${order.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentOrders


//  const userId = ordersData.map((u)=>u.user_id)

//             const {data:profileData , error:profilesError } = await supabase.from("profiles").select("id , full_name , email")
//             .in("id" , userId)
//             if(profilesError){
//               console.error("Error fetching profiles:", profilesError.message);
//               return
//             }

//             const marged = profileData.map((order)=>({
//               ...order ,
//               profile: profileData.find((p)=> p.id === order.user_id) || null
//             }))