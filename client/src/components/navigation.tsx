import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wrench } from "lucide-react";

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
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Wrench className="text-primary text-2xl mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Nelson Oczust</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contato
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/5541999999999" 
              className="bg-whatsapp hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors hidden sm:flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>WhatsApp
            </a>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Contato
              </button>
              <a 
                href="https://wa.me/5541999999999" 
                className="bg-whatsapp hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center sm:hidden"
              >
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
