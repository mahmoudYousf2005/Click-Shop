"use client";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useState , useEffect} from "react";
import {useWishlist }from "../wishlist/WishlistContext"
import { useCart } from "../cart/ContextCart";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import { useAuth  ,  loading } from "../register/AuthContext";
const Navbar = () => {
    const { wishlist } = useWishlist();
    const { cart } = useCart();
    const { user  , loading} = useAuth();
     const router = useRouter()

    const [open , setOpen] = useState(false)
    const [scrolled , setScrolled] = useState(false)
    // const [loading, setLoading] = useState(true);
    // Scroll Navbar
    useEffect(()=>{
        const handleScroll = ()=>{
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll" , handleScroll)
        return ()=> {
            window.removeEventListener("scroll" , handleScroll)
        }
    },[])

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()
    if(error){
        console.error("Error signOut" , error.message)
        return
    }
  };
   
  return (
    <div className={ `sticky z-40 top-0  mx-auto flex items-center justify-between py-4 container px-10 
        ${scrolled ? "bg-white dark:bg-gray-800  border-2 border-gray-300 dark:border-gray-600" : "bg-transparent"}
    `} >
        {/* logo */}
        <div className="text-lg font-semibold">
            <h2>Click <span className="text-orange-400">Shop</span></h2>
        </div>
        {/*== logo ==*/}


        {/* Links */}
        <div className="hidden xl:flex items-center gap-10 text-lg font-semibold  ">
            <Link href={"/"} >Home</Link>
            <Link href={"/products"} >Products</Link>
            <Link href={"/categories"} >Categories</Link>
            <Link href={"/about"} >About</Link>
            <Link href={"/contact"} >Contact</Link>
        </div>
        {/*== Links ==*/}


        {/* Search */}
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center mr-6 relative ">
                <input className="py-1.5 px-2 border border-gray-300 rounded-lg outline-none text-l bg-gray-50" type="text" placeholder="Search"/>
                <IoSearch  className=" absolute right-2 text-gray-500"/>
            </div>
            <div className="flex items-center gap-4 text-2xl">
               <Link href={"/wishlist"} className=" relative cursor-pointer">
                    <CiHeart />
                    <span className=" absolute top-0  -right-2 text-sm">{wishlist.length}</span>
                </Link>
                <Link href={"/cart"} className=" relative cursor-pointer">
                    <TiShoppingCart />
                    <span className=" absolute top-0  -right-2 text-sm">{cart.length}</span>
                </Link>
               
                {loading ? null : user ? (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-base font-semibold">
                    <span>{user.user_metadata?.name || user.email}</span>
                    </div>
                    <button onClick={handleLogout} title="تسجيل الخروج" className="text-lg cursor-pointer">
                    <LogOut className="w-5 h-5 text-gray-500 hover:text-red-500" />
                    </button>
                </div>
                ) : (
                <Link href={"/register"} className="cursor-pointer">
                    <CiUser />
                </Link>
                )}

                 <button className="md:hidden" 
                onClick={()=> setOpen(!open)}
                >
                    {open ? <IoClose /> : <CiMenuBurger />}
                </button>

            </div>

        </div>
        {/*== Search ==*/}

           



         {/* Links */}
        {open && <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center text-white
         gap-4 py-6 hg:hidden border-t border-gray-800 z-50">
            <Link href={"/"} >Home</Link>
            <Link href={"/products"} >Products</Link>
            <Link href={"/categories"} >Categories</Link>
            <Link href={"/about"} >About</Link>
            <Link href={"/contact"} >Contact</Link>
            <div className="flex items-center  relative ">
                <input className="py-1.5 px-2 border rounded-lg  outline-none text-l bg-gray-700" type="text" placeholder="Search"/>
                <IoSearch  className=" absolute right-2"/>
            </div>
        </div>}
        {/*== Links ==*/}
    </div>
  )
}

export default Navbar
