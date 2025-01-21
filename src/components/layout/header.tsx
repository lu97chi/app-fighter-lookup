"use client";

import { Bell, Search, User, Upload, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";

// Mock user data - In real app, this would come from auth context
const userData = {
  name: "John Doe",
  role: "manager", // or "fighter"
  avatar: null, // URL for user's avatar
  notifications: 3,
  messages: 2,
};

export function Header() {
  return (
    <div className="fixed top-0 right-0 left-60 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search fighters, events, news..."
              className="w-full rounded-full bg-card px-10 py-2 text-sm outline-none border focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mr-4">
          {userData.role === "fighter" && (
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Media</span>
            </button>
          )}
          {userData.role === "manager" && (
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Schedule Meeting</span>
            </button>
          )}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <Link 
            href="/messages" 
            className="relative hover:bg-accent rounded-full p-2 transition-all duration-300 group"
          >
            <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {userData.messages > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                {userData.messages}
              </span>
            )}
          </Link>

          <Link 
            href="/notifications" 
            className="relative hover:bg-accent rounded-full p-2 transition-all duration-300 group"
          >
            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {userData.notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                {userData.notifications}
              </span>
            )}
          </Link>
          
          <div className="h-8 w-[1px] bg-border"></div>
          
          <Link 
            href="/profile" 
            className="flex items-center gap-3 hover:bg-accent rounded-full p-2 transition-all duration-300 group"
          >
            <div className="relative h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {userData.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {userData.role} Account
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 