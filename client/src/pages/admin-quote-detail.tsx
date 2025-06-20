import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Download, Printer } from "lucide-react";
import type { Quote } from "@shared/schema";

interface AdminQuoteDetailProps {
  quoteId: string;
}

export default function AdminQuoteDetail({ quoteId }: AdminQuoteDetailProps) {
  const [, setLocation] = useLocation();

  // Check authentication
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  // Fetch quote details
  const { data: quote, isLoading: quoteLoading } = useQuery({
    queryKey: ["/api/admin/quotes", quoteId],
    enabled: !!user && !!quoteId,
  });

  // Redirect to login if not authenticated
  if (userError || (!userLoading && !user)) {
    setLocation("/admin/login");
    return null;
  }

  if (userLoading || quoteLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando orçamento...</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Orçamento não encontrado</h2>
          <p className="text-gray-600 mb-4">O orçamento solicitado não existe ou foi removido.</p>
          <Button onClick={() => setLocation("/admin/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const items = JSON.parse(quote.items);

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

  const handleDownloadPDF = () => {
    window.open(`/api/admin/quotes/${quote.id}/pdf`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => setLocation("/admin/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quote.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(quote.status)}>
                  {getStatusText(quote.status)}
                </Badge>
                <span className="text-sm text-gray-500">
                  Orçamento #{quote.id}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation(`/admin/quote/${quote.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quote Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Dados Gerais</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Título:</strong> {quote.title}</div>
                    {quote.description && (
                      <div><strong>Descrição:</strong> {quote.description}</div>
                    )}
                    <div><strong>Status:</strong> {getStatusText(quote.status)}</div>
                    <div><strong>Criado em:</strong> {formatDate(quote.createdAt)}</div>
                    {quote.validUntil && (
                      <div><strong>Válido até:</strong> {formatDate(quote.validUntil)}</div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Dados do Cliente</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nome:</strong> {quote.customerName}</div>
                    <div><strong>Telefone:</strong> {quote.customerPhone}</div>
                    {quote.customerEmail && (
                      <div><strong>E-mail:</strong> {quote.customerEmail}</div>
                    )}
                    {quote.customerAddress && (
                      <div><strong>Endereço:</strong> {quote.customerAddress}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Itens do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Descrição</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Qtd</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Valor Unit.</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900">{item.description}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{item.quantity}</td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(quote.subtotal)}</span>
                </div>
                {parseFloat(quote.discount) > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Desconto:</span>
                    <span className="font-medium text-red-600">
                      - {formatCurrency(quote.discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(quote.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {quote.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{quote.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4 print:hidden">
            <Button
              variant="outline"
              onClick={() => setLocation("/admin/dashboard")}
              className="flex-1"
            >
              Voltar ao Dashboard
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            font-size: 12px;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}