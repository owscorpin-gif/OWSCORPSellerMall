# OWSCORP Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by the Baker template - featuring warm, professional aesthetics with clean layouts, prominent hero carousels, statistics counters, and elegant product showcases. The design emphasizes trust, quality, and approachability.

## Core Design Principles
- **Warm & Professional**: Trust-building through clean, warm color palette and elegant typography
- **Content-Forward Design**: Large images, clear hierarchy, prominent call-to-actions
- **Multi-Interface Consistency**: Unified OWSCORP branding with warm, welcoming aesthetics across all interfaces

---

## Typography

**Primary Font**: Inter (Google Fonts) - Clean, modern sans-serif
**Accent Font**: Space Grotesk (Google Fonts) - For headings and emphasis

**Scale**:
- Hero Headings: text-5xl to text-6xl, font-bold
- Section Headings: text-3xl to text-4xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body Text: text-base, font-normal
- Small Text/Labels: text-sm, font-medium
- Micro Text: text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Tight spacing: p-2, gap-2 (for compact elements)
- Standard spacing: p-4, p-6, gap-4 (for cards, forms)
- Section spacing: py-12, py-16, pb-20 (vertical rhythm)
- Large gaps: gap-8, gap-12 (between major sections)

**Grid System**:
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Dashboard layouts: grid-cols-1 lg:grid-cols-3 (sidebar + content)
- Analytics cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

**Container Widths**:
- Main content: max-w-7xl mx-auto px-4
- Forms/Auth pages: max-w-md mx-auto
- Product details: max-w-6xl mx-auto

---

## Component Library

### Navigation & Header
- **Header**: Sticky top navigation with OWSCORP logo (abbreviation + full name on hover), category mega-menu, search bar, cart icon with badge, user avatar/login
- **3D Effect**: Subtle backdrop blur with shadow-lg, border-b with gradient underline
- Height: h-16 to h-20

### Product Cards (Critical Component)
- **Structure**: Rounded-2xl cards with overflow-hidden
- **Image Area**: aspect-square or aspect-video with object-cover
- **3D Depth**: shadow-xl with hover:shadow-2xl transition, transform hover:-translate-y-2
- **Content**: Product image, title, developer name, price badge, rating stars, quick action buttons
- **Layering**: Floating price tag (absolute positioning), gradient overlay on image bottom

### Dashboard Sidebar (Developer/Company/Admin)
- **Width**: w-64, fixed positioning
- **3D Treatment**: Elevated panel with shadow-2xl, subtle gradient background
- **Navigation Items**: py-3 px-4 with rounded-lg, hover states with background shift
- **Icons**: Heroicons (outline for inactive, solid for active states)

### Analytics Cards
- **Layout**: Grid of stat cards with key metrics
- **Design**: Rounded-xl, p-6, gradient backgrounds, shadow-lg
- **Content**: Large number display (text-4xl font-bold), label (text-sm), trend indicator, mini chart/icon
- **3D Depth**: Multiple shadow layers for floating effect

### Shopping Cart
- **Sidebar Drawer**: Slide-in panel from right, w-96, backdrop blur overlay
- **Cart Items**: List with product thumbnail, name, price, quantity controls, remove button
- **Sticky Footer**: Subtotal, checkout button with gradient background

### Authentication Pages
- **Layout**: Centered card (max-w-md) on gradient background
- **Card Design**: Rounded-2xl, p-8 to p-12, shadow-2xl with backdrop-blur
- **Form Inputs**: Rounded-lg, p-3 to p-4, border with focus states
- **Separate Admin Login**: Distinct visual treatment with different gradient scheme

### Product Detail Page
- **Layout**: Two-column grid (lg:grid-cols-2)
- **Left**: Large product images/screenshots carousel with thumbnails
- **Right**: Title, developer info card, price, features list, CTA buttons, reviews section
- **Tabs**: Features, Reviews, Developer Info with underline indicator

### Review & Rating System
- **Star Display**: 5-star rating with filled/empty states (Heroicons star icons)
- **Review Cards**: User avatar, name, rating, date, review text, helpful votes
- **Layout**: Stacked list with dividers, pagination

### AI Chatbot
- **Position**: Fixed bottom-right corner, z-50
- **Collapsed**: Circular button with chat icon, shadow-2xl, gradient background
- **Expanded**: Rounded-2xl panel, w-96, h-[600px], chat interface with input at bottom

### Admin Panel Tables
- **Structure**: Responsive table with sticky header
- **Rows**: Hover states, alternating subtle backgrounds
- **Actions**: Icon buttons in dedicated column (edit, delete, view)
- **Filters**: Top bar with search, category dropdowns, date pickers

---

## 3D Design Elements

**Elevation System**:
- Level 1 (Cards): shadow-lg
- Level 2 (Modals): shadow-xl
- Level 3 (Popups): shadow-2xl
- Interactive elements: Combine shadows with transform transitions

**Depth Techniques**:
- Gradient overlays on images (linear-gradient from transparent to semi-opaque)
- Layered shadows (multiple box-shadow values)
- Border highlights (border-t with lighter shade for top edge glow)
- Backdrop blur for glass-morphism effects (backdrop-blur-sm to backdrop-blur-lg)

**Transitions**: Use transition-all duration-300 for smooth hover states

---

## Images

### Hero Section
- **Full-width hero** with gradient overlay showcasing software/digital products
- **Image**: Modern abstract tech/digital artwork or 3D rendered software interface mockups
- **Placement**: Top of User Interface homepage, h-[500px] to h-[600px]
- **Overlay**: Gradient from bottom with OWSCORP tagline, search bar, featured categories

### Product Images
- High-quality screenshots, mockups, or preview images for each software product
- Aspect ratio: Flexible (square for grid, wider for detail pages)
- **Placement**: Product cards (grid), product detail carousel, cart thumbnails

### Profile Images
- User/Developer/Company avatars (circular, w-12 h-12 to w-32 h-32 depending on context)
- Default placeholders with initials if no image uploaded

### Category Images
- Icon-based or illustrative category headers for browsing sections

---

## Form Design
- **Input Fields**: rounded-lg, p-3, border-2, focus:ring-2 focus:ring-offset-2
- **Buttons**: 
  - Primary: Rounded-lg, px-6 py-3, font-semibold, gradient backgrounds, shadow-md
  - Secondary: Outlined with border-2, transparent background
  - Icon buttons: rounded-full, p-2
- **File Uploads**: Drag-and-drop zones with dashed borders, rounded-xl
- **Rich Text Editors**: For product descriptions (Quill.js or similar)

---

## Responsive Behavior
- Mobile: Stack all columns, full-width cards, bottom navigation for key actions
- Tablet: 2-column grids, collapsible sidebar
- Desktop: Full multi-column layouts, persistent sidebars

---

## Branding Integration
**OWSCORP Logo**: Display in header (abbreviation) with tooltip/hover showing full name "Online Web Solution & Corporation"
**Consistent Placement**: All four interfaces (User, Developer, Company, Admin) feature logo in top-left
**Footer**: Full company name, links, social media, copyright