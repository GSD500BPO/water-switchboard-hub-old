

# Scam Alerts Page - Reddit-Style Community Feed

## Overview

This plan creates a killer scam alerts page with a Reddit-like design featuring upvote/downvote functionality, search/filter capabilities, category tags, and in-site framing. The page will showcase real Utah-focused scams (Sandy, Provo) plus general door-to-door water testing scam education, all while directing users to order legitimate test kits from your site.

---

## Design Concept

```text
+----------------------------------------------------------+
|  HEADER (existing)                                        |
+----------------------------------------------------------+
|                                                          |
|  SCAM ALERTS - Protect Yourself from Water Scams         |
|  ================================================         |
|                                                          |
|  [Search scams...]  [All] [Utah] [Texas] [California]    |
|                     [Door-to-Door] [Phone] [Fake Tests]  |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|  FEATURED ALERT (full width)                             |
|  +------------------------------------------------------+|
|  | WARNING: Door-to-Door Water Testing Scams            ||
|  | How to identify and avoid aggressive sales tactics   ||
|  | 2.4k views | 847 shares | PINNED                    ||
|  +------------------------------------------------------+|
|                                                          |
|  SCAM FEED (Reddit-style cards)                          |
|  +--------------------------------------------------+   |
|  | [^]  Sandy, UT - Health Department Impersonators |   |
|  | 156  Scammers claiming to be from Health Dept    |   |
|  | [v]  asking for financial info for water tests   |   |
|  |      Feb 2019 | Utah | Door-to-Door | Read More->|   |
|  +--------------------------------------------------+   |
|                                                          |
|  +--------------------------------------------------+   |
|  | [^]  Provo, UT - Utility Payment Scam            |   |
|  | 89   Fraudsters posing as Provo Power demanding  |   |
|  | [v]  immediate payment threatening disconnection |   |
|  |      Sep 2024 | Utah | Phone Scam | Read More -> |   |
|  +--------------------------------------------------+   |
|                                                          |
|  SAFE TESTING CTA                                        |
|  +------------------------------------------------------+|
|  | Worried about your water? Get a REAL test.           ||
|  | [Order Certified Test Kit] [Request Free Test]       ||
|  +------------------------------------------------------+|
|                                                          |
+----------------------------------------------------------+
|  FOOTER (existing)                                        |
+----------------------------------------------------------+
```

---

## Scam Articles to Include

### Utah-Specific Scams

| Title | Location | Type | Source | Date |
|-------|----------|------|--------|------|
| Health Department Impersonators | Sandy, UT | Door-to-Door | Salt Lake Tribune | Feb 2019 |
| Provo Power Utility Scam | Provo, UT | Phone/Door | Fox 13 | Sep 2024 |

### General Education Articles

| Title | Type | Key Points |
|-------|------|------------|
| Door-to-Door Water Testing Scams | Education | Belleville NJ case, $12k systems, aggressive tactics |
| How to Spot a Scam | Guide | Tablets tests, free tests, government claims |
| Water Softener Salesman Tactics | Exposed | Survey sheets, demonstrations, price manipulation |

---

## Files to Create

### 1. Scam Alerts Page (`src/pages/ScamAlerts.tsx`)

Main page with:
- Hero section with warning theme
- Search bar with real-time filtering
- Category filter chips (location, scam type)
- Reddit-style scam cards with voting UI
- Detail modal or expandable sections
- CTA section linking to legitimate test kits

### 2. Scam Data File (`src/data/scamData.ts`)

Contains all scam articles:
- Sandy Health Department scam
- Provo utility scam
- Door-to-door education article (rewritten for CWT)
- Sales tactics exposure
- Each with: title, summary, full content, location, date, category, source, vote count

### 3. Scam Card Component (`src/components/scam-alerts/ScamCard.tsx`)

Reddit-style card:
- Upvote/downvote buttons (visual only initially)
- Vote count display
- Title and preview text
- Location and category badges
- Date and source
- "Read More" expand/link

### 4. Scam Detail Modal (`src/components/scam-alerts/ScamDetailModal.tsx`)

