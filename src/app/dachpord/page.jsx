// "use client";

import Link from "next/link";
const AdminDashboard = () => {
 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dachboard</h1>

      <Link className=" px-3 py-2 bg-green-500" href={"/dachpord/addProduct"}>ADD PRODUCT</Link>
    </div>
  );
};

export default AdminDashboard;