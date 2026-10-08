
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Menu, X } from "lucide-react";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nameStore , setNameStore] = useState("Click Shop")

  useEffect(() => {
    let cancelled = false;
    const checkAdmin = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user || userError) {
        router.replace("/register");
        return;
      }
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (cancelled) return;
      if (profileError || profile?.role !== "admin") {
        router.replace("/");
        return;
      }
      setAuthorized(true);
    };
    checkAdmin();
    return () => { cancelled = true; };
  }, [router]);
// Storte name
   useEffect(()=>{
          const getNameStore = async ()=>{
              const {data , error} = await supabase.from("setting").select("*").eq("id" , 1).single()
              if(error){
                  console.error("Error get name store" , error.message)
                  return
              }
              setNameStore(data)
          }
          getNameStore()
      },[])
      // const [first, ...rest] = (nameStore?.store_name || "").split(" ");

  const linksNav = [
    { name: "Overview", href: "/dachpord", icons: LayoutDashboard },
    { name: "Products", href: "/dachpord/productsDashboard", icons: Package },
    { name: "Orders", href: "/dachpord/orders", icons: ShoppingCart },
    { name: "Customers", href: "/dachpord/customers", icons: Users },
    { name: "Settings", href: "/dachpord/settings", icons: Settings },
  ];

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500">جاري التحقق من الصلاحيات...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 shrink-0 bg-white border-r
          flex flex-col p-5 transition-transform duration-200 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                {nameStore?.store_name?.[0]}
              </div>
              <Link href={"/"} 
                className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {nameStore?.store_name}
              </Link>
              
            </div>  
            <h2 className="mt-1.5 text-gray-400 text-sm">Dashboard</h2>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col my-6">
          {linksNav.map((link) => {
            const isActive =
              pathName === link.href ||
              (link.href !== "/dachpord" && pathName.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 h-12 px-3 rounded-lg
                  ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <link.icons className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 min-w-0 bg-amber-50">
        <button
          className="md:hidden m-4 p-2 bg-white rounded-lg border"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {authorized && children}
      </div>
    </div>
  );
}