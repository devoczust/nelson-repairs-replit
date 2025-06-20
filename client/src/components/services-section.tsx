import { Card, CardContent } from "@/components/ui/card";
import { Zap, Wrench, Package, PaintBucket, Hammer, Tv, CheckCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const services = [
  {
    icon: Zap,
    title: "Serviços Elétricos",
    description: "Instalação de tomadas, interruptores, luminárias, ventiladores de teto e pequenos reparos elétricos.",
    color: "bg-yellow-500",
    items: [
      "Troca de tomadas e interruptores",
      "Instalação de luminárias",
      "Ventiladores de teto"
    ]
  },
  {
    icon: Wrench,
    title: "Serviços Hidráulicos",
    description: "Conserto de vazamentos, desentupimento, troca de torneiras e pequenos reparos hidráulicos.",
    color: "bg-blue-500",
    items: [
      "Conserto de vazamentos",
      "Troca de torneiras",
      "Desentupimento"
    ]
  },
  {
    icon: Package,
    title: "Montagem de Móveis",
    description: "Montagem e desmontagem de móveis, estantes, racks, camas e móveis planejados.",
    color: "bg-amber-700",
    items: [
      "Móveis planejados",
      "Estantes e racks",
      "Camas e guarda-roupas"
    ]
  },
  {
    icon: PaintBucket,
    title: "Pintura e Acabamentos",
    description: "Pintura de paredes, retoques, aplicação de texturas e pequenos acabamentos.",
    color: "bg-purple-500",
    items: [
      "Pintura de paredes",
      "Retoques e acabamentos",
      "Aplicação de texturas"
    ]
  },
  {
    icon: Hammer,
    title: "Pequenos Reparos",
    description: "Conserto de portas, janelas, fechaduras, dobradiças e diversos reparos domésticos.",
    color: "bg-red-500",
    items: [
      "Conserto de portas e janelas",
      "Troca de fechaduras",
      "Reparos diversos"
    ]
  },
  {
    icon: Tv,
    title: "Instalações Gerais",
    description: "Instalação de TVs na parede, suportes, prateleiras, espelhos e objetos decorativos.",
    color: "bg-green-500",
    items: [
      "Instalação de TVs",
      "Suportes e prateleiras",
      "Espelhos e quadros"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-gradient-construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm mb-6">
            <Hammer size={16} />
            Serviços Especializados
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Cuidamos de todos os detalhes da sua casa com experiência profissional 
            e ferramentas adequadas para cada tipo de serviço
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-white card-hover shadow-construction border-0 group animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <service.icon size={80} className="text-gray-400" />
                </div>
                
                <div className={`${service.color} p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-warm-brown mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-warm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-warm-brown mb-4">
              Pronto para começar seu projeto?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato agora e receba um orçamento personalizado para suas necessidades
            </p>
            <a 
              href="https://wa.me/5541999023899?text=Olá! Gostaria de solicitar um orçamento para serviços residenciais." 
              className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-warm hover:shadow-xl hover:scale-105 group"
            >
              <SiWhatsapp className="mr-3 text-xl group-hover:scale-110 transition-transform" />
              Solicitar Orçamento Gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
