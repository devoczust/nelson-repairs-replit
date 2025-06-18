import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Nelson Oczust - Profissional experiente" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Nelson Oczust</h2>
            <p className="text-lg text-gray-600 mb-6">
              Com mais de <strong>35 anos de experiência</strong> no mercado de manutenção residencial, 
              Nelson Oczust é referência em pequenas reformas e serviços domésticos em Curitiba.
            </p>
            <p className="text-gray-600 mb-6">
              Especializado em resolver os problemas do dia a dia da sua casa com agilidade, 
              qualidade e preço justo. Cada serviço é executado com dedicação e atenção aos detalhes, 
              garantindo a satisfação total dos clientes.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <Card className="shadow-sm">
                <CardContent className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">35+</div>
                  <div className="text-gray-600">Anos de Experiência</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600">Clientes Satisfeitos</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span>Profissional experiente e confiável</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span>Orçamentos gratuitos e sem compromisso</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span>Garantia em todos os serviços</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span>Atendimento rápido e pontual</span>
              </div>
            </div>

            <a 
              href="https://wa.me/5541999999999?text=Olá Nelson! Gostaria de conhecer melhor seus serviços." 
              className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Falar com Nelson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
