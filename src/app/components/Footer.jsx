import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Click <span className="text-orange-500">Shop</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              وجهتك الأولى للتسوق الإلكتروني — منتجات أصلية بأفضل الأسعار وتوصيل سريع.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-orange-500"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-500"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-500"><FaTwitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-500">Products</Link></li>
              <li><Link href="/categories" className="hover:text-orange-500">Categories</Link></li>
              <li><Link href="/about" className="hover:text-orange-500">About</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-3">خدمة العملاء</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-orange-500">الأسئلة الشائعة</Link></li>
              <li><Link href="/shipping" className="hover:text-orange-500">الشحن والتوصيل</Link></li>
              <li><Link href="/returns" className="hover:text-orange-500">سياسة الاسترجاع</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-500">سياسة الخصوصية</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                +20 100 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                support@clickshop.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                القاهرة، مصر
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Click Shop. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;