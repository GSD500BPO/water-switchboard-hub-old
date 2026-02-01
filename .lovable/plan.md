

# Community Water Test (CWT) - Complete Implementation Plan

## Project Overview
A geo-aware lead exchange platform positioned as a neutral water quality authority. Combines the approved master architecture with Angi-style SEO/content structure to capture demand through education, then route leads based on dealer territory rules and payment status.

## Brand Identity

### Logo
- CWT shield with capitol dome design
- "DATA COLLECTION UNIT" tagline
- Government-adjacent, authoritative positioning

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Navy Blue | #1a3a5c | Headers, footer, primary text, authority elements |
| Sky Blue | #4a9fd4 | CTAs, interactive elements, links |
| Light Blue | #7ec8e3 | Accents, highlights, wave patterns |
| White | #ffffff | Backgrounds, cards, clean space |
| Light Gray | #f5f7fa | Section backgrounds, alternating rows |
| Dark Gray | #4a5568 | Body text, secondary content |

### Typography
- Headlines: Clean sans-serif (Inter or similar)
- Body: Readable, professional
- Data/Tables: Monospace hints for numbers

---

## Phase 1: Foundation and Core Infrastructure

### 1.1 Database Schema (Supabase/Lovable Cloud)

**dealers table**
- id (uuid, primary key)
- name (text)
- contact_email (text)
- contact_phone (text)
- allowed_zips (text array)
- allowed_brands (text array)
- language_support (text array) - ['en', 'es']
- payment_status (enum: active, inactive, suspended)
- webhook_url (text)
- monthly_fee (decimal)
- per_close_fee (decimal)
- territory_type (enum: exclusive, shared, primary)
- created_at, updated_at (timestamps)

**leads table**
- id (uuid, primary key)
- first_name, last_name, email, phone (text)
- zip, city, state (text)
- source (enum: seo, paid, youtube, qr, social, direct)
- campaign_id, rep_id, qr_id (text, nullable)
- language (text, default 'en')
- property_type (enum: home, business, rental)
- water_concerns (text array)
- best_contact_time (text)
- intent_score (integer, 1-10)
- dealer_routed_to (uuid, nullable, foreign key)
- status (enum: new, contacted, qualified, closed, lost)
- routed_at, contacted_at, closed_at (timestamps)
- created_at (timestamp)

**team_members table**
- id (uuid, primary key)
- email (text, unique)
- password_hash (text)
- role (enum: admin, viewer)
- name (text)
- created_at, last_login (timestamps)

**webhook_logs table**
- id (uuid, primary key)
- lead_id (uuid, foreign key)
- dealer_id (uuid, foreign key)
- status (enum: pending, sent, failed, retrying)
- response_code (integer)
- attempts (integer)
- last_attempt_at (timestamp)
- created_at (timestamp)

**water_quality_data table** (mock data initially)
- id (uuid, primary key)
- zip (text)
- city, state (text)
- contaminants (jsonb) - [{name, level, safe_limit, status}]
- hardness_level (text)
- source_type (enum: municipal, well, mixed)
- last_updated (timestamp)

### 1.2 Authentication System
- Email/password login for team members
- Session management with JWT tokens
- Role-based access control (admin vs viewer)
- Password reset functionality
- Login audit logging

### 1.3 Geo Detection Service
- IP-based auto-detection on page load (using free geo API)
- ZIP input field for precision (required for lead capture)
- ZIP to City/State resolution using lookup table
- Store detected and confirmed geo separately

---

## Phase 2: Public-Facing Pages

### 2.1 Homepage (Angi-Inspired Layout)

**Header**
- CWT logo (left)
- Navigation: Water Testing | Filters | Cost Guides | Scam Alerts | About
- Language toggle (EN/ES) (right)
- No login visible to public

**Hero Section**
- Background: Subtle water/community imagery or gradient
- H1: "What's Really In Your Water?"
- Subtext: "Independent water quality data for your ZIP code"
- Large ZIP input field with search button
- Trust badges below: "Independent | Community-Focused | No Sales Pressure"

**How It Works** (3-step icons)
1. Enter your ZIP code
2. See local water quality data
3. Request a free community test

**Water Alerts Section**
- "Recent Water Quality Alerts Near You"
- Cards showing city, alert type, date (mock data)
- Dynamic based on detected region

**Popular Topics** (Angi-style category icons)
- Water Testing
- Whole House Filters
- Well Water Safety
- Lead Testing
- PFAS Concerns
- Hard Water Solutions

**Footer**
- Navy background
- Logo + tagline
- Quick links
- Legal links
- "Community Water Test is an independent data resource"

### 2.2 ZIP Results Page (Dynamic Routing)

**URL Structure**: /water-quality/[zip] or /water-quality/[state]/[city]

**Scenario A: Active Dealer Exists**

Header modification:
- "Community Water Test - Sponsored by [Dealer Name]"
- "Verified Local Water Specialist" badge

