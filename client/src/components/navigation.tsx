import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Hammer, Phone, Star } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-warm sticky top-0 z-40 border-b-2 border-construction-yellow/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-warm rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                <Hammer className="text-white" size={20} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-construction-yellow rounded-full flex items-center justify-center">
                <Star className="text-warm-brown" size={10} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-warm-brown">Nelson Oczust</h1>
              <p className="text-xs text-gray-500 font-medium">Marido de Aluguel</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Contato
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Phone Button */}
            <a 
              href="tel:+5541999023899" 
              className="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all duration-300 hidden sm:flex items-center justify-center hover:scale-105 shadow-warm"
              title="Ligar para Nelson"
            >
              <Phone size={18} />
            </a>
            
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/5541999023899?text=Olá Nelson! Encontrei seu site e gostaria de solicitar um orçamento." 
              className="bg-whatsapp hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-all duration-300 hidden sm:flex items-center font-semibold hover:scale-105 shadow-warm group"
            >
              <i className="fab fa-whatsapp mr-2 text-lg group-hover:scale-110 transition-transform"></i>
              WhatsApp
            </a>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-6 bg-gradient-to-b from-white to-gray-50/50">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-gray-700 hover:text-primary transition-all duration-300 text-left font-medium p-3 rounded-xl hover:bg-primary/5"
              >
                🔧 Serviços
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-primary transition-all duration-300 text-left font-medium p-3 rounded-xl hover:bg-primary/5"
              >
                👨‍🔧 Sobre Nelson
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-gray-700 hover:text-primary transition-all duration-300 text-left font-medium p-3 rounded-xl hover:bg-primary/5"
              >
                ⭐ Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-primary transition-all duration-300 text-left font-medium p-3 rounded-xl hover:bg-primary/5"
              >
                ❓ FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-primary transition-all duration-300 text-left font-medium p-3 rounded-xl hover:bg-primary/5"
              >
                📞 Contato
              </button>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <a 
                  href="tel:+5541999023899" 
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl transition-all duration-300 inline-flex items-center justify-center font-semibold"
                >
                  <Phone className="mr-2" size={18} />
                  Ligar Agora
                </a>
                <a 
                  href="https://wa.me/5541999023899?text=Olá Nelson! Encontrei seu site e gostaria de solicitar um orçamento." 
                  className="bg-whatsapp hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-all duration-300 inline-flex items-center justify-center font-semibold"
                >
                  <i className="fab fa-whatsapp mr-2 text-lg"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
