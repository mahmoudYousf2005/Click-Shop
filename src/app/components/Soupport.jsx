import { LuTruck } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import { FaAward } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
const Soupport = () => {

    const data = [
        {
            id: 1,
            title: "Free Shipping ",
            discreption:"On all order over $50",
            icon: <LuTruck />,
        },
        {
            id: 2,
            title: "Secure Payment ",
            discreption:"100% secure payment",
            icon:<GoShieldCheck /> ,
        },
        {
            id: 3,
            title: "Best Quality ",
            discreption:"Satsifaction guaranteed",
            icon: <FaAward />,
        },
        {
            id: 4,
            title: "24/7 Support",
            discreption:"Dedicated support",
            icon: <BiSupport /> ,
        },
    ]





  return (
    <div className="container mx-auto my-8  grid items-center justify-center grid-cols-2 md:grid-cols-4">

        {data.map((item)=>(
            <div key={item.id} className="flex items-center justify-center gap-4">
                <h2 className=" text-2xl border border-gray-400 p-2 rounded-full ">{item.icon}</h2>
                <div className="">
                    <h2>{item.title}</h2>
                    <h3>{item.discreption}</h3>
                </div>
            </div>
        ))}

    </div>
  )
}

export default Soupport
