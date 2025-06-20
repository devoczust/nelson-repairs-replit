import { Button } from "@/components/ui/button";
import { Hammer, Shield, Clock, Home, Users, Star } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-cream via-orange-accent/30 to-light-brown">
      {/* Padrão decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="lines" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#A0522D" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo Principal */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-construction-yellow px-4 py-2 rounded-full text-warm-brown font-semibold text-sm mb-4 animate-bounce-soft shadow">
                <Hammer size={16} />
                Profissional Qualificado
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-warm-brown drop-shadow">
              Pequenos Reparos e
              <span className="text-construction-yellow block drop-shadow"> Manutenção</span>
              <span className="text-warm-brown"> Residencial</span>
            </h1>
            
            <p className="text-xl mb-8 text-warm-brown/80 leading-relaxed">
              Mais de 35 anos transformando lares em Curitiba com serviços de qualidade. 
              Cuidamos da sua casa com carinho e profissionalismo!
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-warm-brown">
                <div className="bg-green-500/30 p-2 rounded-full shadow">
                  <Shield size={16} />
                </div>
                <span className="font-medium">Trabalho Garantido</span>
              </div>
              <div className="flex items-center gap-3 text-warm-brown">
                <div className="bg-blue-500/30 p-2 rounded-full shadow">
                  <Clock size={16} />
                </div>
                <span className="font-medium">Atendimento Rápido</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5541999023899?text=Olá! Gostaria de solicitar um orçamento para manutenção residencial." 
                className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-warm hover:shadow-xl hover:scale-105 group"
              >
                <SiWhatsapp className="mr-3 text-xl group-hover:scale-110 transition-transform" />
                Solicitar Orçamento Grátis
              </a>
              <Button
                onClick={scrollToServices}
                variant="outline"
                size="lg"
                className="h-auto border-2 border-warm-brown text-warm-brown bg-white hover:bg-warm-brown hover:text-white px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-construction"
              >
                Ver Nossos Serviços
              </Button>
            </div>
          </div>

          {/* Imagem e Stats */}
          <div className="relative animate-slide-up flex flex-col items-center">
            <div className="relative w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1645651964715-d200ce0939cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Profissional experiente trabalhando em manutenção residencial" 
                className="rounded-2xl shadow-warm w-full h-auto card-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            {/* Cards de Estatísticas */}
            <div className="flex gap-4 mt-[-2.5rem] z-10">
              <div className="bg-white/95 p-6 rounded-2xl shadow-warm border-2 border-primary/10 flex flex-col items-center min-w-[120px]">
                <Home size={28} className="mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-warm-brown font-semibold text-xs text-center">Casas<br />Atendidas</div>
              </div>
              <div className="bg-white/95 p-6 rounded-2xl shadow-warm border-2 border-primary/10 flex flex-col items-center min-w-[120px]">
                <Users size={28} className="mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-warm-brown font-semibold text-xs text-center">Satisfação<br />Garantida</div>
              </div>
              <div className="hidden md:flex bg-white/95 p-6 rounded-2xl shadow-warm border-2 border-primary/10 flex-col items-center min-w-[120px]">
                <Star size={28} className="mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">35+</div>
                <div className="text-warm-brown font-semibold text-xs text-center">Anos de<br />Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
