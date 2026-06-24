import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UploadSidebar } from "@/components/UploadSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans">
      <Navbar />
      <div className="flex flex-1">
        <UploadSidebar />
        {/* Main content pushed right by sidebar width on desktop */}
        <main className="flex-1 min-w-0 md:ml-72">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
