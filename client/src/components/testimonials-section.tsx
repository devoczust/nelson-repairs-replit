import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    location: "Água Verde, Curitiba",
    text: "Nelson é extremamente profissional e pontual. Resolveu todos os problemas da minha casa com muita qualidade. Recomendo para todos!"
  },
  {
    name: "João Santos",
    location: "Batel, Curitiba",
    text: "Serviço excelente! Nelson montou todos os móveis da minha casa nova. Trabalho limpo, rápido e com preço justo. Super recomendo!"
  },
  {
    name: "Ana Costa",
    location: "Centro, Curitiba",
    text: "Precisava de vários reparos pequenos em casa e Nelson resolveu tudo em uma visita. Muito eficiente e confiável. Virou meu 'marido de aluguel' oficial!"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600">Depoimentos reais de clientes satisfeitos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-current" size={16} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <User className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