Full article view:
- Complete scam description
- Warning signs listed
- How to report
- CTA to order test kit

### 5. Scam Search/Filter (`src/components/scam-alerts/ScamFilters.tsx`)

- Search input
- Category chips (Utah, Phone, Door-to-Door, etc.)
- Sort options (newest, most votes)

---

## Files to Modify

### 1. `src/App.tsx`
- Add route: `/scam-alerts` -> `ScamAlerts` page

### 2. `src/lib/translations.ts`
- Add scam-related translation keys

---

## Scam Content - Rewritten for CWT

### Article 1: "How to Avoid Door-to-Door Water Test Scams" (Featured)

This is the educational piece rewritten from the user-provided content, positioning CWT as the safe alternative:

**Content:**
- Warning signs (tablets that change color, government claims, pushy behavior)
- What to do if approached
- WQA statement about never soliciting door-to-door
- CTA: "Order a certified at-home water test kit instead"

### Article 2: Sandy, UT - Health Department Impersonators

**Summary:** Sandy City warned residents about scammers claiming to be from the Health Department to test water and asking for financial information. This occurred during the 2019 water crisis when high levels of lead, copper, and fluoride were found.

**Key Point:** Neither the city nor health department charges for testing or asks for financial info.

### Article 3: Provo, UT - Utility Scam Alert

**Summary:** Provo Power warned about fraudsters posing as representatives, demanding payment and threatening disconnection. Scams coming through calls, texts, emails, and door-to-door.

**Safety Tips:** Verify employees, never pay via phone, use official website.

### Article 4: Salesman Tactics Exposed

**Summary:** Detailed breakdown of water softener salesman tactics including:
- Survey sheets to calculate fake savings
- Beaker tests with rigged demonstrations
- Precipitation tests that look alarming but show harmless minerals
- Pressure to buy $6,000-$10,000 systems

---

## Component Details

### ScamCard Design

```text
+-------------------------------------------------------+
| [^]  SANDY, UT - Health Department Impersonators      |
| 156  -----------------------------------------------  |
| [v]                                                   |
|      Scammers claiming to be from Health Dept asking  |
|      for financial info during water crisis...        |
|                                                       |
|      [Utah] [Door-to-Door] [2019]                    |
|                                                       |
|      Source: Salt Lake Tribune    [Read Full Story]  |
+-------------------------------------------------------+
```

### Color Coding by Category

| Category | Color |
|----------|-------|
| Utah | Blue badge |
| Door-to-Door | Red/warning badge |
| Phone Scam | Orange badge |
| Fake Tests | Purple badge |
| Education | Green badge |

---

## Search Functionality

The search will filter scam cards by:
- Title text
- Description text
- Location
- Category tags

Real-time filtering as user types.

---

## Implementation Order

1. Create `src/data/scamData.ts` with all scam articles
2. Create `src/components/scam-alerts/ScamCard.tsx`
3. Create `src/components/scam-alerts/ScamFilters.tsx`
4. Create `src/components/scam-alerts/ScamDetailModal.tsx`
5. Create `src/pages/ScamAlerts.tsx` (main page)
6. Update `src/App.tsx` with new route
7. Update `src/lib/translations.ts` with scam translation keys

---

## CTA Integration

Every scam article ends with:

**"Worried about your water? Here's how to safely test:"**
1. Order an at-home water test kit (link to your kits)
2. Request a free test from a certified expert (dealer CTA)

This positions CWT as the trustworthy alternative to scammers.

---

## Technical Notes

- Voting is visual-only initially (no backend)
- Search uses client-side filtering (fast, no API)
- Modal stays in-site (no external navigation)
- Responsive: cards stack on mobile
- Language support via translations file
- Dealer mode: "Free Test" CTA shows instead of "Order Kit"

---

## Bilingual Content

All scam articles will have Spanish translations:
- "Alertas de Estafas"
- "Como Evitar Estafas de Pruebas de Agua Puerta a Puerta"
- All summaries and full articles in both languages

