import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { CartProvider } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsappFab />
      <CartDrawer />
    </CartProvider>
  );
}
