
# Fix Plan: Footer Logo, Yamily Display, and Missing Routes

## Issues Identified

Based on my investigation, here are the **3 real problems**:

### Problem 1: Yamily's Card Only Shows in "Dealer Mode"
**File:** `src/pages/ScheduleTest.tsx` (line 94)

The current code has this condition:
```typescript
{isDealerMode && dealer?.id === "yamily-acosta" && (
  // Yamily's card...
)}
```

This means Yamily ONLY appears if:
1. The user is detected as being in Utah (via IP geolocation)
2. OR they came from a special QR code URL with `?source=UTAH` parameter

**Since you're likely not accessing from Utah**, Yamily never shows!

**Fix:** Show Yamily's "Specialist of the Month" card to ALL visitors, not just Utah dealer mode.

---

### Problem 2: Footer Logo IS Updated - But Might Be Cached
**File:** `src/components/layout/Footer.tsx` (lines 27-31)

The code IS correct with the bigger logo:
```typescript
<img 
  src={cwtLogo} 
  alt="Community Water Test" 
  className="h-24 md:h-32 w-auto brightness-0 invert" 
/>
```

**BUT:** You're on route `/tests/:testId` which is hitting a 404 error. You may not be seeing the actual footer at all because the page shows "Not Found".

---

### Problem 3: Missing Route `/water-testing`
**Console Error:** `404 Error: User attempted to access non-existent route: /water-testing`

The navigation links to `/water-testing` but this route doesn't exist in `App.tsx`. Only `/water-quality/:zip` exists.

---

## Fixes Required

### Fix 1: Show Yamily to ALL Visitors
**File:** `src/pages/ScheduleTest.tsx`

Remove the dealer mode condition - show Yamily as "Specialist of the Month" to everyone:

```text
Before (line 94):
{isDealerMode && dealer?.id === "yamily-acosta" && (

After:
{/* Always show our featured specialist */ }
```

Simply remove the conditional wrapper entirely so the Yamily card always displays.

---

### Fix 2: Add Missing `/water-testing` Route
**File:** `src/App.tsx`

Add a redirect or page for `/water-testing`:

```typescript
// Add import
import { Navigate } from "react-router-dom";

// Add route (redirects to homepage for now)
<Route path="/water-testing" element={<Navigate to="/" replace />} />
```

Or create a proper WaterTesting page if needed.

---

### Fix 3: Verify Footer on Actual Pages
Navigate to `/schedule-test` or `/` (homepage) to verify the footer logo is showing at `h-24 md:h-32` size.

---

## Summary Table

| Issue | File | Current State | Fix |
|-------|------|---------------|-----|
| Yamily not showing | `ScheduleTest.tsx` | Conditional on dealer mode | Remove condition - show always |
| Footer logo | `Footer.tsx` | Code is correct (`h-24 md:h-32`) | Test on working page (not 404) |
| 404 on /water-testing | `App.tsx` | Route missing | Add route or redirect |
| 404 on /tests/:testId | Current route | No TestDetail for this ID | Navigate to valid page |

---

## Files to Modify

1. **`src/pages/ScheduleTest.tsx`** - Remove `isDealerMode` condition around Yamily card
2. **`src/App.tsx`** - Add `/water-testing` route

---

## Result After Fix

- Yamily Acosta's photo and bio will appear on `/schedule-test` for ALL visitors
- Footer will show the large CWT logo (h-24/h-32) on all pages
- No more 404 errors on `/water-testing` navigation
