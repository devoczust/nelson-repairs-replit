# replit.md

## Overview

This is a comprehensive full-stack web application for Nelson Oczust's handyman services business in Curitiba, Brazil. The application includes a professional landing page showcasing small repairs and maintenance services ("marido de aluguel") with customer contact forms, plus a complete admin system for quote management and PDF generation. The stack uses React for the frontend, Express.js for the backend, PostgreSQL with Drizzle ORM for data persistence, and Puppeteer for PDF generation.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI components with shadcn/ui design system
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Validation**: Zod for runtime type checking
- **Session Management**: Built-in session handling (though not actively used)
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Database Schema
- **Users Table**: Admin authentication with hashed passwords for secure access
- **Contacts Table**: Stores customer inquiries with fields for name, phone, email, service type, message, and timestamp
- **Quotes Table**: Complete quote management with items, customer details, pricing, and status tracking
- **Sessions Table**: PostgreSQL session storage for admin authentication

### API Routes
**Public Routes:**
- `POST /api/contacts`: Submit contact form data

**Admin Authentication:**
- `POST /api/admin/login`: Admin login with session management
- `POST /api/admin/logout`: Admin logout
- `GET /api/admin/me`: Check authentication status
- `POST /api/admin/setup`: Create initial admin user (one-time setup)

**Admin Quote Management:**
- `GET /api/admin/quotes`: List all quotes
- `POST /api/admin/quotes`: Create new quote
- `GET /api/admin/quotes/:id`: Get specific quote details
- `PUT /api/admin/quotes/:id`: Update existing quote
- `DELETE /api/admin/quotes/:id`: Delete quote
- `GET /api/admin/quotes/:id/pdf`: Generate and download PDF quote

**Admin Data Access:**
- `GET /api/contacts`: Retrieve all customer contacts (admin-only)

### Frontend Pages
**Public Pages:**
- **Home Page**: Single-page application with sections for hero, services, about, testimonials, FAQ, and contact
- **404 Page**: Simple not found page

**Admin Panel:**
- **Admin Login**: Secure authentication page for Nelson's access
- **Admin Dashboard**: Overview with statistics, quote management, and contact viewing
- **Quote Management**: Create, edit, view, and delete quotes with PDF export
- **Quote Details**: Detailed view with print and PDF download options

### UI Components
- Navigation with smooth scrolling
- Hero section with call-to-action
- Services showcase with icons
- About section with experience highlights
- Customer testimonials
- FAQ accordion
- Contact form with validation
- Floating WhatsApp button

## Data Flow

1. **Contact Form Submission**: User fills contact form → Frontend validates with Zod → POST to `/api/contacts` → Backend validates and stores in database → Success/error response
2. **Page Navigation**: Single-page app with smooth scrolling between sections
3. **WhatsApp Integration**: Direct links to WhatsApp with pre-filled messages for quick customer contact
4. **Admin Authentication**: Login with credentials → Session creation with PostgreSQL storage → Protected route access
5. **Quote Management**: Create/edit quotes with multiple items → JSON storage in database → PDF generation with Puppeteer
6. **PDF Export**: Professional quote layout with company branding → Server-side PDF generation → Direct download

## External Dependencies

### Key Libraries
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI components
- **wouter**: Lightweight React router
- **zod**: Schema validation
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Database: PostgreSQL hosted on Neon (serverless)

### Environment Configuration
- **Development**: `npm run dev` - runs server with Vite middleware for hot reload
- **Production**: `npm run build && npm run start` - builds and serves optimized bundle
- **Database**: `npm run db:push` - pushes schema changes to database

### Deployment Platform
- Configured for Replit deployment with autoscale
- Port 5000 mapped to external port 80
- PostgreSQL module enabled in Replit environment

## Changelog
- June 18, 2025. Initial setup
- June 18, 2025. Updated contact information: phone number to 41999023899, email to nelsonoczust1975@gmail.com, work hours (removed Saturday), fixed button styling, and replaced hero image
- June 20, 2025. Complete admin system implementation:
  - Added PostgreSQL database integration with Drizzle ORM
  - Implemented secure admin authentication with session management
  - Created comprehensive quote management system with CRUD operations
  - Added professional PDF export functionality using Puppeteer
  - Built responsive admin dashboard with statistics and contact management
  - Admin credentials: username "nelson", password "nelson123456"

## User Preferences

Preferred communication style: Simple, everyday language.