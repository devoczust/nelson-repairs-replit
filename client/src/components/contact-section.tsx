import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  User,
  Shield,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PHONE, PHONE_TEXT } from "@/lib/phone";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado pelo contato. Responderemos em breve!",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.service ||
      !formData.message
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const curitibaNeighborhoods = [
    "Centro",
    "Batel",
    "Água Verde",
    "Cabral",
    "Bigorrilho",
    "Mercês",
    "Cristo Rei",
    "Portão",
    "Juvevê",
    "Santa Felicidade",
    "E muitas outras...",
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm mb-6">
            <MessageCircle size={16} />
            Contato Direto
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            Solicite Seu
            <span className="text-primary block">Orçamento Gratuito</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Entre em contato e receba uma resposta rápida. Estamos prontos para
            cuidar da sua casa!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="animate-slide-up">
            <Card className="bg-white shadow-warm border-0 h-full">
              <CardContent className="p-2 pt-6 md:p-8">
                <h3 className="ml-6 text-2xl font-bold text-warm-brown mb-8 flex items-center">
                  <Phone className="mr-3 text-primary" size={24} />
                  Fale Conosco
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start p-4 bg-gradient-to-r from-whatsapp/10 to-green-50 rounded-xl">
                    <div className="w-12 h-12 bg-whatsapp rounded-xl flex items-center justify-center mr-4">
                      <SiWhatsapp className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        WhatsApp Preferido
                      </h4>
                      <p className="text-gray-600 font-medium">{PHONE_TEXT}</p>
                      <a
                        href={`https://wa.me/${PHONE}?text=Olá Nelson! Encontrei seu site e gostaria de solicitar um orçamento.`}
                        className="text-whatsapp hover:text-green-600 font-semibold transition-colors inline-flex items-center mt-2"
                      >
                        Conversar Agora →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">E-mail</h4>
                      <p className="text-gray-600">
                        nelsonoczust1975@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-construction-yellow/20 to-orange-50 rounded-xl">
                    <div className="w-12 h-12 bg-construction-yellow rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="text-warm-brown" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Área de Atendimento
                      </h4>
                      <p className="text-gray-600">
                        Curitiba e Região Metropolitana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Horário de Atendimento
                      </h4>
                      <p className="text-gray-600">
                        Segunda a Sexta: 8h às 18h
                      </p>
                      <p className="text-gray-600 text-sm">
                        Emergências: Consulte disponibilidade
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Area */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="mr-2 text-primary" size={20} />
                    Regiões Atendidas em Curitiba
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {curitibaNeighborhoods.map((neighborhood, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {neighborhood}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Card className="bg-white shadow-warm border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-warm-brown mb-6 flex items-center">
                  <Send className="mr-3 text-primary" size={24} />
                  Envie uma Mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-gray-700 font-semibold"
                    >
                      Nome Completo *
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        className="pl-10 border-2 border-gray-200 focus:border-primary rounded-xl"
                        placeholder="Seu nome completo"
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 font-semibold"
                    >
                      Telefone/WhatsApp *
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                        className="pl-10 border-2 border-gray-200 focus:border-primary rounded-xl"
                        placeholder="(41) 99999-9999"
                      />
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-semibold"
                    >
                      E-mail
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10 border-2 border-gray-200 focus:border-primary rounded-xl"
                        placeholder="seu@email.com"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="service"
                      className="text-gray-700 font-semibold"
                    >
                      Tipo de Serviço *
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        handleInputChange("service", value)
                      }
                    >
                      <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-primary rounded-xl">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eletrica">
                          🔌 Serviços Elétricos
                        </SelectItem>
                        <SelectItem value="hidraulica">
                          🚿 Serviços Hidráulicos
                        </SelectItem>
                        <SelectItem value="montagem">
                          🪑 Montagem de Móveis
                        </SelectItem>
                        <SelectItem value="pintura">
                          🎨 Pintura e Acabamentos
                        </SelectItem>
                        <SelectItem value="reparos">
                          🔧 Pequenos Reparos
                        </SelectItem>
                        <SelectItem value="instalacoes">
                          ⚙️ Instalações Gerais
                        </SelectItem>
                        <SelectItem value="outros">
                          📋 Outros Serviços
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-gray-700 font-semibold"
                    >
                      Descreva o Serviço *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Descreva detalhes do serviço que precisa, localização, urgência, etc..."
                      required
                      className="mt-2 border-2 border-gray-200 focus:border-primary rounded-xl"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-warm"
                    disabled={submitContactMutation.isPending}
                  >
                    {submitContactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Enviar Solicitação
                      </>
                    )}
                  </Button>
                </form>

                {/* WhatsApp Alternative */}
                <Card className="mt-6 bg-gradient-to-r from-whatsapp/10 to-green-50 border-whatsapp/30">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 mb-2">
                        Resposta Mais Rápida
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Para respostas imediatas, prefira o WhatsApp
                      </p>
                      <a
                        href={`https://wa.me/${PHONE}?text=Olá Nelson! Encontrei seu site e gostaria de solicitar um orçamento para serviços de manutenção residencial.`}
                        className="bg-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center hover:scale-105 shadow-warm group"
                      >
                        <SiWhatsapp className="mr-2 text-lg group-hover:scale-110 transition-transform" />
                        Conversar no WhatsApp
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
