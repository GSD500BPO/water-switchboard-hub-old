

# Utah Dealer System - Yamily Acosta Implementation

## Overview

This plan creates a dynamic dealer detection system that identifies visitors from Utah (via QR code, IP geo-location, or ZIP code) and shows them a customized "branded but anonymous" experience with lead routing to Yamily Acosta through Zoho CRM.

---

## Key Business Logic

```text
Visitor arrives at communitywatertestusa.com
              |
              v
    Has URL param "Lead Source UTAH Yamily ESP"?
              |
         YES -+-> Set dealer mode = Yamily
              |   - Skip lead capture popup
              |   - Track QR scan attribution
              |
             NO
              |
              v
    Is visitor IP from Utah? (geo-detection API)
              |
         YES -+-> Set dealer mode = Yamily
              |   - Show lead capture popup (collect info)
              |
             NO
              |
              v
    User enters Utah ZIP (84xxx)?
              |
         YES -+-> Set dealer mode = Yamily
              |
             NO
              |
              v
    Default experience with pricing + order kits
```

---

## What Changes for Utah/Yamily Visitors

| Feature | Default Site | Yamily Mode |
|---------|-------------|-------------|
| Pricing on test cards | Shown ($49, $39, etc.) | Hidden |
| "Add to Cart" button | Shown | Hidden |
| "Order Kit" button | Shown | Hidden |
| "Your Local Expert" badge | Not shown | Shown (anonymous branded) |
| Lead destination | General pool | Zoho CRM via webhook |
| Language | User choice | Spanish default |
| Social proof videos | Not shown | Facebook embed carousel |
| Trust badges | Generic EPA | Puronics + verified badges |

---

## Files to Create

### 1. Dealer Context (`src/contexts/DealerContext.tsx`)
- Detects dealer from URL params, IP, or ZIP
- Uses free geo-API (ip-api.com) for Utah detection
- Stores dealer state in sessionStorage
- Provides `isDealerMode`, `dealer`, and `detectFromZip()` functions

### 2. Dealer Data (`src/data/dealerData.ts`)
- Yamily Acosta profile (branded but anonymous display)
- Utah ZIP ranges (84001-84791)
- QR parameter mapping
- Zoho CRM webhook configuration placeholder

### 3. Dealer Expert Card (`src/components/home/DealerExpertCard.tsx`)
- "Your Local Expert" card (no name/face shown)
- Trust badges: "Verified", "EPA Certified"
- "Request Free Test" CTA button
- Puronics authorized dealer badge

### 4. Facebook Video Carousel (`src/components/home/DealerVideos.tsx`)
- Embedded Facebook reel player
- Shows Yamily's customer testimonial videos
- Responsive carousel for mobile

### 5. Utah Water Data (update `src/data/waterQualityData.ts`)
- Add Salt Lake City, Provo, Ogden, West Valley, Sandy, St. George, Layton, West Jordan ZIPs
- Utah-specific contaminant profile (hard water, arsenic concerns)

---

## Files to Modify

### 1. `src/pages/Index.tsx`
- Wrap with DealerContext detection
- Conditionally show DealerExpertCard
- Suppress popup when from QR (already done, enhance)

### 2. `src/components/home/WaterTestingServices.tsx`
- Hide prices when `isDealerMode` is true
- Hide "Add to Cart" buttons
- Hide "Order Kit" button
- Show "Request Free Test" instead
- Add Yamily's videos section at bottom

### 3. `src/components/LeadCapturePopup.tsx`
- Add lead source field (hidden, from dealer context)
- Add webhook call to Zoho CRM endpoint
- Store locally in DB as backup

### 4. `src/App.tsx`
- Wrap with DealerProvider

### 5. `src/lib/translations.ts`
- Add dealer-specific translation keys

---

## Database & CRM Integration

### Supabase Tables (to be created)

**leads** table:
- id (uuid)
- email
- phone
- zip
- dealer_id (nullable)
- lead_source (e.g., "Lead Source UTAH Yamily ESP")
- created_at
- synced_to_crm (boolean)

**dealers** table:
- id (uuid)
- name (Yamily Acosta)
- region (Utah)
- zips_covered (array or range)
- crm_webhook_url
- is_active
- created_at

### Zoho CRM Integration

Edge function: `supabase/functions/zoho-webhook/index.ts`
- Accepts lead data from frontend
- Posts to Zoho CRM webhook endpoint
- Stores in Supabase as backup
- Returns success/failure

