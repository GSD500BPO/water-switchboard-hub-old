

# Fix Footer Logo + Update Favicon

## Problem
The footer logo shows as a **white square** because the CSS filter `brightness-0 invert` is blanking out the uploaded CWT logo image. The favicon also still shows the default Lovable icon.

## Changes

### 1. Copy the CWT logo for the favicon
- Copy `user-uploads://image-19.png` to `public/favicon.png` (for the favicon, needs to be in public/)

### 2. Update the favicon in `index.html`
- Replace the default `<link rel="icon" href="/favicon.ico">` with `<link rel="icon" href="/favicon.png" type="image/png">`
- Also update the page title from "Lovable App" to "Community Water Test"

### 3. Fix the footer logo in `src/components/layout/Footer.tsx`
- Remove the `brightness-0 invert` CSS filter that's turning the logo into a white square
- The logo should display naturally against the dark navy footer background
- Keep the size at `h-24 md:h-32`

**Line 29 change:**
```
Before: className="h-24 md:h-32 w-auto brightness-0 invert"
After:  className="h-24 md:h-32 w-auto"
```

## Files Modified
| File | Change |
|------|--------|
| `public/favicon.png` | New file - CWT logo for favicon |
| `index.html` | Update favicon reference + page title |
| `src/components/layout/Footer.tsx` | Remove `brightness-0 invert` filter from logo |

