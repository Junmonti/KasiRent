import { Link, useLocation } from "wouter";
import { Home, Search, Heart, User, MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusCircle, label: "List", path: "/landlord/new", highlight: true },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/login" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link key={item.label} href={item.path}>
            <div
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer",
                location === item.path
                  ? "text-primary font-medium"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-6 h-6",
                  item.highlight && "text-primary fill-current/10"
                )}
              />
              <span className="text-[10px]">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
