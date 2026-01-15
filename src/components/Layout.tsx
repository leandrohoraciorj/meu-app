import React, { useState, useEffect } from "react";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "./made-with-dyad";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex min-h-screen bg-background">
        {/* Mobile Layout with Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="fixed top-4 left-4 z-50 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <SidebarNav />
              </div>
              <MadeWithDyad />
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar shadow-lg flex flex-col flex-shrink-0 fixed h-screen">
        <div className="flex-grow">
          <SidebarNav />
        </div>
        <MadeWithDyad />
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 ml-64">
        {children}
      </main>
    </div>
  );
}