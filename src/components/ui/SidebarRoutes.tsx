import { Package, Package2, ShoppingCartIcon, User2Icon } from "lucide-react";
const routes = [
  {
    id: 1,
    icon: Package,
    label: "Products",
    href: "/products",
  },
  {
    id: 2,
    icon: Package2,
    label: "Category",
    href: "/category",
  },
  {
    id: 3,
    icon: Package2,
    label: "Subcategory",
    href: "/subcategory",
  },
  {
    id: 4,
    icon: User2Icon,
    label: "Users",
    href: "/users",
  },
  {
    id: 5,
    icon: ShoppingCartIcon,
    label: "Orders",
    href: "/orders",
  },
];
export default routes;
