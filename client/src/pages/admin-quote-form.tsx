import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertQuoteSchema, type QuoteItem } from "@shared/schema";
import { z } from "zod";
import { Plus, Trash2, ArrowLeft, Calculator } from "lucide-react";

const quoteFormSchema = insertQuoteSchema.extend({
  items: z.array(z.object({
    id: z.string(),
    description: z.string().min(1, "Descrição é obrigatória"),
    quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
    unitPrice: z.number().min(0, "Preço deve ser maior ou igual a 0"),
    total: z.number().min(0, "Total deve ser maior ou igual a 0"),
  })).min(1, "Adicione pelo menos um item"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface AdminQuoteFormProps {
  quoteId?: string;
  isEdit?: boolean;
}

export default function AdminQuoteForm({ quoteId, isEdit = false }: AdminQuoteFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  // Fetch existing quote if editing
  const { data: existingQuote, isLoading: quoteLoading } = useQuery({
    queryKey: ["/api/admin/quotes", quoteId],
    enabled: !!user && !!quoteId && isEdit,
  });

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      title: "",
      description: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      items: [
        {
          id: "1",
          description: "",
          quantity: 1,
          unitPrice: 0,
          total: 0,
        }
      ],
      subtotal: "0",
      discount: "0",
      total: "0",
      status: "draft",
      validUntil: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Load existing quote data
  useEffect(() => {
    if (existingQuote && isEdit) {
      const items = JSON.parse(existingQuote.items);
      form.reset({
        title: existingQuote.title,
        description: existingQuote.description || "",
        customerName: existingQuote.customerName,
        customerPhone: existingQuote.customerPhone,
        customerEmail: existingQuote.customerEmail || "",
        customerAddress: existingQuote.customerAddress || "",
        items: items.map((item: any, index: number) => ({
          id: String(index + 1),
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
        subtotal: existingQuote.subtotal,
        discount: existingQuote.discount,
        total: existingQuote.total,
        status: existingQuote.status,
        validUntil: existingQuote.validUntil ? new Date(existingQuote.validUntil).toISOString().split('T')[0] : "",
        notes: existingQuote.notes || "",
      });
    }
  }, [existingQuote, isEdit, form]);

  const createQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const payload = {
        ...data,
        items: JSON.stringify(data.items),
        validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : null,
      };
      return apiRequest("POST", "/api/admin/quotes", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      toast({
        title: "Orçamento criado",
        description: "O orçamento foi criado com sucesso!",
      });
      setLocation("/admin/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar orçamento",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  const updateQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const payload = {
        ...data,
        items: JSON.stringify(data.items),
        validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : null,
      };
      return apiRequest("PUT", `/api/admin/quotes/${quoteId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes", quoteId] });
      toast({
        title: "Orçamento atualizado",
        description: "O orçamento foi atualizado com sucesso!",
      });
      setLocation("/admin/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar orçamento",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated
  if (userError || (!userLoading && !user)) {
    setLocation("/admin/login");
    return null;
  }

  if (userLoading || (isEdit && quoteLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const calculateTotals = () => {
    const items = form.getValues("items");
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = parseFloat(form.getValues("discount") || "0");
    const total = subtotal - discount;

    form.setValue("subtotal", subtotal.toFixed(2));
    form.setValue("total", total.toFixed(2));
  };

  const updateItemTotal = (index: number) => {
    const items = form.getValues("items");
    const item = items[index];
    const total = item.quantity * item.unitPrice;
    form.setValue(`items.${index}.total`, total);
    calculateTotals();
  };

  const addItem = () => {
    append({
      id: String(fields.length + 1),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      calculateTotals();
    }
  };

  const onSubmit = (data: QuoteFormData) => {
    if (isEdit) {
      updateQuoteMutation.mutate(data);
    } else {
      createQuoteMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Editar Orçamento" : "Novo Orçamento"}
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Orçamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Reparo de torneira" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descrição detalhada do serviço..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="sent">Enviado</SelectItem>
                            <SelectItem value="approved">Aprovado</SelectItem>
                            <SelectItem value="rejected">Rejeitado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Válido até (Opcional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(41) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail (Opcional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="cliente@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço (Opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Endereço completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Itens do Orçamento
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                  <Input placeholder="Descrição do item" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantidade</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  step="1"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value) || 1);
                                    updateItemTotal(index);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preço Unit. (R$)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseFloat(e.target.value) || 0);
                                    updateItemTotal(index);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <Label>Total do Item</Label>
                        <div className="text-lg font-semibold text-primary">
                          R$ {form.watch(`items.${index}.total`)?.toFixed(2) || "0,00"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Totals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Totais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Subtotal</Label>
                    <div className="text-lg font-semibold">
                      R$ {parseFloat(form.watch("subtotal") || "0").toFixed(2)}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desconto (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              calculateTotals();
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Total Final</Label>
                    <div className="text-xl font-bold text-primary">
                      R$ {parseFloat(form.watch("total") || "0").toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações Adicionais (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Informações adicionais, condições de pagamento, etc..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/admin/dashboard")}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createQuoteMutation.isPending || updateQuoteMutation.isPending}
                className="flex-1"
              >
                {createQuoteMutation.isPending || updateQuoteMutation.isPending
                  ? "Salvando..."
                  : isEdit
                  ? "Atualizar Orçamento"
                  : "Criar Orçamento"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}