"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      // 1. نتأكد إن فيه يوزر مسجل دخول أصلاً
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/signIn");
        return;
      }

      // 2. نجيب الـ role بتاعه من جدول profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        // مش admin أو حصل خطأ في جلب البيانات
        router.push("/");
        return;
      }

      // كل حاجة تمام، اليوزر admin فعلاً
      setAuthorized(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500">جاري التحقق من الصلاحيات...</p>
      </div>
    );
  }

  if (!authorized) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم الأدمن</h1>
      <p className="text-gray-500">أهلاً بيك، هنا هتقدر تدير المتجر بتاعك.</p>

      <Link href={"dachpord/addProduct"}>add</Link>
    </div>
  );
};

export default AdminDashboard;