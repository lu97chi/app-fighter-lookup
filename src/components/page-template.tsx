"use client";

import { Card } from "@/components/ui/card";

interface PageTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageTemplate({ title, description, children }: PageTemplateProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {children ? children : (
        <Card className="p-8">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              This section is currently under development. Check back soon for updates!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
} 