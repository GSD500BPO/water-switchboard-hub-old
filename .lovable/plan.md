

# Add New Scam Articles & Mail-In Scam Category

## Overview

This plan adds 3 new scam articles to the Scam Alerts system: the FTC Aqua Finance $19.8 million settlement, the Oregon mail-in test kit scam, and expands the existing content with "mail-in" as a new category. The content emphasizes that users should never mail in test kits or trust mail solicitations, and positions Community Water Test as the trusted alternative with verified reps.

---

## New Scam Categories & Locations

| New Category | Purpose |
|-------------|---------|
| `mail-in` | For mail solicitation scams with fake test kits |
| `financing` | For predatory financing and debt trap scams |

| New Location | Purpose |
|-------------|---------|
| `Oregon` | For the Seal Rock Water District case |
| `National` | For FTC cases that apply everywhere |

---

## New Scam Articles to Add

### Article 1: FTC Aqua Finance Settlement

| Field | Value |
|-------|-------|
| Title | FTC Sends $19.8 Million in Refunds for Deceptive Water Treatment Sales |
| Location | National |
| Categories | door-to-door, financing |
| Date | 2025-02-19 |
| Source | FTC.gov |
| Votes | 3500 (high visibility - major federal case) |
| isPinned | false |

**Key Content Points:**
- FTC filed lawsuit May 2024 against Aqua Finance
- Nationwide network of dealers using deceptive financing terms
- Left consumers with hundreds to thousands in unexpected debt
- Financing terms impaired some consumers' ability to sell/refinance homes
- $23.6 million in debt relief + $19.8 million in refunds
- 29,653 affected consumers

**Warning Signs:**
- Door-to-door water system sales with financing offers
- Unclear or hidden financing terms
- Systems that create liens on your home
- High-pressure immediate financing approval

**Safety Tips:**
- Never sign financing agreements on the spot
- Read all terms carefully, especially about home liens
- Research financing company reputation
- Contact FTC at ReportFraud.ftc.gov if you suspect fraud

---

### Article 2: Oregon Mail-In Test Kit Scam

| Field | Value |
|-------|-------|
| Title | Mail-In Water Test Kits: The Lead Generation Scam |
| Location | Oregon |
| Categories | mail-in, fake-tests |
| Date | 2024-03-20 |
| Source | Oregon Health Authority / Seal Rock Water District |
| Votes | 1890 |
| isPinned | false |

**Key Content Points:**
- Oregon Health Authority warning about mail-in test kits
- Businesses send unsolicited test kits to collect lead information
- Fine print says "not affiliated with EPA or health departments"
- They collect: name, address, water source, existing filtration info
- Contact homeowners saying results are bad, offer "free in-home analysis"
- Then push expensive water softeners or POU systems
- Use provided images as visual reference in article content

**Warning Signs:**
- Receiving unsolicited water test kits in the mail
- Kit asks for extensive personal information
- "Return deadline" pressure tactics
- Fine print disclaiming government affiliation
- Offers for "free in-home analysis" after mailing

**Safety Tips - CRITICAL MESSAGING:**
- Never mail in unsolicited test kits
- If no one showed up, don't believe it's legitimate
- Always make sure a trusted person is home during any water test
- Bring a spouse, loved one, or call us to verify
- Order certified tests from verified representatives instead

---

### Article 3: Protect Yourself from Mail-In Test Scams (Education/Featured)

| Field | Value |
|-------|-------|
| Title | How to Protect Yourself from Mail-In Water Test Scams |
| Location | General |
| Categories | mail-in, education, fake-tests |
| Date | 2025-03-01 |
| Votes | 2200 |
| isPinned | false |

**Key Content Points - User's Requested Messaging:**

This educational article combines all the mail-in scam information with CWT's positioning:

1. **Never mail in unsolicited test kits** - If you receive a test kit you didn't request, throw it away
2. **If no one showed up, don't believe it** - Legitimate companies don't cold-mail test kits
3. **Always have someone with you** - Always make sure to be home with your spouse, loved one, or call us to verify any in-home test
4. **Order certified tests** - Get your test from verified reps following best practices with the seal of approval
5. **Disclaimer about sales** - After testing, representatives may present you with filter options and leave brochures - this is normal and expected

