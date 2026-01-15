import React from "react";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar shadow-lg flex flex-col flex-shrink-0">
        <div className="flex-grow">
          <SidebarNav />
        </div>
        <MadeWithDyad />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}