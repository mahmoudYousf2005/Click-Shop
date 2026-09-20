"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const DachpordLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/signIn");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        router.push("/");
        return;
      }

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

  return children;
};

export default DachpordLayout;