**Safety Tips - Direct CWT Positioning:**
- Order certified tests with WQA seal of approval from verified representatives
- Verified reps follow best practices and have background checks
- Happy families trust systems from certified dealers
- After testing, expect a presentation on filter options (this is transparent and expected)
- Representatives may leave brochures on filtration systems

---

## File Changes Required

### 1. Update `src/data/scamData.ts`

**Add new category types:**
```typescript
export type ScamCategory = 
  | "door-to-door" 
  | "phone" 
  | "fake-tests" 
  | "education" 
  | "utility"
  | "mail-in"      // NEW
  | "financing";   // NEW
```

**Add new location types:**
```typescript
export type ScamLocation = "Utah" | "New Jersey" | "General" | "Oregon" | "National";
```

**Add new category labels:**
```typescript
"mail-in": { en: "Mail-In Scam", es: "Estafa por Correo" },
"financing": { en: "Financing Scam", es: "Estafa de Financiamiento" }
```

**Add new location labels:**
```typescript
"Oregon": { en: "Oregon", es: "Oregon" },
"National": { en: "National", es: "Nacional" }
```

**Add 3 new scam articles** with full bilingual content

### 2. Update `src/lib/translations.ts`

Add new translation keys for the disclaimer/CTA messaging about verified reps and filter presentations.

### 3. Add Reference Images to Assets

Copy the 3 uploaded scam mailer images to `src/assets/`:
- `scam-test-tube.png` - Image of plastic blister pack with test tube
- `scam-mail-notice.png` - Image of water test notice form
- `scam-mailer.png` - Image of the "Big Stone City" mailer

These images will be referenced as visual examples in the Oregon mail-in article.

### 4. Update `src/components/scam-alerts/ScamDetailModal.tsx`

Add image display capability for articles that have reference images.

---

## Content Structure for New Articles

### FTC Aqua Finance Article Content:

**English:**
```
The Federal Trade Commission is sending more than $19.8 million in refunds to consumers harmed by deceptive sales tactics from water treatment financing company Aqua Finance.

**The Case:**
In May 2024, the FTC filed a lawsuit against Aqua Finance, charging that the company's nationwide network of dealers deceived consumers during door-to-door sales...

[Full article content with all details from FTC press release]

**What This Means for You:**
If you're approached by water treatment salespeople offering financing, be extremely cautious...
```

**Spanish:**
Full professional translation of the same content.

### Oregon Mail-In Scam Article Content:

**English:**
```
The Oregon Health Authority and Seal Rock Water District issued a warning about fake water testing kits being mailed to residents.

**How the Scam Works:**

While not a criminal scam, these businesses operate in a way that raises serious concerns...

[Three reference images showing actual scam materials]

**Critical Rules to Follow:**
1. **Never mail in unsolicited test kits** - If you didn't request it, don't respond
2. **If no one showed up, don't believe it** - Real water testing involves appointment scheduling
3. **Always have someone with you** - Never be alone during an in-home water test
...
```

---

## CTA Disclaimer Addition

For the ScamDetailModal and ScamAlerts page, update the CTA section to include transparent messaging:

**Current CTA:**
"Don't trust door-to-door salespeople. Use a certified test kit or request a free test from a verified expert."

**Updated CTA:**
"Order your certified water test from seal-of-approval verified representatives following industry best practices. After testing, your representative will present filter options and may leave informational brochures - this transparent consultation is part of our service."

---

## Spanish URL Structure (Future Enhancement)

The current routing uses the same `/scam-alerts` route for both languages. A future enhancement could add:
- `/es/alertas-de-estafas` - Spanish version with Spanish URL
- Language detection routing

For now, the language context handles translation dynamically.

---

## Implementation Order

1. Copy uploaded images to `src/assets/` folder
2. Update `scamData.ts` with new types and category/location labels
3. Add the 3 new scam articles with full bilingual content
4. Update translations.ts with new keys
5. Update ScamDetailModal to support optional images
6. Update ScamAlerts page CTA with disclaimer text

---

## Technical Notes

- Images are for visual reference in article content (not embedded directly as site images)
- All content is bilingual (Spanish + English)
- New categories will automatically appear in the filter chips
- Vote counts are seeded for display purposes (no backend voting yet)
- Disclaimer about filter presentations is transparent and expected

