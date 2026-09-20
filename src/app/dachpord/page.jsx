// "use client";

import Link from "next/link";
const AdminDashboard = () => {
 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم الأدمن</h1>
      <p className="text-gray-500">أهلاً بيك، هنا هتقدر تدير المتجر بتاعك.</p>

      <Link href={"/dachpord/addProduct"}>add</Link>
    </div>
  );
};

export default AdminDashboard;