import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Navbar } from "@/components/layout/Navbar";
import { CartProvider } from "@/context/Cart";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Zara Mobile — Catálogo de móviles",
  description: "Catálogo de smartphones — Zara Web Challenge",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
