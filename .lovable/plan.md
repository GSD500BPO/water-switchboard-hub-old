
# Content Review & CTA Overhaul for Scam Alerts

## Problem Summary

Based on your feedback, there are several issues with the current scam alerts content:

1. **Price mentions ($6,000-$12,000)** - This is too close to your actual pricing, making it confusing
2. **"Order Certified Kit" button** - You don't have test kits yet, so this CTA is misleading
3. **Generic CTA messaging** - Current text mentions "certified test kit or request a free test" which doesn't match your service
4. **No "Technician of the Month" feature** - Need to highlight verified professionals with real testimonials

---

## Changes Overview

### 1. Remove Price Range Mentions

**Files affected:** `src/data/scamData.ts`

**Current (problematic):**
- "Prices in the $6,000-$12,000 range for basic filtration" (warning sign)
- "$6,000 to $10,000" mentioned in content
- "$10,000 water treatment systems" references

**Updated (vague pricing):**
- "Unusually high prices for basic filtration systems"
- "overpriced water treatment systems"
- Remove specific dollar amounts that could be confused with legitimate pricing

---

### 2. Remove "Order Certified Kit" Button & References

**Files affected:**
- `src/components/scam-alerts/ScamDetailModal.tsx`
- `src/pages/ScamAlerts.tsx`
- `src/lib/translations.ts`
- `src/data/scamData.ts`

**Current:**
- "Order Certified Kit" button appears alongside "Request Free Test"
- Safety tips say "Order a certified at-home water test kit instead"
- Translation keys for `scams.orderKit`

**Updated:**
- Remove "Order Certified Kit" button entirely
- Only show "Talk to Our Verified Professional" or "Meet Our Technician of the Month"
- Update safety tips to: "Request a free test from a verified professional"

---

### 3. New CTA Design: "Technician of the Month"

**New messaging structure:**

**Title:** "Worried about your water? Talk to a REAL expert."

**Subtitle:** "Meet our Verified Professional of the Month - trusted by families like yours with real testimonials and happy clients."

**New CTA Buttons:**
- Primary: "Meet Our Verified Expert" or "Schedule Free Test"
- Text below: Disclaimer about filter presentation (already exists)

---

### 4. Add Technician of the Month Feature

**New component or section to add:**

A highlighted card showing:
- Professional's name/title (can be anonymous like "Your Local Expert")
- "Verified Professional of the Month" badge
- Real testimonials snippet (from Facebook videos)
- "Happy families using systems" messaging
- EPA + Background Verified badge
- CTA: "Schedule Your Free Test"

This can pull from the existing dealer data (`yamilyAcosta` in `dealerData.ts`).

---

## Detailed File Changes

### File 1: `src/data/scamData.ts`

| Location | Current | Change To |
|----------|---------|-----------|
| Line 99 | "Prices in the $6,000-$12,000 range for basic filtration" | "Unusually high prices with no written quote" |
| Line 106 | "Precios en el rango de $6,000-$12,000 para filtración básica" | "Precios inusualmente altos sin cotización escrita" |
| Line 114 | "Order a certified at-home water test kit instead" | "Request a free test from a verified professional" |
| Line 120 | "Ordena un kit de prueba de agua certificado en su lugar" | "Solicita una prueba gratuita de un profesional verificado" |
| Line 309 | "$6,000 to $10,000" | "thousands of dollars" / "miles de dólares" |
| Line 350 | "$10,000 water treatment systems" | "expensive water treatment systems" |
| Lines 357-358 | "Prices between $6,000-$10,000" | "Unusually high pricing with pressure tactics" |

### File 2: `src/lib/translations.ts`

**Add new translation keys:**

```typescript
| "scams.ctaExpert"
| "scams.ctaExpertSubtitle"
| "scams.meetExpert"
| "scams.techOfMonth"
```

**Update existing keys:**

| Key | Current | New |
|-----|---------|-----|
| `scams.ctaTitle` | "Worried about your water? Get a REAL test." | "Worried about your water? Talk to a REAL expert." |
| `scams.ctaDesc` | "Order your certified test from..." | "Meet our Verified Professional of the Month - trusted by families like yours with real testimonials and happy clients." |
| `scams.orderKit` | "Order Certified Kit" | Remove or repurpose |

### File 3: `src/components/scam-alerts/ScamDetailModal.tsx`

**CTA Section updates (lines 150-178):**

- Remove the "Order Certified Kit" button entirely
- Change CTA title to "Talk to a REAL expert"
- Add "Technician of the Month" highlight
- Update description to focus on verified professional with testimonials
- Keep the disclaimer about filter presentations

### File 4: `src/pages/ScamAlerts.tsx`

**Safe Testing CTA section (lines 203-236):**

- Remove "Order Certified Kit" button
- Add "Technician of the Month" badge/card
- Change CTA to "Meet Our Verified Expert" or "Schedule Free Test"
- Add testimonial snippet or happy client mention

---

## New "Technician of the Month" Component (Optional)

Create a small feature component that can be reused:

```
+------------------------------------------+
| VERIFIED PROFESSIONAL OF THE MONTH       |
| ======================================== |
|                                          |
| [Expert Image]  "Your Local Water Expert"|
|                 EPA + Background Verified|
|                                          |
| "Trusted by families with real           |
|  testimonials and happy clients"         |
|                                          |
| [See Testimonials] [Schedule Free Test]  |
+------------------------------------------+
```

This would pull data from the existing dealer context.

---

## Summary of Removals

| Item | Action |
|------|--------|
| "$6,000-$12,000" price mentions | Replace with vague "high prices" |
| "$6,000-$10,000" in salesman article | Replace with "thousands of dollars" |
| "$10,000 water treatment systems" | Replace with "expensive systems" |
| "Order Certified Kit" button | Remove completely |
| "Order a certified at-home water test kit" safety tip | Change to "Request a free test from a verified professional" |
| `scams.orderKit` translation key | Repurpose or remove |

---

## Summary of Additions

| Item | Purpose |
|------|---------|
| "Technician of the Month" messaging | Highlight verified expert |
| "Real testimonials and happy clients" text | Build trust |
| Updated CTA: "Meet Our Verified Expert" | Direct to free test |
| Keep filter disclaimer | Transparency about sales pitch |

---

## Date Review

Current article dates are fine - they're based on actual source dates:
- Sandy 2019 case: Feb 28, 2019 (correct)
- Provo 2024 case: Sep 6, 2024 (correct)
- FTC Aqua Finance: Feb 19, 2025 (correct)
- Oregon mail-in: Mar 20, 2024 (correct)
- Educational articles: Recent dates (2025) - can adjust if needed
