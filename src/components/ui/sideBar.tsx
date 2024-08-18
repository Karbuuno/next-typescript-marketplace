"use client";
import { Bell, LucideIcon, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import routes from "@/app/dashboard/admin/_components/SidebarRoutes";
const SideBar = () => {
  // pathname
  const pathName = usePathname();
  const isActive = pathName;

  //router from  next navigation
  const router = useRouter();
  return (
    <aside className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>Acme Inc</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            {routes.map(route => {
              const isActive = pathName.includes(route.href);
              return (
                <Link
                  href={`/dashboard/admin/${route.href}`}
                  // onClick={() => router.push(`/dashboard/admin/${route.href}`)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground text-xl transition-all hover:text-blue-300 hover:bg-gray-100",
                    isActive && "bg-blue-100"
                  )}
                  key={route.id}
                >
                  <route.icon className='h-5 w-5' />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
