import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertQuoteSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import connectPg from "connect-pg-simple";
import puppeteer from "puppeteer";
import { PHONE_TEXT } from "@/lib/phone";

// Middleware to check if user is authenticated
const requireAuth = (req: any, res: any, next: any) => {
  if (req.session?.userId) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const pgStore = connectPg(session);
  app.use(session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "nelson-oczust-admin-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username e senha são obrigatórios" });
      }

      const user = await storage.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      req.session.userId = user.id;
      res.json({ message: "Login realizado com sucesso", user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao fazer logout" });
      }
      res.json({ message: "Logout realizado com sucesso" });
    });
  });

  // Check admin auth status
  app.get("/api/admin/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Create admin user (only for initial setup)
  app.post("/api/admin/setup", async (req, res) => {
    try {
      // Check if admin user already exists
      const existingUser = await storage.getUserByUsername("nelson");
      if (existingUser) {
        return res.status(400).json({ message: "Usuário admin já existe" });
      }

      const user = await storage.createUser({
        username: "nelson",
        password: "nelson123456", // Default password - should be changed after first login
      });

      res.json({ message: "Usuário admin criado com sucesso", userId: user.id });
    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ message: "Erro ao criar usuário admin" });
    }
  });

  // Quotes management
  app.get("/api/admin/quotes", requireAuth, async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Erro ao buscar orçamentos" });
    }
  });

  app.post("/api/admin/quotes", requireAuth, async (req, res) => {
    try {
      const quoteData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating quote:", error);
        res.status(500).json({ message: "Erro ao criar orçamento" });
      }
    }
  });

  app.get("/api/admin/quotes/:id", requireAuth, async (req, res) => {
    try {
      const quote = await storage.getQuote(parseInt(req.params.id));
      if (!quote) {
        return res.status(404).json({ message: "Orçamento não encontrado" });
      }
      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Erro ao buscar orçamento" });
    }
  });

  app.put("/api/admin/quotes/:id", requireAuth, async (req, res) => {
    try {
      const updates = insertQuoteSchema.partial().parse(req.body);
      const quote = await storage.updateQuote(parseInt(req.params.id), updates);
      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating quote:", error);
        res.status(500).json({ message: "Erro ao atualizar orçamento" });
      }
    }
  });

  app.delete("/api/admin/quotes/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteQuote(parseInt(req.params.id));
      res.json({ message: "Orçamento excluído com sucesso" });
    } catch (error) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: "Erro ao excluir orçamento" });
    }
  });

  // Generate PDF for quote
  app.get("/api/admin/quotes/:id/pdf", requireAuth, async (req, res) => {
    try {
      const quote = await storage.getQuote(parseInt(req.params.id));
      if (!quote) {
        return res.status(404).json({ message: "Orçamento não encontrado" });
      }

      const items = JSON.parse(quote.items);
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Orçamento - ${quote.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .company-name { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
            .company-info { font-size: 14px; color: #666; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #2563eb; }
            .customer-info { background-color: #f8fafc; padding: 15px; border-radius: 8px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            .items-table th { background-color: #2563eb; color: white; font-weight: bold; }
            .items-table .number { text-align: right; }
            .totals { background-color: #f8fafc; padding: 20px; border-radius: 8px; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .total-row.final { font-size: 18px; font-weight: bold; border-top: 2px solid #2563eb; padding-top: 10px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Nelson Oczust - Pequenas Reformas</div>
            <div class="company-info">
              WhatsApp: ${PHONE_TEXT} | E-mail: nelsonoczust1975@gmail.com<br>
              Curitiba e Região Metropolitana
            </div>
          </div>

          <div class="section">
            <div class="section-title">Dados do Cliente</div>
            <div class="customer-info">
              <strong>Nome:</strong> ${quote.customerName}<br>
              <strong>Telefone:</strong> ${quote.customerPhone}<br>
              ${quote.customerEmail ? `<strong>E-mail:</strong> ${quote.customerEmail}<br>` : ''}
              ${quote.customerAddress ? `<strong>Endereço:</strong> ${quote.customerAddress}<br>` : ''}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Orçamento: ${quote.title}</div>
            ${quote.description ? `<p><strong>Descrição:</strong> ${quote.description}</p>` : ''}
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Qtd</th>
                  <th>Valor Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item: any) => `
                  <tr>
                    <td>${item.description}</td>
                    <td class="number">${item.quantity}</td>
                    <td class="number">R$ ${parseFloat(item.unitPrice).toFixed(2).replace('.', ',')}</td>
                    <td class="number">R$ ${parseFloat(item.total).toFixed(2).replace('.', ',')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>R$ ${parseFloat(quote.subtotal).toFixed(2).replace('.', ',')}</span>
              </div>
              ${parseFloat(quote.discount) > 0 ? `
                <div class="total-row">
                  <span>Desconto:</span>
                  <span>- R$ ${parseFloat(quote.discount).toFixed(2).replace('.', ',')}</span>
                </div>
              ` : ''}
              <div class="total-row final">
                <span>TOTAL:</span>
                <span>R$ ${parseFloat(quote.total).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            ${quote.validUntil ? `<p><strong>Validade:</strong> ${new Date(quote.validUntil).toLocaleDateString('pt-BR')}</p>` : ''}
            ${quote.notes ? `<p><strong>Observações:</strong> ${quote.notes}</p>` : ''}
          </div>

          <div class="footer">
            Orçamento gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}<br>
            Nelson Oczust - Mais de 35 anos de experiência em serviços residenciais
          </div>
        </body>
        </html>
      `;

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html);
      
      const pdf = await page.pdf({
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      });
      
      await browser.close();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="orcamento-${quote.id}-${quote.customerName.replace(/[^a-zA-Z0-9]/g, '')}.pdf"`);
      res.send(pdf);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Erro ao gerar PDF" });
    }
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Here you would typically send an email notification
      // For now, we'll just log the contact
      console.log("New contact received:", contact);
      
      res.json({ success: true, message: "Mensagem enviada com sucesso!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes - not exposed in frontend)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
