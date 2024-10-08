import DropdownMenuPage from "@/components/ui/dropDownMenu";
import { Input } from "@/components/ui/input";
import MobileSidebar from "@/components/ui/mobileSideBar";
import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      {/* <MobileSidebar /> */}
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>
      <DropdownMenuPage />
    </header>
  );
};

export default Header;
