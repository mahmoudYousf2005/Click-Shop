import ProductsList from "./ProductsList";



const page = ({searchParams}) => {
  return (
    <div className="">

       <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between">         <div className="">
          <h2 className="text-sm font-semibold text-orange-400">SHOP NOW</h2>
          <h1 className="font-bold text-2xl">All Products</h1>
        </div>
         <p className="text-sm text-gray-500">Home &gt; Products</p>
        
      </div>
      <ProductsList searchParams={searchParams}/>
    </div>
  );
};

export default page;