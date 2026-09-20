"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.email || !formData.password) {
    setError("الرجاء اكمال البيانات");
    return;
  }

  setLoading(true);

  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    setLoading(false);
    setError(getErrorMessage(error.message));
    return;
  }

  // هنا الجزء الجديد: نتحقق من الـ role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  setLoading(false);

  if (profileError) {
    console.error("Error fetching profile", profileError.message);
    router.push("/"); // لو حصل خطأ، وديه الصفحة الرئيسية على الأقل
    return;
  }

  if (profile?.role === "admin") {
    router.push("/dachpord");
  } else {
    router.push("/");
  }
};

 const getErrorMessage = (message) => {
  if (message.includes("Invalid login credentials")) {
    return "الإيميل أو كلمة السر غلط";
  }
  if (message.includes("Email not confirmed")) {
    return "لازم تأكد إيميلك الأول";
  }
  if (message.includes("too many requests") || message.includes("rate limit")) {
    return "محاولات كتير غلط، حاول تاني بعد شوية";
  }
  return "حصل خطأ، حاول تاني";
};

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md border border-gray-100 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-1">تسجيل الدخول</h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          سعداء برجوعك تاني
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium">كلمة السر</label>
              {/* <Link href="/forgot-password" className="text-xs text-orange-500">
                نسيت كلمة السر؟
              </Link> */}
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          لسه معندكش حساب؟{" "}
          <Link href={"/register"} className="text-orange-500 font-medium">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;