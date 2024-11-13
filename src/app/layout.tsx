"use client";

import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/fragments/Navbar";
import Footer from "@/components/fragments/Footer";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./libs/context/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Path = usePathname();
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <title>BukaToko</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <CartProvider>
         {Path !== "/auth/login" && Path !== "/auth/register" && Path !== "/dashboard" && Path !== "/dashboard/products" && Path !== "/dashboard/users" ? (
          <Navbar />
        ) : null}
        {children}
        <Footer />
        <Toaster />
        </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
