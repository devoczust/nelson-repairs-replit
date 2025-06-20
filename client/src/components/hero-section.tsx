import { Button } from "@/components/ui/button";
import { Hammer, Shield, Clock, Award } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo Principal */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-construction-yellow px-4 py-2 rounded-full text-warm-brown font-semibold text-sm mb-4 animate-bounce-soft">
                <Hammer size={16} />
                Profissional Qualificado
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Pequenos Reparos e
              <span className="text-construction-yellow block"> Manutenção</span>
              <span className="text-white"> Residencial</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Mais de 35 anos transformando lares em Curitiba com serviços de qualidade. 
              Cuidamos da sua casa com carinho e profissionalismo!
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-green-500 p-2 rounded-full">
                  <Shield size={16} />
                </div>
                <span className="font-medium">Trabalho Garantido</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Clock size={16} />
                </div>
                <span className="font-medium">Atendimento Rápido</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-orange-500 p-2 rounded-full">
                  <Award size={16} />
                </div>
                <span className="font-medium">35+ Anos Experiência</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-purple-500 p-2 rounded-full">
                  <Hammer size={16} />
                </div>
                <span className="font-medium">Ferramentas Próprias</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5541999023899?text=Olá! Gostaria de solicitar um orçamento para manutenção residencial." 
                className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-warm hover:shadow-xl hover:scale-105 group"
              >
                <i className="fab fa-whatsapp mr-3 text-xl group-hover:scale-110 transition-transform"></i>
                Solicitar Orçamento Grátis
              </a>
              <Button
                onClick={scrollToServices}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-warm-brown px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-construction"
              >
                Ver Nossos Serviços
              </Button>
            </div>
          </div>

          {/* Imagem e Stats */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Profissional experiente trabalhando em manutenção residencial" 
                className="rounded-2xl shadow-warm w-full h-auto card-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Cards de Estatísticas */}
            <div className="absolute -bottom-8 -left-6 bg-white p-6 rounded-2xl shadow-warm animate-scale-in border-2 border-primary/10">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">35+</div>
                <div className="text-warm-brown font-semibold text-sm">Anos de<br />Experiência</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-construction-yellow p-4 rounded-2xl shadow-construction animate-scale-in border-2 border-warm-brown/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-warm-brown mb-1">500+</div>
                <div className="text-warm-brown font-semibold text-xs">Casas<br />Atendidas</div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-8 bg-primary p-4 rounded-2xl shadow-warm animate-scale-in border-2 border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-white font-semibold text-xs">Satisfação<br />Garantida</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
