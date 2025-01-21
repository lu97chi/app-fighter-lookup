"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Trophy,
  History,
  Upload,
  Newspaper,
  Building2,
  DollarSign,
  UserCog,
  Briefcase,
  LineChart,
  Users2,
  Code,
  Shield
} from "lucide-react";

// Mock user role - In real app, this would come from auth context
const userRole = "dev"; // "manager", "fighter", or "dev"

const fighterRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "My Profile",
    icon: UserCog,
    href: "/profile",
    color: "text-violet-500",
  },
  {
    label: "Upload Media",
    icon: Upload,
    href: "/media",
    color: "text-pink-700",
    badge: "New"
  },
  {
    label: "Fight History",
    icon: History,
    href: "/history",
    color: "text-orange-700",
  },
  {
    label: "Rankings",
    icon: Trophy,
    href: "/rankings",
    color: "text-emerald-500",
  },
  {
    label: "News & Updates",
    icon: Newspaper,
    href: "/news",
    color: "text-blue-600",
  },
  {
    label: "Organizations",
    icon: Building2,
    href: "/organizations",
    color: "text-yellow-600",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
    color: "text-indigo-500",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-red-600",
  }
];

const managerRoutes = [
  ...fighterRoutes,
  {
    label: "Manage Fighters",
    icon: Users2,
    href: "/manage-fighters",
    color: "text-purple-600",
    badge: "Premium"
  },
  {
    label: "Contracts",
    icon: Briefcase,
    href: "/contracts",
    color: "text-green-600",
    badge: "Premium"
  },
  {
    label: "Analytics",
    icon: LineChart,
    href: "/analytics",
    color: "text-cyan-600",
    badge: "Premium"
  },
  {
    label: "Financial",
    icon: DollarSign,
    href: "/financial",
    color: "text-amber-600",
    badge: "Premium"
  },
];

const devRoutes = [
  ...managerRoutes,
  {
    label: "Dev Tools",
    icon: Code,
    href: "/dev-tools",
    color: "text-rose-500",
    badge: "Dev Only"
  },
  {
    label: "Access Control",
    icon: Shield,
    href: "/access-control",
    color: "text-teal-500",
    badge: "Dev Only"
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const routes = userRole === "dev" 
    ? devRoutes 
    : userRole === "manager" 
    ? managerRoutes 
    : fighterRoutes;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Fighter<span className="text-primary">Portal</span>
          </h1>
        </Link>

        {/* Role Badge */}
        <div className="mx-3 mb-8">
          <div className={cn(
            "flex items-center justify-center px-4 py-2 rounded-lg",
            userRole === "dev" ? "bg-rose-500/10" : "bg-primary/10"
          )}>
            <span className={cn(
              "text-sm font-medium capitalize",
              userRole === "dev" ? "text-rose-500" : "text-primary"
            )}>
              {userRole} Account
            </span>
          </div>
        </div>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-between font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110", route.color)} />
                {route.label}
              </div>
              {route.badge && (
                <span className={cn(
                  "ml-2 text-xs px-2 py-0.5 rounded-full",
                  route.badge === "Dev Only" 
                    ? "bg-rose-500/20 text-rose-500"
                    : "bg-primary/20 text-primary"
                )}>
                  {route.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto px-3 py-2">
        <div className="space-y-1">
          <Link
            href="/notifications"
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
          >
            <div className="flex items-center flex-1">
              <Bell className="h-5 w-5 mr-3 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />
              Notifications
            </div>
          </Link>
          <Link
            href="/settings"
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
          >
            <div className="flex items-center flex-1">
              <Settings className="h-5 w-5 mr-3 text-gray-500 transition-transform duration-300 group-hover:scale-110" />
              Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 