
"use client";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "./ContextCart";
import CartItem from "./CartItem";
import { supabase } from "@/lib/supabase";
import { useState , useEffect } from "react";
const Page = () => {
  
  const { cart, cartTotal } = useCart();
  
  const getProductsCart = async ()=>{
    const {error , data} = await supabase.from("cart").select("*")
    if(error){
      console.error("Error get products cart" , error.message)
      return
    }
    setProducts(data)
  }

  useEffect(()=>{
    getProductsCart()
  },[])

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-96 text-center px-4">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2">Your cart is empty </h2>
        <p className="text-gray-500 mb-6">Youy haven&apos;t added any products to your shopping cart yet</p>
        <Link href="/products">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-md font-medium">
             SHOP NOW
          </button>
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shipping;

  return (
    <div className="container mx-auto px-4">
      <div className="bg-amber-50 py-4 px-10 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-orange-400">YOUR CART</h2>
        <h1 className="font-bold text-2xl">Shopping Cart ({cart.length})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Cart Items */}
        <div className="border border-gray-100 rounded-lg p-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Link href="/products" className="inline-flex items-center gap-2 text-orange-500 font-medium mt-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
             Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-100 rounded-lg p-6 h-fit">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
              <span>total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-bold text-lg mt-6 cursor-pointer">
             Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;