

# Fix Favicon + Update Title + Transform Popup into Free eBook Offer

## Problem
1. The browser tab still shows "Lovable App" with the old favicon because the old `favicon.ico` file still exists in `public/` and browsers cache it aggressively. Need to remove it and ensure only our CWT logo PNG is used.
2. Title needs to be "CWT - Community Water Test ORG"
3. The lead capture popup currently just says "Get free information" -- it needs to be transformed into a compelling **free eBook offer** that gives visitors a reason to fill out the form.

## Changes

### 1. Fix Favicon (remove old file + update HTML)
- **Delete** `public/favicon.ico` (the old Lovable favicon that browsers keep picking up)
- **Update `index.html`**: Change title to "CWT - Community Water Test ORG", remove old favicon.ico reference, clean up remaining Lovable references in meta tags

### 2. Transform Lead Capture Popup into Free eBook Offer
**File: `src/components/LeadCapturePopup.tsx`**

Redesign the popup to offer a **free eBook**: "The Homeowner's Guide to Water Quality" (EN) / "Guia del Propietario sobre la Calidad del Agua" (ES)

The eBook concept:
- Title: "What's Really In Your Water? The Complete Homeowner's Guide"
- Covers: Common contaminants (Lead, PFAS, Arsenic, THMs), how to read your water report, EPA safe limits explained, signs your water needs testing, regional water quality patterns
- This positions CWT as an authority and gives a real incentive to share contact info

The popup will show:
- Left side: eBook cover mockup (styled with CSS, no actual PDF needed yet)
- Right side: Form with headline "Get Your FREE Water Quality eBook"
- Fields: Name, Email, ZIP code, Phone (optional)
- Added a Name field since you're emailing them the eBook
- CTA: "Send Me The Free Guide" / "Enviarme La Guia Gratis"

### 3. Update Translations
**File: `src/lib/translations.ts`**

Add/update popup translation keys:
- `popup.title` -> "Get Your FREE Water Quality Guide"
- `popup.subtitle` -> "Learn what contaminants are in your tap water and how to protect your family. Download our comprehensive guide."
- `popup.cta` -> "Send Me The Free Guide"
- `popup.namePlaceholder` -> "Full Name*"
- Add new key `popup.ebookTitle` -> "What's Really In Your Water?"
- Add new key `popup.ebookSubtitle` -> "The Complete Homeowner's Guide"
- Same for Spanish translations

### Data the Form Collects
When someone fills out the form, you'll capture:
| Field | Required | Purpose |
|-------|----------|---------|
| Full Name | Yes | Personalize emails + CRM contact |
| Email | Yes | Send the eBook + follow-up nurture |
| ZIP Code | Yes | Match to local water data + assign dealer |
| Phone | No | For dealer follow-up calls |
| Dealer ID | Auto | Attribution tracking |
| Lead Source | Auto | "eBook Download" or "Dealer: [name]" |
| Detection Source | Auto | How they found the site (QR, organic, etc.) |
| Timestamp | Auto | When they submitted |

This data gets logged and stored for future integration with your CRM (Zoho).

## Technical Details

### Files Modified
| File | Change |
|------|--------|
| `public/favicon.ico` | DELETE this file |
| `index.html` | Title to "CWT - Community Water Test ORG", clean up Lovable meta tags |
| `src/components/LeadCapturePopup.tsx` | Redesign as eBook offer with name field, eBook cover mockup, updated copy |
| `src/lib/translations.ts` | Add/update popup translation keys for eBook offer (EN + ES) |

### Result
- Browser tab shows CWT logo + "CWT - Community Water Test ORG"
- Popup offers a compelling free eBook instead of generic "get information"
- Form collects Name + Email + ZIP + Phone (optional) for CRM/email follow-up
- Works in both English and Spanish

