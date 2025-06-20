import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageCircle, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    location: "Água Verde, Curitiba",
    service: "Serviços Elétricos",
    text: "Nelson é extremamente profissional e pontual. Resolveu todos os problemas elétricos da minha casa com muita qualidade. Recomendo para todos!",
    avatar: "M"
  },
  {
    name: "João Santos", 
    location: "Batel, Curitiba",
    service: "Montagem de Móveis",
    text: "Serviço excelente! Nelson montou todos os móveis da minha casa nova. Trabalho limpo, rápido e com preço justo. Super recomendo!",
    avatar: "J"
  },
  {
    name: "Ana Costa",
    location: "Centro, Curitiba", 
    service: "Pequenos Reparos",
    text: "Precisava de vários reparos pequenos em casa e Nelson resolveu tudo em uma visita. Muito eficiente e confiável. Virou meu 'marido de aluguel' oficial!",
    avatar: "A"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-gradient-construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm mb-6">
            <MessageCircle size={16} />
            Depoimentos de Clientes
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            O que Nossos
            <span className="text-primary block">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Histórias reais de famílias que confiaram em nosso trabalho para cuidar de seus lares
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white card-hover shadow-construction border-0 relative overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote size={40} />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  <div className="flex text-construction-yellow mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-current" size={20} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">5.0</span>
                </div>

                {/* Service Badge */}
                <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {testimonial.service}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-warm-brown">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Heart size={12} className="text-red-400 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-construction-yellow to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-warm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-warm-brown mb-4">
              Junte-se aos Nossos Clientes Satisfeitos!
            </h3>
            <p className="text-gray-600 mb-6">
              Faça parte desta lista de famílias que confiam em nosso trabalho para cuidar de seus lares
            </p>
            <a 
              href="https://wa.me/5541999023899?text=Olá Nelson! Vi os depoimentos no seu site e gostaria de solicitar um orçamento." 
              className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-warm hover:shadow-xl hover:scale-105 group"
            >
              <i className="fab fa-whatsapp mr-3 text-xl group-hover:scale-110 transition-transform"></i>
              Solicitar Meu Orçamento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
