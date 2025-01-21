"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background">
        <Sidebar />
      </div>
      <Header />
      <main className="md:pl-60 pt-16">
        <div className="px-4 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 