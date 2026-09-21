
"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/toast"

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
     // (external system سنكرونة، نفس منطق ContextCart.jsx)
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);

  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
      toast.add({
        title: "Product removing from wishlist",
      })
        return prev.filter((item) => item.id !== product.id);
      }
       toast.add({
        title: "Product added to wishlist",
      })
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist لازم يتستخدم جوه WishlistProvider");
  }
  return context;
};