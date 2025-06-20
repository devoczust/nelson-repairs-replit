import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  Plus, 
  LogOut, 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Users,
  Calculator,
  DollarSign
} from "lucide-react";
import type { Quote, Contact } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'quotes' | 'contacts'>('quotes');

  // Check authentication
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  // Fetch quotes
  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["/api/admin/quotes"],
    enabled: !!user,
  });

  // Fetch contacts
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/contacts"],
    enabled: !!user && activeTab === 'contacts',
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
      setLocation("/admin/login");
    },
    onError: () => {
      // Force logout even if API call fails
      queryClient.clear();
      setLocation("/admin/login");
    },
  });

  const deleteQuoteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/quotes/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      toast({
        title: "Orçamento excluído",
        description: "O orçamento foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir o orçamento.",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated
  if (userError || (!userLoading && !user)) {
    setLocation("/admin/login");
    return null;
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = (quoteId: number) => {
    window.open(`/api/admin/quotes/${quoteId}/pdf`, '_blank');
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'sent': return 'Enviado';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, {user?.username}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calculator className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total de Orçamentos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quotes?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contatos Recebidos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valor Total em Orçamentos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(
                      quotes?.reduce((sum: number, quote: Quote) => 
                        sum + parseFloat(quote.total), 0) || 0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quotes'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orçamentos
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Contatos
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'quotes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Orçamentos</h2>
              <Button onClick={() => setLocation("/admin/quote/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Orçamento
              </Button>
            </div>

            {quotesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Carregando orçamentos...</p>
              </div>
            ) : !quotes || quotes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum orçamento encontrado.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setLocation("/admin/quote/new")}
                  >
                    Criar Primeiro Orçamento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quotes.map((quote: Quote) => (
                  <Card key={quote.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{quote.title}</h3>
                            <Badge className={getStatusColor(quote.status)}>
                              {getStatusText(quote.status)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">
                            <strong>Cliente:</strong> {quote.customerName} | {quote.customerPhone}
                          </p>
                          <p className="text-gray-600 mb-2">
                            <strong>Total:</strong> {formatCurrency(quote.total)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Criado em {formatDate(quote.createdAt)}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/quote/${quote.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/quote/${quote.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(quote.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm("Tem certeza que deseja excluir este orçamento?")) {
                                deleteQuoteMutation.mutate(quote.id);
                              }
                            }}
                            disabled={deleteQuoteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Contatos Recebidos</h2>
            
            {contactsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Carregando contatos...</p>
              </div>
            ) : !contacts || contacts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum contato recebido ainda.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contacts.map((contact: Contact) => (
                  <Card key={contact.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
                          <p className="text-gray-600 mb-2">
                            <strong>Telefone:</strong> {contact.phone}
                          </p>
                          {contact.email && (
                            <p className="text-gray-600 mb-2">
                              <strong>E-mail:</strong> {contact.email}
                            </p>
                          )}
                          <p className="text-gray-600 mb-2">
                            <strong>Serviço:</strong> {contact.service}
                          </p>
                          <p className="text-gray-600 mb-4">
                            <strong>Mensagem:</strong> {contact.message}
                          </p>
                          <p className="text-sm text-gray-500">
                            Recebido em {formatDate(contact.createdAt)}
                          </p>
                        </div>
                        <div className="ml-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const whatsappMessage = `Olá ${contact.name}! Vi sua mensagem sobre ${contact.service}. Como posso ajudá-lo?`;
                              const whatsappUrl = `https://wa.me/55${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                          >
                            Responder via WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}