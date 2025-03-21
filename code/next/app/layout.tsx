import type { Metadata } from "next";

import "./globals.css";

import { TopNav } from "@/components/top-nav";
import { LeftNav } from "@/components/left-nav";

export const metadata: Metadata = {
  title: "Test Application",
  description: "Demo Test Application",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <html lang="en">
            <body className="flex flex-col h-screen overflow-hidden">
                <header className="bg-indigo-800">
                    <TopNav />
                </header>
                <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
                    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4 pr-0">
                        <LeftNav />
                    </div>
                    <main role="main" className="w-full h-full flex-grow p-4 overflow-auto">
                        <div className="rounded-xl bg-gray-100">
                            {children}
                        </div>                        
                    </main>
                </div>
            </body>
        </html>
    );
  }