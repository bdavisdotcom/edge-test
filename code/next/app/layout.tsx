"use client"

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { TopNav } from "@/components/top-nav";
import { LeftNav } from "@/components/left-nav";
import { UserContextProvider } from "@/components/user-context";
import { OverlaysProvider } from "@/components/overlays/overlays-provider";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <html lang="en">
            <head>
                <title>Task Example App</title>
            </head>
            <body className="flex flex-col h-screen overflow-hidden">
                <UserContextProvider>
                    <header className="bg-indigo-800">
                        <TopNav />
                    </header>
                    <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
                        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4 pr-0">
                            <LeftNav />
                        </div>
                        <main role="main" className="w-full h-full flex-grow p-4 overflow-auto">
                            <div className="rounded-xl bg-gray-100">
                                <OverlaysProvider>
                                    {children}
                                </OverlaysProvider>                                
                            </div>                        
                        </main>
                    </div>
                </UserContextProvider>
            </body>
        </html>
    );
  }