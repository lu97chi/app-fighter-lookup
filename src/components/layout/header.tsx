"use client";

import { Bell, User, UserCog } from "lucide-react";
import Link from "next/link";
import { ScheduleMeetingDialog } from "@/components/schedule-meeting-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const { name, role, unreadNotifications, setRole } = useStore();

  const toggleRole = () => {
    setRole(role === "manager" ? "fighter" : "manager");
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          {role === "manager" && <ScheduleMeetingDialog />}
          
          {/* Role Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleRole}
            className={cn(
              "gap-2 transition-colors",
              role === "manager" ? "text-primary" : "text-orange-600"
            )}
          >
            <UserCog className="h-4 w-4" />
            {role === "manager" ? "Manager Mode" : "Fighter Mode"}
          </Button>
          
          {/* Notifications */}
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {role} account
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleRole}>
                Switch to {role === "manager" ? "Fighter" : "Manager"} Mode
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
} 