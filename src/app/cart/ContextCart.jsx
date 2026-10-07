"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../register/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const router = useRouter()

  //  تحميل الكارت من الداتابيز
  const fetchCart = useCallback(async () => {
  if (!user) return;

  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("error Fetch data ", error.message);
    return;
  }
  setCart(data);
}, [user]);

 useEffect(() => {
  // نمط "هات البيانات لما user يتغيّر" ده معتمد رسميًا من توثيق React
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchCart();
}, [fetchCart]);
  //  إضافة منتج
  const addToCart = async (product) => {
    if (!user) {
    toast.add({
      title: "Please log in to continue",
      // description: "Sunday, December 3 at 9:00 AM",  
    })
      router.push("/register")
      return;
    }


    const existing = cart.find(
      (item) => item.product_id === product.id
    );

    if (existing) {
      await supabase
        .from("cart")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);
        toast.add({
        title: "Quantity increased",
        // description: "Sunday, December 3 at 9:00 AM",  
    })
    } else {
      await supabase.from("cart").insert([
        {
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
          category: product.category,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },

      ]);
      toast.add({
      title: "Product added to cart",
      // description: "Sunday, December 3 at 9:00 AM",  
    })
    }

    fetchCart();
  };

  
    const checkout = async()=>{
      if(!user){
        toast.add({
          title:"Please Log in to continue"
        })
          router.push("/")
          return
      }

      if(cart.length === 0){
        toast.add({
          title:"Your cart is empty"   
        })
        return
      }

   const { data: order, error: orderError } = await supabase.from("orders")
  .insert([{ user_id: user.id, total: cartTotal, status: "pending" ,shipping_address:"KLlk"  }])
  .select()
  .single()

if (orderError) {
  console.error("Error creating order:", orderError.message)
  return
}

    const itemToInsert = cart.map((item)=>({
      order_id: order.id,
      product_id: item.product_id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
    }))

    const {error: itemsError} = await supabase.from("orderItems").insert(itemToInsert)
    if(itemsError){
      console.error("Error creating order items:", itemsError.message)
      return
    }

    const {error:clearError} = await supabase.from("cart").delete().eq("user_id" , user.id)
    if(clearError){
      console.error("Error clearing cart:", clearError.message);
    }

  setCart([])
  toast.add({ title: "Order placed successfully" });
  return order
  }

  const buyNow = async (product, quantity = 1) => {
  if (!user) {
    toast.add({ title: "Please log in to continue" });
    router.push("/register");
    return;
  }

  const total = product.price * quantity;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([{ user_id: user.id, total, status: "pending" }])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError.message);
    return;
  }

  const { error: itemError } = await supabase.from("orderItems").insert([
    {
      order_id: order.id,
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      category: product.category,
      thumbnail: product.thumbnail,
    },
  ]);

  if (itemError) {
    console.error("Error creating order item:", itemError.message);
    return;
  }

  toast.add({ title: "Order placed successfully" });
  return order;
};


const removeFromCart = async (id) => {
  // تحديث فوري في الواجهة (Optimistic Update)
  const prevCart = cart;
  setCart((prev) => prev.filter((item) => item.id !== id));
   toast.add({
      title: "Product removed cart",
    })
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("id", id)
    .select(); // مهم علشان تعرف فعليًا اتحذف صف ولا لأ

  if (error) {
    console.error("Error deleting:", error.message);
    setCart(prevCart); // رجّع الحالة القديمة لو فشل
    return;
  }

  if (!data || data.length === 0) {
    console.warn("لم يتم حذف أي صف - تحقق من RLS policy على جدول cart");
    
    setCart(prevCart);
    return;
  }
 
};

  //  تحديث الكمية
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", id);

    fetchCart();
  };

  // إجمالي السعر
  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * item.quantity;
  }, 0);

  //  عدد المنتجات
  const cartCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        checkout,
        buyNow
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//  Hook جاهزة
export const useCart = () => {
  return useContext(CartContext);
};


