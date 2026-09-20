import { Truck, ShieldCheck, Headphones, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
const AboutPage = async () => {

  const {data , error} = await supabase.from("products").select("*")
  if(error){
    console.error("select data" , error.message)
  }
  

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between mb-10">
        <div>
          <h2 className="text-sm font-semibold text-orange-400">ABOUT US</h2>
          <h1 className="font-bold text-2xl">من نحن</h1>
        </div>
        <p className="text-sm text-gray-500">Home &gt; About</p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            قصة <span className="text-orange-500">Click Shop</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            بدأنا Click Shop برؤية بسيطة: نخلي التسوق الإلكتروني تجربة سهلة وموثوقة
            لكل عميل. من يومها ونحن بنشتغل على توفير منتجات أصلية بأفضل الأسعار،
            مع خدمة عملاء بتحس بيك فعلاً.
          </p>
          <p className="text-gray-600 leading-relaxed">
            سواء بتدور على أحدث الإلكترونيات، منتجات العناية، أو أثاث لبيتك،
            إحنا هنا عشان نوصلهملك بسهولة وسرعة.
          </p>
        </div>
        <div className="bg-amber-100 rounded-lg h-64 lg:h-80 flex items-center justify-center text-gray-400">
          صورة / رسمة توضيحية هنا
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4">
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Truck className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">شحن سريع</h3>
          <p className="text-sm text-gray-500">توصيل لكل المحافظات</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <ShieldCheck className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">منتجات أصلية</h3>
          <p className="text-sm text-gray-500">ضمان الجودة 100%</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Headphones className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">دعم متواصل</h3>
          <p className="text-sm text-gray-500">خدمة عملاء على مدار الساعة</p>
        </div>
        <div className="text-center border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
          <Award className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">أفضل الأسعار</h3>
          <p className="text-sm text-gray-500">قيمة تستحق كل جنيه</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-amber-50 rounded-lg py-10 px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div>
          <p className="text-3xl font-bold text-orange-500">194+</p>
          <p className="text-gray-600 text-sm mt-1">منتج</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">5K+</p>
          <p className="text-gray-600 text-sm mt-1">عميل سعيد</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">4.8</p>
          <p className="text-gray-600 text-sm mt-1">تقييم العملاء</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">24/7</p>
          <p className="text-gray-600 text-sm mt-1">دعم فني</p>
        </div>
      </div>

      {data?.map((item)=>(
        <div key={item.id} className="">
          <h1>{item.title}</h1>
          {/* <Image src={item}/> */}
        </div>
      ))}
    </div>
  );
};

export default AboutPage;