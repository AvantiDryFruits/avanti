import { MessageCircle } from "lucide-react";
import { SITE_NAME, WHATSAPP_NUMBER } from "@/lib/constants";

export function WhatsappFab() {
  const message = encodeURIComponent(`Hi ${SITE_NAME}! I'd like to know more about your products.`);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  );
}