Content:
- Local water quality summary
- Only dealer-approved brands shown
- Dealer testimonials section
- CTA: "Request a Free Local Water Test" (sky blue button)

Lead form routes directly to dealer.

**Scenario B: No Active Dealer**

Header:
- Standard CWT branding only
- No dealer mention

Content:
- Full water quality data (EWG-style)
- All brand comparisons (neutral)
- Pricing ranges by category
- Scam warning section
- CTA: "Request a Free Community Water Test" (sky blue button)

Lead goes to holding pool.

### 2.3 Lead Capture Form

**Fields:**
- First Name, Last Name (required)
- Email (required)
- Phone (required)
- Preferred Language (EN/ES dropdown)
- Property Type (Home / Business / Rental)
- Best Time to Contact (Morning / Afternoon / Evening)
- Current Water Concerns (checkboxes):
  - Bad taste or smell
  - Hard water / scale buildup
  - Health concerns
  - Recent contamination news
  - Moving to new home
  - Other

**Hidden Fields** (auto-captured):
- ZIP, city, state
- Source (seo/paid/qr/etc)
- campaign_id, rep_id, qr_id (from URL params)
- Timestamp
- Detected vs confirmed geo
- Page URL

**Success State:**
- Confirmation message
- "What happens next" explainer
- No dealer name shown unless sponsored

### 2.4 Bilingual Support

**Implementation:**
- Language context provider
- Translation files (en.json, es.json)
- Toggle in header persists to localStorage
- All public pages fully translated
- Form labels, validation messages, CTAs

---

## Phase 3: SEO Content System (Angi-Style)

### 3.1 Cost Guide Template

**Example Page**: "How Much Does a Whole House Water Test Cost? [2026]"

**Hero Section:**
- H1 with year-based SEO title
- One-sentence summary with national average
- ZIP input with "Check costs near you" CTA

**Cost Snapshot Module:**
- Visual range bar (Low | Average | High)
- Numbers: $0 - $50 - $500+
- Geo-adjusted if ZIP entered
- Disclaimer text

**Editorial Credibility Bar:**
- "Written by Community Water Test"
- "Reviewed by Water Quality Editor"
- Last updated: [date]

**Content Sections:**
1. Introduction (what is a water test)
2. Cost Factors (H2 with subsections)
3. Tables (test types, home sizes, add-ons)
4. When to Test (triggers and timing)
5. DIY vs Professional
6. Cost-Saving Tips
7. Scam Warnings
8. Local CTA (ZIP-based)
9. Related Guides (internal links)

**SEO Elements:**
- Breadcrumbs: Home > Water Testing > Cost Guides
- FAQ schema
- Table markup
- Meta description with range

### 3.2 City/State Pages

**URL**: /water-quality/[state]/[city]

**Template Sections:**
- City-specific H1
- Water source information
- Local contaminant data
- Recent news/alerts
- Cost expectations for the area
- Local CTA (dealer-aware)
- Related cities

### 3.3 Blog Structure

**Categories:**
- Scam Alerts (/scam-alerts/)
- Pricing Guides (/pricing/)
- Brand Comparisons (/compare/)
- Water Safety (/safety/)
- How-To (/guides/)

**Initial Articles:**
1. "How to Spot a Scam Water Test"
2. "What Sales Reps Don't Tell You"
3. "Water Filter Pricing: What's Fair?"
4. "Municipal vs Well Water Testing"
5. "Is a Free Water Test Really Free?"

### 3.4 Brand Comparison Pages

**URL**: /compare/[brand-a]-vs-[brand-b]

**Structure:**
- Neutral header
- Side-by-side specs
- Pros/cons tables
- Pricing ranges
- User considerations
- No affiliate links
- Note: specific brand content only shows when dealer sponsors allow

---

## Phase 4: Admin Dashboard

### 4.1 Authentication Flow
- /admin/login route
- Email/password form
- Session persistence
- Redirect to dashboard on success

### 4.2 Dashboard Layout

**Sidebar Navigation:**
- Dashboard (overview)
- Dealers
- Leads
- Territories (map view)
- Content (future)
- Settings
- Logout

**Dashboard Overview:**
- Total leads (today/week/month)
- Leads by status pie chart
- Active dealers count
- Open territories count
- Recent activity feed

### 4.3 Dealer Management

**Dealer List View:**
- Table: Name, Status, Territory Count, Leads This Month, Actions
- Filter by status
- Search by name
- Add Dealer button

**Dealer Detail/Edit:**
- Basic info (name, contact)
- Territory assignment (ZIP input with add/remove)
- Allowed brands (multi-select)
- Language support (EN/ES checkboxes)
- Webhook URL field
- Payment status toggle
- Fee configuration
- Performance metrics
- Lead history for this dealer

### 4.4 Lead Management

**Lead List View:**
- Table: Name, ZIP, Source, Status, Dealer, Date, Actions
- Filters: status, source, date range, dealer, geo
- Search by name/email
- Bulk actions: export, assign, delete

