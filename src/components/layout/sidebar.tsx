"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Users2,
  MessageSquare,
  Bell,
  Settings,
  Building2,
  DollarSign,
  Trophy,
  History,
  Newspaper,
  Home,
  CalendarDays,
  FileText,
  BarChart3,
  Image as ImageIcon,
  User,
  UserCog,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";

// Navigation sections based on role
const managerRoutes = [
  {
    label: "Overview",
    icon: Home,
    href: "/",
  },
  {
    label: "Manage Fighters",
    icon: Users2,
    href: "/manage-fighters",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    href: "/calendar",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    label: "Contracts",
    icon: FileText,
    href: "/contracts",
  },
  {
    label: "Financial",
    icon: DollarSign,
    href: "/financial",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    label: "Organizations",
    icon: Building2,
    href: "/organizations",
  },
];

const fighterRoutes = [
  {
    label: "Overview",
    icon: Home,
    href: "/",
  },
  {
    label: "Profile",
    icon: UserCog,
    href: "/profile",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    href: "/calendar",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    label: "Media",
    icon: ImageIcon,
    href: "/media",
  },
  {
    label: "Rankings",
    icon: Trophy,
    href: "/rankings",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
  },
  {
    label: "News",
    icon: Newspaper,
    href: "/news",
  },
];

// Common routes for both roles
const commonRoutes = [
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useStore();

  const routes = role === "manager" ? managerRoutes : fighterRoutes;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background text-foreground">
      <div className="px-3 py-2">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold">
            Fighter<span className="text-primary">Lookup</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}

          <Separator className="my-4" />

          {commonRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        {/* Role Badge */}
        <div className="p-3">
          <div
            className={cn(
              "p-2 w-full rounded-lg flex items-center gap-x-2",
              "bg-primary/10"
            )}
          >
            <div
              className={cn(
                "p-1 rounded-lg",
                "text-primary"
              )}
            >
              <User className="h-4 w-4" />
            </div>
            <div className="text-sm font-medium">
              {role} Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 