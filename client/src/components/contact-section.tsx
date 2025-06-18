import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

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
    message: ""
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderemos em breve!",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
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
    if (!formData.name || !formData.phone || !formData.service || !formData.message) {
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const curitibaNeighborhoods = [
    "Centro", "Batel", "Água Verde", "Cabral", "Bigorrilho", "Mercês",
    "Cristo Rei", "Portão", "Juvevê", "Santa Felicidade", "E muitas outras..."
  ];

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">Solicite seu orçamento gratuito agora mesmo</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-whatsapp p-3 rounded-lg mr-4">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp</h4>
                  <p className="text-gray-600">(41) 99902-3899</p>
                  <a href="https://wa.me/5541999023899" className="text-whatsapp hover:underline">
                    Clique para conversar
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-lg mr-4">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">E-mail</h4>
                  <p className="text-gray-600">nelsonoczust1975@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-lg mr-4">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Área de Atendimento</h4>
                  <p className="text-gray-600">Curitiba e Região Metropolitana</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-lg mr-4">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Horário de Atendimento</h4>
                  <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600">Emergências: Consulte disponibilidade</p>
                </div>
              </div>
            </div>

            {/* Service Area Map */}
            <Card className="bg-gray-100 border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Regiões Atendidas em Curitiba</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {curitibaNeighborhoods.map((neighborhood, index) => (
                    <div key={index}>• {neighborhood}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="service">Tipo de Serviço *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletrica">Serviços Elétricos</SelectItem>
                      <SelectItem value="hidraulica">Serviços Hidráulicos</SelectItem>
                      <SelectItem value="montagem">Montagem de Móveis</SelectItem>
                      <SelectItem value="pintura">Pintura e Acabamentos</SelectItem>
                      <SelectItem value="reparos">Pequenos Reparos</SelectItem>
                      <SelectItem value="instalacoes">Instalações Gerais</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Descreva o Serviço *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Descreva detalhes do serviço que precisa..."
                    required
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-blue-800 text-white py-4 font-semibold"
                  disabled={submitContactMutation.isPending}
                >
                  {submitContactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>

              <Card className="mt-6 bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <p className="text-sm text-center text-gray-600">
                    <strong>Prefere WhatsApp?</strong>{" "}
                    <a 
                      href="https://wa.me/5541999999999?text=Olá! Gostaria de solicitar um orçamento." 
                      className="text-whatsapp hover:underline font-medium"
                    >
                      Clique aqui para conversar diretamente
                    </a>
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
