# OWSCORP Marketplace

## Overview

OWSCORP (Online Web Solution & Corporation) is a comprehensive software marketplace platform that connects developers and companies with customers seeking premium digital products. The platform facilitates the sale and purchase of web templates, mobile apps, AI agents, and desktop software across multiple platforms (Windows, Mac, Linux).

The application follows a modern full-stack architecture with a React frontend using shadcn/ui components and an Express backend with PostgreSQL database integration through Drizzle ORM. Authentication is handled via Replit's OIDC implementation with session management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design System:**
- Custom warm color palette with neutral base tones (inspired by Baker template aesthetic)
- Typography using Inter (primary) and Space Grotesk (accent) from Google Fonts
- Consistent spacing primitives based on Tailwind's 2/4/6/8/12/16 unit system
- Responsive grid layouts with mobile-first approach
- Elevation system using shadow utilities for depth hierarchy

**Component Organization:**
- Reusable UI components in `/client/src/components/ui/` (shadcn/ui)
- Feature components in `/client/src/components/` (Header, Footer, ProductCard, etc.)
- Page-level components in `/client/src/pages/`
- Custom hooks in `/client/src/hooks/` for shared logic (auth, mobile detection, toasts)

**State Management:**
- React Query for server state (products, cart, orders, user data)
- Local component state with useState for UI interactions
- No global state management library (Redux/Zustand) - keeping it simple with Query's cache

**Routing Strategy:**
- Client-side routing with Wouter
- Protected routes with authentication checks
- Role-based access control (user, developer, company, admin)
- Automatic redirect to Replit OIDC login for unauthenticated users

### Backend Architecture

**Technology Stack:**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Drizzle ORM for database operations
- Neon Serverless for PostgreSQL connections with WebSocket support
- Passport.js with OpenID Connect strategy for authentication

**API Structure:**
- RESTful API endpoints under `/api/*` prefix
- Route organization in `/server/routes.ts`
- Middleware for session management, JSON parsing, and request logging
- Authentication middleware (`isAuthenticated`) protecting sensitive routes

**Session Management:**
- Server-side sessions stored in PostgreSQL using connect-pg-simple
- 7-day session TTL (time-to-live)
- HTTP-only, secure cookies for session tokens
- OIDC token refresh handled automatically

**Data Access Layer:**
- Storage abstraction in `/server/storage.ts` implementing IStorage interface
- Centralized database operations for all entities (users, products, orders, etc.)
- Drizzle ORM queries with type-safe schema definitions
- Transaction support for complex operations (checkout, order creation)

### Database Schema

**Core Tables:**
- `users` - All user types with role-based differentiation (user, developer, company, admin)
- `seller_profiles` - Extended information for developers/companies (PAN, Aadhar, qualifications)
- `categories` - Product categorization (Web Templates, Mobile Apps, AI Agents, Desktop Software)
- `products` - Marketplace listings with pricing, features, ratings, and sales tracking
- `cart_items` - Shopping cart persistence per user
- `orders` - Purchase history with status tracking (pending, completed, cancelled)
- `order_items` - Line items for each order with snapshot pricing
- `reviews` - Product ratings and comments from verified purchasers
- `commission_settings` - Platform commission configuration
- `sessions` - Server-side session storage for authentication

**Schema Design Principles:**
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Timestamps for audit trails (`createdAt`, `updatedAt`)
- Soft relationships with cascade deletes where appropriate
- JSONB fields for flexible metadata storage
- Enum types for status fields (user roles, order statuses)

### Authentication & Authorization

**Authentication Flow:**
- Replit OIDC (OpenID Connect) integration
- Login redirects to `/api/login` triggering OIDC flow
- Callback handling at `/api/login/callback`
- Session establishment with encrypted tokens
- Automatic token refresh using refresh tokens

**Authorization Levels:**
- **User**: Basic marketplace access, cart, and order management
- **Developer/Company**: Seller dashboard, product uploads, analytics
- **Admin**: Platform management, user administration, commission settings

**Security Measures:**
- HTTPS-only cookies in production
- CSRF protection via session tokens
- Role-based route protection
- Input validation using Zod schemas (drizzle-zod integration)

### External Dependencies

**Third-Party Services:**
- **Replit Authentication**: OIDC provider for user identity management
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Google Fonts**: Web font delivery (Inter, Space Grotesk, DM Sans, Fira Code)

**NPM Packages:**
- **@radix-ui/***: Accessible UI component primitives (dialogs, dropdowns, tooltips, etc.)
- **@tanstack/react-query**: Async state management and caching
- **drizzle-orm**: Type-safe SQL query builder
- **express-session**: Session middleware with PostgreSQL store
- **passport**: Authentication middleware framework
- **openid-client**: OIDC/OAuth 2.0 client implementation
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

**Development Tools:**
- **Vite**: Frontend bundler with HMR (Hot Module Replacement)
- **TypeScript**: Static type checking
- **drizzle-kit**: Database migration tooling
- **esbuild**: Backend bundling for production
- **@replit/vite-plugin-***: Development experience plugins (error overlay, cartographer, banner)

**Asset Management:**
- Static images stored in `/attached_assets/generated_images/`
- Image imports via Vite's asset handling
- Product images, hero backgrounds, and category visuals

**API Integrations:**
- No external payment processors currently (placeholder for future Stripe/PayPal integration)
- No email service integration (placeholder for SendGrid/Mailgun)
- No file storage service (placeholder for AWS S3/Cloudinary for product downloads)