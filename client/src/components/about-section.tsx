import { CheckCircle, Award, Users, Clock, Star, Shield } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PHONE } from "@/lib/phone";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagem */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1618090584126-129cd1f3fbae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Nelson Oczust - Profissional experiente em manutenção residencial"
                className="rounded-2xl shadow-warm w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Badge de qualidade */}
            <div className="hidden md:block absolute -top-6 -right-6 bg-construction-yellow p-4 rounded-2xl shadow-construction animate-bounce-soft">
              <div className="text-center">
                <Award className="text-warm-brown mx-auto mb-2" size={24} />
                <div className="text-sm font-bold text-warm-brown">
                  Qualidade
                  <br />
                  Garantida
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm mb-4">
                <Users size={16} />
                Conhece Nelson Oczust
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
              Mais de 35 Anos
              <span className="text-primary block">Cuidando de Lares</span>
            </h2>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Com mais de{" "}
              <span className="font-bold text-primary">
                35 anos de experiência
              </span>{" "}
              no mercado, Nelson se tornou uma referência em manutenção
              residencial em Curitiba. Cada serviço é uma oportunidade de cuidar
              do seu lar com carinho e profissionalismo.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Especializado em resolver os desafios do dia a dia da sua casa,
              Nelson oferece soluções práticas e duradouras. Seu compromisso é
              entregar trabalhos de qualidade que fazem a diferença no conforto
              e segurança da sua família.
            </p>

            {/* Características */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-center p-4 bg-green-50 rounded-xl">
                <div className="bg-green-500 p-2 rounded-full mr-4">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Profissional Experiente e Confiável
                  </div>
                  <div className="text-sm text-gray-600">
                    Décadas de experiência em diversos tipos de reparo
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-500 p-2 rounded-full mr-4">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Orçamentos Gratuitos e Transparentes
                  </div>
                  <div className="text-sm text-gray-600">
                    Sem surpresas, preços justos e claros
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <div className="bg-purple-500 p-2 rounded-full mr-4">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Garantia em Todos os Serviços
                  </div>
                  <div className="text-sm text-gray-600">
                    Tranquilidade e segurança para você
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                <div className="bg-orange-500 p-2 rounded-full mr-4">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Atendimento Rápido e Pontual
                  </div>
                  <div className="text-sm text-gray-600">
                    Respeito ao seu tempo e urgência
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${PHONE}?text=Olá Nelson! Gostaria de conhecer melhor seus serviços e solicitar um orçamento.`}
              className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-warm hover:shadow-xl hover:scale-105 group"
            >
              <SiWhatsapp className="mr-3 text-xl group-hover:scale-110 transition-transform" />
              Conversar com Nelson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
