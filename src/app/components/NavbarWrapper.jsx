"use client"
import Navbar from "./Navbar"
import { usePathname } from "next/navigation"
const NavbarWrapper = () => {
    const pathName = usePathname()
    if(pathName.startsWith("/dachpord"))
        return null
  return <Navbar />
    
}

export default NavbarWrapper