Required secrets:
- ZOHO_WEBHOOK_URL (Zoho form webhook URL)

---

## Video Embedding Approach

Facebook does not allow direct embedding of Reels. Options:

**Option A (Recommended):** Use Facebook's oEmbed API
- Server-side fetch of embed HTML
- Display in iframe container

**Option B:** Download videos and host locally
- Ask Yamily for original video files
- Upload to project assets
- Better performance, full control

**Option C:** Link to Facebook
- Show video thumbnails
- Open Facebook in new tab when clicked

---

## Technical Implementation Details

### Dealer Detection Flow

```typescript
// In DealerContext
const detectDealer = async () => {
  // 1. Check URL params first (highest priority)
  const params = new URLSearchParams(window.location.search);
  const leadSource = params.get('source');
  
  if (leadSource === 'Lead Source UTAH Yamily ESP' || 
      leadSource?.includes('UTAH') || 
      leadSource?.includes('Yamily')) {
    return setDealer('yamily', 'qr');
  }
  
  // 2. Check IP geolocation
  try {
    const res = await fetch('https://ip-api.com/json/?fields=regionName');
    const data = await res.json();
    if (data.regionName === 'Utah') {
      return setDealer('yamily', 'ip');
    }
  } catch (e) {
    console.log('Geo detection failed');
  }
  
  // 3. No dealer - default experience
  return null;
};
```

### Modified Test Cards (Dealer Mode)

```tsx
// WaterTestingServices.tsx - conditional rendering
{!isDealerMode && (
  <>
    <p className="text-2xl font-bold">{test.price}</p>
    <Button>Add to Cart</Button>
  </>
)}
{isDealerMode && (
  <Button variant="secondary">
    Learn More
  </Button>
)}
```

---

## Utah ZIP Codes to Add

| City | ZIP Range | Population Focus |
|------|-----------|------------------|
| Salt Lake City | 84101-84199 | Primary metro |
| Provo | 84601-84606 | University area |
| Ogden | 84401-84415 | Northern Utah |
| West Valley City | 84119-84120 | Suburban |
| Sandy | 84070, 84092 | Family suburbs |
| St. George | 84770-84791 | Southern Utah |
| Layton | 84041 | Davis County |
| West Jordan | 84084, 84088 | Salt Lake suburb |
| Orem | 84057-84059 | Utah County |
| Lehi | 84043 | Tech corridor |

---

## QR Code Link Format

Yamily will use this exact URL for her QR codes:

```text
https://communitywatertestusa.com?source=Lead%20Source%20UTAH%20Yamily%20ESP
```

Optional campaign tracking:
```text
https://communitywatertestusa.com?source=Lead%20Source%20UTAH%20Yamily%20ESP&campaign_id=door-hanger-feb
```

---

## Admin Dashboard (Future Phase)

Once Supabase is connected, build:

1. **Dealer Management**
   - Add/remove dealers
   - Set coverage areas by ZIP
   - Enable/disable dealer status

2. **Lead Tracking**
   - View all leads by dealer
   - Filter by date, source, status
   - Export to CSV

3. **SEO Territory Management**
   - Mark cities as "purchased" by dealer
   - Enable SEO content only for purchased territories
   - Track which ZIPs drive traffic

---

## Implementation Order

1. **Enable Supabase/Lovable Cloud** - Required for database + CRM webhook
2. Create dealer data file with Yamily's info
3. Create DealerContext with detection logic
4. Add Utah ZIPs to water quality data
5. Create DealerExpertCard component (anonymous branded)
6. Modify WaterTestingServices for dealer mode
7. Update LeadCapturePopup with CRM webhook
8. Create video section (thumbnails linking to Facebook initially)
9. Add Zoho webhook edge function
10. Test full flow with QR parameter

---

## Assets Needed from You

Before implementation, please provide:

1. **Zoho CRM Webhook URL** - The endpoint where leads should be sent
2. **Yamily's business contact info** (for backend routing, not public display):
   - Phone number
   - Email address
3. **Video hosting decision** - Should we link to Facebook or host videos locally?
4. **Profile image selection** - Which of the uploaded photos should be used for testimonials/trust building?

---

## Security Considerations

- Dealer info stored in frontend is non-sensitive (no personal contact exposed)
- Lead data sent to Supabase with RLS policies
- Zoho webhook called server-side only (edge function)
- No API keys exposed in frontend code

