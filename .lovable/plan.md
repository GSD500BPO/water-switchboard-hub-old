

# Fix: Remove Dead Nav Links + Make Yamily's Photo Big

## What's Wrong

1. **"Filtros" and "Acerca de"** are in the header and footer navigation but go nowhere useful (redirect to homepage). They need to be removed entirely.
2. **Yamily's photo is tiny** -- it's only 96x96 pixels (w-24 h-24). The card layout puts her photo as a small circle next to text. It needs to be a **large, prominent feature** so visitors immediately see their water specialist.

## Changes

### 1. Remove "Filtros" and "Acerca de" from Header Navigation
**File: `src/components/layout/Header.tsx`**

Remove these two items from the `navLinks` array (lines 17-22):

**Before:**
```
navLinks = [
  { href: "/water-testing", label: t("nav.waterTesting") },
  { href: "/filters", label: t("nav.filters") },
  { href: "/scam-alerts", label: t("nav.scamAlerts") },
  { href: "/about", label: t("nav.about") },
];
```

**After:**
```
navLinks = [
  { href: "/schedule-test", label: t("nav.waterTesting") },
  { href: "/scam-alerts", label: t("nav.scamAlerts") },
];
```

This also fixes "Pruebas de Agua" / "Water Testing" to link directly to `/schedule-test` instead of `/water-testing` (which just redirects anyway).

---

### 2. Clean Up Footer Links
**File: `src/components/layout/Footer.tsx`**

Remove "Filtros" from the quick links (lines 8-12):

**Before:**
```
quickLinks = [
  { href: "/water-testing", label: t("nav.waterTesting") },
  { href: "/filters", label: t("nav.filters") },
  { href: "/scam-alerts", label: t("nav.scamAlerts") },
];
```

**After:**
```
quickLinks = [
  { href: "/schedule-test", label: t("nav.waterTesting") },
  { href: "/scam-alerts", label: t("nav.scamAlerts") },
];
```

---

### 3. Make Yamily's Photo Big and Prominent
**File: `src/pages/ScheduleTest.tsx`**

Redesign the Yamily card from a small inline layout to a **large featured section** with a big photo:

- Change from `w-24 h-24` (96px) to `w-40 h-40 md:w-48 md:h-48` (160-192px)
- Stack layout vertically: big photo on top, centered, with name/bio below
- Add the "Specialist of the Month" badge prominently
- Keep the CWT logo badge and EPA verification

The card will go from a small side-by-side design to a centered, eye-catching feature card that makes Yamily the focal point of the right column.

---

## Technical Details

### Files Modified
| File | Change |
|------|--------|
| `src/components/layout/Header.tsx` | Remove "Filtros" and "Acerca de" nav links, fix Water Testing href |
| `src/components/layout/Footer.tsx` | Remove "Filtros" from quick links, fix Water Testing href |
| `src/pages/ScheduleTest.tsx` | Redesign Yamily card with large centered photo |

### Result After Fix
- Navigation only shows: Water Testing + Scam Alerts + CTA button
- No more dead links in header or footer
- Yamily's photo displays large and centered on the Schedule Test page
- Works in both English and Spanish
