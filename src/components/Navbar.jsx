import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
  } from "@heroui/react";
  import logo from "../../public/dan-softwares.png"
  import { Search } from "lucide-react";
  
  
  export default function App() {
    return (
      <Navbar isBordered className="p-5 mt-2 mb-5 ml-0" maxWidth="full">
        <NavbarContent justify="center" className="flex justify-between">
          <NavbarBrand className="mr-4 ml-0">
            <img src={logo} alt="Logo" width={50} height={50}  className="rounded-lg mr-5 ml-5"/>
            <p className="hidden sm:block font-bold text-inherit text-3xl"><span className="text-yellow-500 font-bold">Explore</span> Movies</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3 space-x-7 ml-40  ">
            <NavbarItem>
              <Link aria-current="page" cursor="pointer" color="foreground" href="/trending" className="text-lg font-semibold hover:text-yellow-500">
                Trending
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link cursor="pointer" color="foreground" href="/rating" className="text-lg font-semibold hover:text-yellow-500">
                Rating
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link cursor="pointer" color="foreground" href="/genre" className="text-lg font-semibold hover:text-yellow-500">
                Genre
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
  
        <NavbarContent as="div" className="items-center" justify="end">
        <Input
  classNames={{
    base: "max-w-full sm:max-w-[12rem]",
    mainWrapper: "h-full",
    inputWrapper: "flex items-center h-10 px-1 bg-gray-300/20 dark:bg-gray-200 rounded-lg",
    input: "flex-1 h-full text-sm bg-transparent outline-none",
  }}
  placeholder="Type to search..."
  type="search"
/>


        </NavbarContent>
      </Navbar>
    );
  }
  