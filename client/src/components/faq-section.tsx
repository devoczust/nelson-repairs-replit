import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Qual é a área de atendimento?",
    answer: "Atendemos toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré e outras cidades próximas."
  },
  {
    question: "Como é feito o orçamento?",
    answer: "O orçamento é totalmente gratuito e sem compromisso. Entre em contato pelo WhatsApp, descreva o serviço e agendaremos uma visita para avaliar e apresentar o valor."
  },
  {
    question: "Os serviços têm garantia?",
    answer: "Sim! Todos os nossos serviços têm garantia. Em caso de qualquer problema relacionado ao serviço executado, retornamos para correção sem custo adicional."
  },
  {
    question: "Qual o prazo para agendamento?",
    answer: "Trabalhamos com agendamento flexível. Para emergências, tentamos atender no mesmo dia. Para serviços programados, geralmente conseguimos agendar dentro de 2-3 dias úteis."
  },
  {
    question: "Preciso comprar os materiais?",
    answer: "Podemos trabalhar das duas formas: você pode comprar os materiais ou podemos providenciar para você. No orçamento, especificamos os materiais necessários e as opções disponíveis."
  }
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p className="text-xl text-gray-600">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <Card key={index} className="shadow-sm border-0">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg" 
                onClick={() => toggleItem(index)}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                <ChevronDown 
                  className={`transition-transform duration-200 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              {openItems.includes(index) && (
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
