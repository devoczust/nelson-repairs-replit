import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { Hammer, Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <FloatingWhatsApp />
      
      {/* Footer */}
      <footer className="bg-warm-brown text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-construction-yellow rounded-lg flex items-center justify-center mr-3">
                  <Hammer className="text-warm-brown" size={20} />
                </div>
                <h3 className="text-xl font-bold">Nelson Oczust</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Pequenas reformas e marido de aluguel em Curitiba. 
                Mais de 35 anos de experiência em serviços residenciais.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/5541999023899" 
                  className="bg-whatsapp hover:bg-green-600 text-white p-3 rounded-lg transition-colors inline-flex items-center"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Serviços Elétricos</li>
                <li>Serviços Hidráulicos</li>
                <li>Montagem de Móveis</li>
                <li>Pintura e Acabamentos</li>
                <li>Pequenos Reparos</li>
                <li>Instalações Gerais</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-whatsapp rounded mr-3 flex items-center justify-center">
                    <i className="fab fa-whatsapp text-white text-xs"></i>
                  </div>
                  <a href="https://wa.me/5541999023899" className="hover:text-white transition-colors">
                    (41) 99902-3899
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-primary rounded mr-3 flex items-center justify-center">
                    <Mail className="text-white" size={12} />
                  </div>
                  <a href="mailto:nelsonoczust1975@gmail.com" className="hover:text-white transition-colors">
                    nelsonoczust1975@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-construction-yellow rounded mr-3 flex items-center justify-center">
                    <MapPin className="text-warm-brown" size={12} />
                  </div>
                  <span>Curitiba e Região</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-warm-brown/30 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Nelson Oczust - Pequenas Reformas e Marido de Aluguel. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Marido de aluguel Curitiba | Pequenas reformas Curitiba | Serviços de manutenção residencial Curitiba</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