**Lead Detail:**
- Full contact info
- Source attribution
- Routing info (why this dealer or holding pool)
- Status timeline
- Webhook delivery status
- Manual reassign option

### 4.5 Territory Map (Future Enhancement)

- US map with ZIP overlay
- Color coding:
  - Green: active dealer
  - Yellow: open/available
  - Orange: multiple dealers
- Click to see dealer details
- Toggle visibility

---

## Phase 5: Lead Routing Engine

### 5.1 Routing Logic (Edge Function)

```text
TRIGGER: Lead form submission

STEP 1: Extract ZIP from form
STEP 2: Query dealers table WHERE:
  - zip IN allowed_zips
  - payment_status = 'active'
STEP 3: If dealer found:
  - Set dealer_routed_to = dealer.id
  - Trigger webhook delivery
STEP 4: If no dealer:
  - Set dealer_routed_to = null
  - Lead stays in holding pool
STEP 5: Save lead to database
STEP 6: Return confirmation
```

### 5.2 Webhook Delivery

**Payload Structure:**
```text
{
  lead_id: "uuid",
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone: "555-123-4567",
  zip: "90210",
  city: "Beverly Hills",
  state: "CA",
  property_type: "home",
  water_concerns: ["hard_water", "taste"],
  language: "en",
  source: "seo",
  campaign_id: "summer-2026",
  submitted_at: "2026-02-01T12:00:00Z"
}
```

**Delivery Logic:**
- POST to dealer.webhook_url
- Timeout: 10 seconds
- Retry on failure: 3 attempts with exponential backoff
- Log all attempts and responses
- Alert admin on repeated failures

### 5.3 Holding Pool Management

- Leads with no dealer assignment
- Visible in admin as "Unassigned"
- Manual assignment capability
- Bulk export for external sale
- Lead aging indicator (days since capture)

---

## File Structure

```text
src/
  assets/
    cwt-logo.png
  components/
    layout/
      Header.tsx
      Footer.tsx
      Navigation.tsx
      LanguageToggle.tsx
    home/
      Hero.tsx
      HowItWorks.tsx
      WaterAlerts.tsx
      CategoryIcons.tsx
    results/
      WaterQualityCard.tsx
      DealerBadge.tsx
      ContaminantList.tsx
    forms/
      LeadCaptureForm.tsx
      ZipInput.tsx
    content/
      CostSnapshot.tsx
      CostFactorsSection.tsx
      DataTable.tsx
      BreadcrumbNav.tsx
    admin/
      Sidebar.tsx
      DealerTable.tsx
      LeadTable.tsx
      StatsCards.tsx
    ui/
      (existing shadcn components)
  pages/
    Index.tsx (homepage)
    WaterQuality.tsx (ZIP results)
    CostGuide.tsx (SEO template)
    CityPage.tsx (city template)
    Blog.tsx (article listing)
    BlogPost.tsx (article detail)
    Compare.tsx (brand comparison)
    admin/
      Login.tsx
      Dashboard.tsx
      Dealers.tsx
      DealerDetail.tsx
      Leads.tsx
      LeadDetail.tsx
  hooks/
    useGeoDetection.ts
    useDealer.ts
    useLeads.ts
    useLanguage.ts
  contexts/
    LanguageContext.tsx
    AuthContext.tsx
  lib/
    utils.ts
    translations/
      en.json
      es.json
  types/
    dealer.ts
    lead.ts
    water-data.ts
```

---

## Implementation Order

### Sprint 1: Core Foundation (Week 1)
1. Set up database tables in Lovable Cloud
2. Implement brand colors and typography in Tailwind config
3. Create Header and Footer with logo
4. Build Homepage with hero and ZIP input
5. Create basic ZIP results page (mock data)

### Sprint 2: Lead Capture (Week 2)
1. Build LeadCaptureForm component
2. Implement lead submission to database
3. Create URL parameter capture (campaign_id, etc.)
4. Add bilingual support structure
5. Test lead storage flow

### Sprint 3: Dealer System (Week 3)
1. Build admin login system
2. Create dealer management CRUD
3. Implement routing logic (dealer lookup)
4. Build webhook delivery edge function
5. Create holding pool view

### Sprint 4: Content Templates (Week 4)
1. Build Cost Guide template page
2. Create City Page template
3. Add SEO elements (breadcrumbs, tables)
4. Create mock water quality data
5. Internal linking structure

### Sprint 5: Polish and Launch (Week 5)
1. Full bilingual content
2. Admin dashboard refinements
3. Mobile responsiveness testing
4. Error handling and edge cases
5. Production deployment

---

## Technical Notes

- All dealer visibility controlled via database - no code changes needed
- URL parameters automatically captured on any page
- Language preference persisted in localStorage
- Edge functions for webhook delivery (auto-retry)
- RLS policies to protect dealer and lead data
- Admin routes protected by authentication

