import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Pequenas Reformas e
              <span className="text-green-300"> Marido de Aluguel</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Mais de 35 anos de experiência em serviços de manutenção residencial em Curitiba. 
              Trabalho rápido, confiável e com garantia!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5541999023899?text=Olá! Gostaria de solicitar um orçamento." 
                className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2 text-lg"></i>
                Solicitar Orçamento
              </a>
              <Button
                onClick={scrollToServices}
                variant="outline"
                size="lg"
                className="border-2 border-white text-primary bg-white hover:bg-gray-100 px-8 py-4 font-semibold"
              >
                Ver Serviços
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Profissional trabalhando em reforma residencial" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">35+</div>
                <div className="text-gray-600 font-medium">Anos de<br />Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
