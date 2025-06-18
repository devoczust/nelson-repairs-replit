import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import FloatingWhatsApp from "@/components/floating-whatsapp";

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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-tools text-primary text-2xl mr-3"></i>
                <h3 className="text-xl font-bold">Nelson Oczust</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Pequenas reformas e marido de aluguel em Curitiba. 
                Mais de 35 anos de experiência em serviços residenciais.
              </p>
              <div className="flex space-x-4">
                <a href="https://wa.me/5541999999999" className="text-whatsapp hover:text-green-400 transition-colors">
                  <i className="fab fa-whatsapp text-2xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
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
              <ul className="space-y-2 text-gray-400">
                <li><i className="fab fa-whatsapp mr-2"></i>(41) 99999-9999</li>
                <li><i className="fas fa-envelope mr-2"></i>nelson.oczust@email.com</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i>Curitiba e Região</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nelson Oczust - Pequenas Reformas e Marido de Aluguel. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Marido de aluguel Curitiba | Pequenas reformas Curitiba | Serviços de manutenção residencial Curitiba</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
