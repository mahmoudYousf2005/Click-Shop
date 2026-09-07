
"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../register/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // 🟢 تحميل الكارت من الداتابيز
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
  // 🟢 إضافة منتج
  const addToCart = async (product) => {
    if (!user) {
      alert("لازم تسجل دخول");
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
    }

    fetchCart();
  };


const removeFromCart = async (id) => {
  // تحديث فوري في الواجهة (Optimistic Update)
  const prevCart = cart;
  setCart((prev) => prev.filter((item) => item.id !== id));

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
    // معدش حصل حذف فعلي (غالبًا مشكلة RLS Policy)
    console.warn("لم يتم حذف أي صف - تحقق من RLS policy على جدول cart");
    setCart(prevCart);
    return;
  }
 
  // مفيش داعي لـ fetchCart() هنا لأن الـ state اتحدّث بالفعل
};

  // 🟢 تحديث الكمية
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", id);

    fetchCart();
  };

  // 🟢 إجمالي السعر (مؤقت)
  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * item.quantity;
  }, 0);

  // 🟢 عدد المنتجات
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🔥 Hook جاهزة
export const useCart = () => {
  return useContext(CartContext);
};