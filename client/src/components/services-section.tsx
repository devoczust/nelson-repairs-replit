import { Card, CardContent } from "@/components/ui/card";
import { Zap, Wrench, Sofa, PaintBucket, Hammer, Tv } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Serviços Elétricos",
    description: "Instalação de tomadas, interruptores, luminárias, ventiladores de teto e pequenos reparos elétricos.",
    items: [
      "• Troca de tomadas e interruptores",
      "• Instalação de luminárias",
      "• Ventiladores de teto"
    ]
  },
  {
    icon: Wrench,
    title: "Serviços Hidráulicos",
    description: "Conserto de vazamentos, desentupimento, troca de torneiras e pequenos reparos hidráulicos.",
    items: [
      "• Conserto de vazamentos",
      "• Troca de torneiras",
      "• Desentupimento"
    ]
  },
  {
    icon: Sofa,
    title: "Montagem de Móveis",
    description: "Montagem e desmontagem de móveis, estantes, racks, camas e móveis planejados.",
    items: [
      "• Móveis planejados",
      "• Estantes e racks",
      "• Camas e guarda-roupas"
    ]
  },
  {
    icon: PaintBucket,
    title: "Pintura e Acabamentos",
    description: "Pintura de paredes, retoques, aplicação de texturas e pequenos acabamentos.",
    items: [
      "• Pintura de paredes",
      "• Retoques e acabamentos",
      "• Aplicação de texturas"
    ]
  },
  {
    icon: Hammer,
    title: "Pequenos Reparos",
    description: "Conserto de portas, janelas, fechaduras, dobradiças e diversos reparos domésticos.",
    items: [
      "• Conserto de portas e janelas",
      "• Troca de fechaduras",
      "• Reparos diversos"
    ]
  },
  {
    icon: Tv,
    title: "Instalações Gerais",
    description: "Instalação de TVs na parede, suportes, prateleiras, espelhos e objetos decorativos.",
    items: [
      "• Instalação de TVs",
      "• Suportes e prateleiras",
      "• Espelhos e quadros"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma ampla gama de serviços de manutenção e pequenas reformas para sua casa
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow border-0">
              <CardContent className="p-8">
                <div className="bg-primary p-3 rounded-lg inline-block mb-4">
                  <service.icon className="text-white text-2xl" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://wa.me/5541999023899?text=Olá! Gostaria de saber mais sobre os serviços disponíveis." 
            className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            <i className="fab fa-whatsapp mr-2 text-lg"></i>
            Solicitar Orçamento Gratuito
          </a>
        </div>
      </div>
    </section>
  );
}
