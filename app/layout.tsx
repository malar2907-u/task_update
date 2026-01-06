"use client"; 
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./component/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const pathname = usePathname();
    const hideNavbar = pathname === "/login" || pathname === "/signup" || pathname === "/";

  return (
    <html lang="en">
      <body
      
      >
         {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
