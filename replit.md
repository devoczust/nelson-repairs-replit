# replit.md

## Overview

This is a full-stack web application for Nelson Oczust's handyman services business in Curitiba, Brazil. The application is built as a landing page showcasing small repairs and maintenance services ("marido de aluguel") with a contact form for customer inquiries. The stack uses React for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence.

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
- **Users Table**: Basic user authentication structure (not actively used in current implementation)
- **Contacts Table**: Stores customer inquiries with fields for name, phone, email, service type, message, and timestamp

### API Routes
- `POST /api/contacts`: Submit contact form data
- `GET /api/contacts`: Retrieve all contacts (admin-only, not exposed in frontend)

### Frontend Pages
- **Home Page**: Single-page application with sections for hero, services, about, testimonials, FAQ, and contact
- **404 Page**: Simple not found page

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

## User Preferences

Preferred communication style: Simple, everyday language.