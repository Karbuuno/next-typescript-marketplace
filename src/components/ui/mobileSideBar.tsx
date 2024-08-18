import {
  Home,
  LineChart,
  LucideIcon,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import routes from "@/app/dashboard/admin/_components/SidebarRoutes";
// import routes from "";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <nav className='grid gap-2 text-lg font-medium'>
          <Link
            href='#'
            className='flex items-center gap-2 text-lg font-semibold'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          {routes.map(route => (
            <Link
              href={`/dashboard/admin/${route.href}`}
              // onClick={() => router.push(`/dashboard/admin/${route.href}`)}
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              key={route.id}
            >
              <route.icon className='h-5 w-5' />
              {route.label}
            </Link>
          ))}
        </nav>
        <div className='mt-auto'>
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size='sm' className='w-full'>
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
