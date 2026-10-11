
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/toast";

const Page = () => {
  const [form, setForm] = useState({
    store_name: "",
    contact_email: "",
    currency: "USD",
    shipping_rate: 0,
    free_shipping_threshold: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    const fetchData = async ()=>{
      const {data , error} = await supabase.from("setting")
      .select("*")
      .eq("id" , 1)
      .single()

      if(error){
        console.log("Error fetch data for Setting " , error.message)
        setLoading(false)
        return
      }
      setForm({
        store_name: data.store_name || "",
        contact_email: data.contact_email || "",
        currency: data.currency || "USD",
        shipping_rate:data.shipping_rate || 0,
        free_shipping_threshold:data.free_shipping_threshold || 0,
      })
      setLoading(false)
    }

    fetchData()
    

  },[])

  const handleChange = (e)=>{
    const {name , value} = e.target
    setForm((prev)=>({
      ...prev,
      [name]: value
    }))
  }


  const handleSave = async () =>{
    setSaving(true)
    const {data , error} = await supabase.from("setting")
    .update({
      store_name: form.store_name,
       contact_email: form.contact_email ,
        currency: form.currency,
        shipping_rate:Number(form.shipping_rate) ,
        free_shipping_threshold:Number(form.free_shipping_threshold)
    })
    .eq("id" , 1)
    .select()

    setSaving(false)
    if(error){
      console.error("Error saving settings:", error.message);
      toast.add({ title: "Something went wrong" });
      return;
    }

    if(!data || data?.length === 0){
      console.warn("No row updated - check the settings row and RLS policy");
      toast.add({ title: "Nothing was saved" });
      return;
    }
    toast.add({ title: "Settings saved" });
  }



  const inputClass =
    "w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400";

  return (
    
    <div className="p-6 m-4 space-y-6">
     
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your store profile and shipping rules
      </p>

      {loading ? (
        <div className=""></div>
      ):(
        <div className="">
      
          <div className="bg-white rounded-xl p-6 space-y-4 mt-6">

            <h4 className="font-bold text-sm mb-1">Store Profile</h4>
            <p className="text-xs text-gray-400 mb-4">Basic information about your store</p>
            <div className="">
              <label className="block text-xs font-semibold mb-1.5" >Stoer Name</label>
              <input type="text"
              name="store_name"
              value={form.store_name}
              onChange={handleChange}
              className={inputClass}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label className="block text-xs font-semibold mb-1.5">Contact Email</label>
                <input type="text"
                name="contact_email"
                value={form.contact_email}
                onChange={handleChange}
                className={inputClass} />
              </div>
              <div className="">
                <label className="block text-xs font-semibold mb-1.5">Currency</label>
                <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EGP">EGP - Egyptian Pound</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
              </div>
            </div>
          </div>

          {/* shipping */}

          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-sm mb-1">Shipping</h4>
            <p className="text-xs text-gray-400 mb-4">Applied automatically in the customer cart</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label className="block text-xs font-semibold mb-1.5">Flat Shipping Rate</label>
                <input type="number"
                name="shipping_rate"
                value={form.shipping_rate}
                onChange={handleChange}
                className={inputClass} />
              </div>
              <div className="">
                <label className="block text-xs font-semibold mb-1.5">Free Shipping Over</label>
                <input type="number"
                name="free_shipping_threshold"
                value={form.free_shipping_threshold}
                onChange={handleChange}
                className={inputClass} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="py-2 px-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-xl
            cursor-pointer text-white text-sm font-semibold"
            disabled={saving}
            onClick={handleSave}
            >{saving ? "Save..." : "Save Changes"}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
// bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg