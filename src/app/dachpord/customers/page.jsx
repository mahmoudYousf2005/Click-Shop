"use client"
import { useState , useEffect } from "react"
import { supabase } from "@/lib/supabase"
import CartsCustomers from "./CartsCustomers"
import CustomersProfiles from "./CustomersProfiles"
const Page = () => {
    const [stats , setStats] = useState({
        totalProfile :0,
        NewThisMonth:0,
        AvgSpendr:0,
    })
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async ()=>{
            const {data:profileData ,error: profileError} = await supabase.from("profiles").select("*")
            // .eq("created_at")
            if(profileError){
                console.error("Error fetch data customers component" ,profileError.message)
                setLoading(false)
                return
            }

            const {data:ordersData , error:orderError} = await supabase.from("orders").select("*")
            if(orderError){
                console.error("Error fetch data customers component" ,profileError.message)
                setLoading(false)
                return
            }



            const totalProfile  = profileData?.length || 0

            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const NewThisMonth = profileData.filter(
                (p) => new Date(p.created_at) >= startOfMonth
            ).length;

            const totalSales = ordersData.reduce((sum, order) => sum + order.total, 0);
            const AvgSpendr = totalProfile > 0 ? totalSales / totalProfile : 0;
            setStats({totalProfile  ,NewThisMonth , AvgSpendr})
            setLoading(false)
        }
        fetchData()
    },[])
  return (
    <div className="p-6 m-4">
        <h1 className="text-2xl font-bold mb-1">Customers</h1>
        <p className="text-sm text-gray-500 mb-6">
            Everyone who has an account or placed an order
        </p>
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[1,2,3].map((i)=>(
                    <div className="animate-pulse bg-gray-100 border border-gray-100 rounded-xl p-5 h-28" key={i}/>     
                ))}
            </div>
        ):(
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <CartsCustomers label="Total Customers" value={stats.totalProfile}/>
            <CartsCustomers label="New This Month" value={stats.NewThisMonth}/>
            <CartsCustomers label="Avg. Spend / Customer" value={stats.AvgSpendr.toFixed(2)}/>
        </div>
        )}
        <table className="w-full" >
           
                <thead className=" text-xs">
                    <tr className="text-left text-gray-400 border-b border-gray-100 text-sm">
                        <th className="pb-2 font-medium">Customer</th>
                        <th className="pb-2 font-medium">Orders</th>
                        <th className="pb-2 font-medium">Total Spent</th>
                        <th className="pb-2 font-medium">Joined</th>
                        <th className="pb-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="">
                    <CustomersProfiles />
                </tbody>
            
        </table>
       
      
    </div>
  )
}

export default Page
