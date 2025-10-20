import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/254796341760?text=Hello%20Dryne%2C%20I%27d%20like%20tutoring%20assistance"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Contact me on WhatsApp"
    >
      <div className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-elegant flex items-center justify-center transition-transform hover:scale-105">
        <MessageCircle className="w-7 h-7" />
      </div>
    </a>
  );
};
