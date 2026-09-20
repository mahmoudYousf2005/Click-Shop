import Image from "next/image";
import Link from "next/link";
import heroo from "../imgs/heroo.jpeg"
const HeroSection = () => {
  return (
    <div className="container mx-auto mt-2 w-full h-112.5 relative">
      
      
        <Image className=" rounded-xl h-full " alt="hero" src={heroo}/>
       <Link href={"/products"}>
        <button className=" absolute bottom-10 left-5 md:left-16 text-white bg-orange-400 hover:bg-orange-500 hover:transform transition
         hover:-translate-y-2  py-2 px-6 rounded-xl font-medium cursor-pointer" >
          Shop Now</button>
       </Link>

    
    </div>
  )
}

export default HeroSection

