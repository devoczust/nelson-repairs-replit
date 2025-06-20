import { SiWhatsapp } from "react-icons/si";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="https://wa.me/5541999023899?text=Olá! Gostaria de solicitar um orçamento para serviços de manutenção." 
        className="bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Contatar via WhatsApp"
      >
        <SiWhatsapp className="text-2xl text-white" />
      </a>
    </div>
  );
}
