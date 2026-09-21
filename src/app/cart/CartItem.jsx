"use client";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "./ContextCart";
const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
 
  return (
    <div className="flex items-center gap-4  border-b border-gray-100 py-4">
      <div className=" relative w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
        <Image src={item.thumbnail}
         alt={item.title}
         fill
         className="object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 capitalize">{item.category}</p>
        <h3 className="font-semibold truncate">{item.title}</h3>
        <p className="text-orange-500 font-bold mt-1">${item.price}</p>
      </div>

      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1 ">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-orange-500 cursor-pointer">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-orange-500 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="font-bold w-16 text-right shrink-0">
        ${(item.price * item.quantity).toFixed(2)}
      </p>

      <button onClick={()=> removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 shrink-0 cursor-pointer">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;