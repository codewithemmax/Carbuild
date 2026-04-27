import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Find, book, or rent a car — quickly and easily!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <FavoritesProvider>
          <CompareProvider>
            <NavBar />
            {children}
            <CompareBar />
            <Footer />
          </CompareProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
