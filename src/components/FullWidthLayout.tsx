import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FullWidthLayoutProps {
  children: React.ReactNode;
}

export function FullWidthLayout({ children }: FullWidthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Dashboard
            </Link>
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}