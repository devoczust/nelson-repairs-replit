import { Hammer, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-warm-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-construction-yellow rounded-lg flex items-center justify-center mr-3">
                <Hammer className="text-warm-brown" size={20} />
              </div>
              <h3 className="text-xl font-bold">Nelson Oczust</h3>
            </div>
            <p className="text-gray-200 mb-4">
              Pequenas reformas e marido de aluguel em Curitiba. Mais de 35 anos
              de experiência em serviços residenciais.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-200">
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
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-center">
                <div className="w-5 h-5 bg-whatsapp rounded mr-3 flex items-center justify-center">
                  <SiWhatsapp className="text-white text-xs" />
                </div>
                <a
                  href="https://wa.me/5541999023899"
                  className="hover:text-white transition-colors"
                >
                  (41) 99902-3899
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 bg-primary rounded mr-3 flex items-center justify-center">
                  <Mail className="text-white" size={12} />
                </div>
                <a
                  href="mailto:nelsonoczust1975@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  nelsonoczust1975@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 bg-construction-yellow rounded mr-3 flex items-center justify-center">
                  <MapPin className="text-warm-brown" size={12} />
                </div>
                <span>Curitiba e Região</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-brown/30 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; 2025 Nelson Oczust - Pequenas Reformas e Marido de Aluguel.
            Todos os direitos reservados.
          </p>
          <p className="mt-2 text-sm">
            Marido de aluguel Curitiba | Pequenas reformas Curitiba | Serviços
            de manutenção residencial Curitiba
          </p>
        </div>
      </div>
    </footer>
  );
}
