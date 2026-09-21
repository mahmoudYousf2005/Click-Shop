import { Truck, ShieldCheck, Headphones, Award } from "lucide-react";
import Image from "next/image";
import img from "../imgs/hero.jpeg"
const AboutPage = () => {

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between mb-10">
        <div>
          <h2 className="text-sm font-semibold text-orange-400">ABOUT US</h2>
          <h1 className="font-bold text-2xl">Who We Are</h1>
        </div>
        <p className="text-sm text-gray-500">Home &gt; About</p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            The <span className="text-orange-500">Click Shop</span> Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We started Click Shop with a simple vision: to make online shopping
            easy and reliable for every customer. Since then, we&apos;ve been working
            to offer genuine products at the best prices, with customer service
            that truly cares about you.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you&apos;re looking for the latest electronics, personal care
            products, or furniture for your home, we&apos;re here to deliver them
            to you quickly and easily.
          </p>
        </div>
        <div className=" relative bg-amber-100 rounded-lg h-64 lg:h-80 flex items-center justify-center text-gray-400">
          <Image src={img}
          fill
          />
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4">
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Truck className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Fast Shipping</h3>
          <p className="text-sm text-gray-500">Delivery to every governorate</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <ShieldCheck className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Genuine Products</h3>
          <p className="text-sm text-gray-500">100% quality guaranteed</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Headphones className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Ongoing Support</h3>
          <p className="text-sm text-gray-500">24/7 customer service</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Award className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Best Prices</h3>
          <p className="text-sm text-gray-500">Value that&apos;s worth every penny</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-amber-50 rounded-lg py-10 px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div>
          <p className="text-3xl font-bold text-orange-500">194+</p>
          <p className="text-gray-600 text-sm mt-1">Products</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">5K+</p>
          <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">4.8</p>
          <p className="text-gray-600 text-sm mt-1">Customer Rating</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">24/7</p>
          <p className="text-gray-600 text-sm mt-1">Technical Support</p>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;