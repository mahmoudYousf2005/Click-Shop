"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    if( !formData.name||!formData.email || !formData.password){
      setError(" الرجاء اكمال البيانات")
      return
    }

    setLoading(true)

    const {error : signUpError} = await supabase.auth.signUp({
      options: {
        data: {
          name: formData.name,
        },
      },
      email: formData.email ,
      password: formData.password ,
    })
    setLoading(false)

    if( signUpError ){
     setError(getErrorMessage(signUpError.message));
      return
    }
    // else{
    //   alert("تم انشاء حساب")
    // }
    router.push("/signIn")
  };

  const getErrorMessage = (message) => {
    if (message.includes("already registered")) {
      return "الإيميل ده مسجل بالفعل";
    }
    if (message.includes("Password should be at least")) {
      return "كلمة السر ضعيفة، لازم تكون 6 حروف على الأقل";
    }
    if (message.includes("Unable to validate email")) {
      return "الإيميل غير صحيح";
    }
    return "حصل خطأ، حاول تاني";
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md border border-gray-100 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-1">إنشاء حساب جديد</h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          سجّل عشان تقدر تتابع طلباتك ومفضلتك
        </p>

        <form onSubmit={handleSubmit} noValidate  className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">الاسم</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e)=> setFormData((prev)=>({...prev , name: e.target.value}))}
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e)=> setFormData((prev)=>({...prev , email: e.target.value}))}
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">كلمة السر</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e)=> setFormData((prev)=>({...prev , password: e.target.value}))}
              required
              minLength={6}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          عندك حساب بالفعل؟{" "}
          <Link href={"/signIn"} className="text-orange-500 font-medium">
            سجّل دخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;