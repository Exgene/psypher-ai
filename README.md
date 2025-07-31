# Tier-Based Event Showcase

A modern, responsive web application that allows authenticated users to view events based on their tier membership. Built with Next.js 14, Clerk authentication, and PostgreSQL with a clean, professional interface.

## Project Overview

**Task Title**: Tier-Based Event Showcase  
**Objective**: Build a responsive and elegant web application that allows logged-in users to view a list of show events based on their user tier (Free, Silver, Gold, Platinum). Users can only see events available to their tier or any lower tier.

## Screenshots

<!-- Add your screenshots here -->
<!-- e.g., <img src="path/to/screenshot1.png" width="400"> -->

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **ORM**: Drizzle ORM
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion

## Features

### Authentication
- Complete Clerk.dev integration for login/signup
- Protected routes for authenticated users only
- User tier management system
- Automatic user creation with default "free" tier

### Event Management
- PostgreSQL database with events table
- Complete schema: `id`, `title`, `description`, `event_date`, `image_url`, `tier`
- Tier-based event filtering (users see their tier + lower tiers)
- Seeded database with events across all tiers

### Frontend UI
- Fully responsive design with Tailwind CSS
- Clean, modern interface with dark/light mode
- Event cards with title, description, date, tier badges, and images
- Color-coded tier badges
- Mobile-friendly responsive layout

### Bonus Features
- Comprehensive loading states and error handling
- Tier upgrade functionality with validation
- Professional error boundaries
- Optimistic UI updates
- Image loading with fallbacks
- Smooth animations and transitions
- Professional component architecture

## Architecture

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  tier VARCHAR(10) CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Events table  
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  event_date TIMESTAMP,
  image_url TEXT,
  tier VARCHAR(10) CHECK (tier IN ('free', 'silver', 'gold', 'platinum'))
);
```

### Tier System Logic
- **Free**: Can see Free events only
- **Silver**: Can see Free + Silver events  
- **Gold**: Can see Free + Silver + Gold events
- **Platinum**: Can see all events (Free + Silver + Gold + Platinum)

### Component Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── actions.ts         # Server actions
├── components/            
│   ├── common/           # Reusable components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── services/             # Business logic layer
├── lib/                  # Utilities and configuration
└── types/                # TypeScript definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Clerk.dev account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd psypher-tasc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   
   # Application (Optional)
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate database migrations
   pnpm run db:generate
   
   # Run migrations
   pnpm run db:migrate
   
   # Seed the database
   pnpm run db:seed
   ```

5. **Start Development Server**
   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production  
pnpm run start        # Start production server
pnpm run lint         # Run ESLint

# Database
pnpm run db:generate  # Generate database migrations
pnpm run db:migrate   # Run database migrations  
pnpm run db:seed      # Seed database with sample data
```

## Testing the Application

The application automatically creates users with the "free" tier by default. You can test tier upgrades using the tier selector in the dashboard.

**Test Flow**:
1. Sign up/Sign in through Clerk
2. View available events (initially Free tier only)
3. Use the tier selector to upgrade your tier
4. See additional events become available
5. Test tier validation (can only upgrade one level at a time)

## Technical Decisions

### Database Choice
This implementation uses Supabase DB with Drizzle ORM for:
- Better type safety and developer experience
- More flexible deployment options
- Easier local development setup
- Professional ORM patterns

### Architecture Patterns
- **Service Layer**: Business logic separated from UI components
- **Server Actions**: Next.js 14 server actions for data mutations
- **Component Composition**: Reusable, composable component design
- **Error Boundaries**: Graceful error handling at component level

## Performance Optimizations

- Server Components by default for better performance
- Image optimization with custom loading states
- Efficient state management with React transitions
- Optimistic UI updates for better user experience
- Proper code splitting and lazy loading

## Deployment

The application is ready for deployment on Vercel with minimal configuration required. Simply connect your GitHub repository to Vercel and add the environment variables.
