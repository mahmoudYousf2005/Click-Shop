"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RetryLoader() {
  const router = useRouter();

  useEffect(() => {
    const retry = () => router.refresh();

    window.addEventListener("online", retry); // أول ما النت يرجع
    const id = setInterval(retry, 5000); // ويحاول كل 5 ثواني

    return () => {
      window.removeEventListener("online", retry);
      clearInterval(id);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      <p className="text-gray-500">جاري التحميل...</p>
    </div>
  );
}