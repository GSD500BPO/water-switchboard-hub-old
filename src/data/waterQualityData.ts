// Water Quality Data for US Cities and ZIP Codes
// This local database provides realistic water quality data for major metros

export interface ContaminantData {
  name: string;
  level: number;
  safeLimit: number;
  unit: string;
  status: "safe" | "elevated" | "high";
}

export interface WaterQualityData {
  zip: string;
  city: string;
  state: string;
  region: string;
  sourceType: "Municipal" | "Well" | "Mixed";
  hardnessLevel: "Soft" | "Moderate" | "Hard" | "Very Hard";
  overallRating: "Excellent" | "Good" | "Fair" | "Poor";
  contaminants: ContaminantData[];
  lastUpdated: string;
}

export interface CityInfo {
  city: string;
  state: string;
  region: "northeast" | "southeast" | "midwest" | "southwest" | "west";
}

// ZIP code to city mapping - 100+ major metros
export const zipToCity: Record<string, CityInfo> = {
  // California
  "90210": { city: "Beverly Hills", state: "CA", region: "west" },
  "90001": { city: "Los Angeles", state: "CA", region: "west" },
  "90012": { city: "Los Angeles", state: "CA", region: "west" },
  "90045": { city: "Los Angeles", state: "CA", region: "west" },
  "90802": { city: "Long Beach", state: "CA", region: "west" },
  "94102": { city: "San Francisco", state: "CA", region: "west" },
  "94110": { city: "San Francisco", state: "CA", region: "west" },
  "94117": { city: "San Francisco", state: "CA", region: "west" },
  "92101": { city: "San Diego", state: "CA", region: "west" },
  "92103": { city: "San Diego", state: "CA", region: "west" },
  "95814": { city: "Sacramento", state: "CA", region: "west" },
  "95818": { city: "Sacramento", state: "CA", region: "west" },
  "95350": { city: "Modesto", state: "CA", region: "west" },
  "93301": { city: "Bakersfield", state: "CA", region: "west" },
  "92612": { city: "Irvine", state: "CA", region: "west" },
  "91101": { city: "Pasadena", state: "CA", region: "west" },
  "94501": { city: "Alameda", state: "CA", region: "west" },
  "94601": { city: "Oakland", state: "CA", region: "west" },
  "95112": { city: "San Jose", state: "CA", region: "west" },
  
  // Texas
  "77001": { city: "Houston", state: "TX", region: "southwest" },
  "77002": { city: "Houston", state: "TX", region: "southwest" },
  "77030": { city: "Houston", state: "TX", region: "southwest" },
  "77056": { city: "Houston", state: "TX", region: "southwest" },
  "75201": { city: "Dallas", state: "TX", region: "southwest" },
  "75202": { city: "Dallas", state: "TX", region: "southwest" },
  "75205": { city: "Dallas", state: "TX", region: "southwest" },
  "78701": { city: "Austin", state: "TX", region: "southwest" },
  "78702": { city: "Austin", state: "TX", region: "southwest" },
  "78704": { city: "Austin", state: "TX", region: "southwest" },
  "78205": { city: "San Antonio", state: "TX", region: "southwest" },
  "78209": { city: "San Antonio", state: "TX", region: "southwest" },
  "76102": { city: "Fort Worth", state: "TX", region: "southwest" },
  "79901": { city: "El Paso", state: "TX", region: "southwest" },
  
  // Florida
  "33101": { city: "Miami", state: "FL", region: "southeast" },
  "33109": { city: "Miami Beach", state: "FL", region: "southeast" },
  "33130": { city: "Miami", state: "FL", region: "southeast" },
  "33139": { city: "Miami Beach", state: "FL", region: "southeast" },
  "33602": { city: "Tampa", state: "FL", region: "southeast" },
  "33606": { city: "Tampa", state: "FL", region: "southeast" },
  "32801": { city: "Orlando", state: "FL", region: "southeast" },
  "32803": { city: "Orlando", state: "FL", region: "southeast" },
  "32202": { city: "Jacksonville", state: "FL", region: "southeast" },
  "33401": { city: "West Palm Beach", state: "FL", region: "southeast" },
  "34102": { city: "Naples", state: "FL", region: "southeast" },
  
  // New York
  "10001": { city: "New York", state: "NY", region: "northeast" },
  "10002": { city: "New York", state: "NY", region: "northeast" },
  "10003": { city: "New York", state: "NY", region: "northeast" },
  "10010": { city: "New York", state: "NY", region: "northeast" },
  "10021": { city: "New York", state: "NY", region: "northeast" },
  "10036": { city: "New York", state: "NY", region: "northeast" },
  "10128": { city: "New York", state: "NY", region: "northeast" },
  "11201": { city: "Brooklyn", state: "NY", region: "northeast" },
  "11211": { city: "Brooklyn", state: "NY", region: "northeast" },
  "14201": { city: "Buffalo", state: "NY", region: "northeast" },
  "12203": { city: "Albany", state: "NY", region: "northeast" },
  "10601": { city: "White Plains", state: "NY", region: "northeast" },
  
  // Illinois
  "60601": { city: "Chicago", state: "IL", region: "midwest" },
  "60602": { city: "Chicago", state: "IL", region: "midwest" },
  "60611": { city: "Chicago", state: "IL", region: "midwest" },
  "60614": { city: "Chicago", state: "IL", region: "midwest" },
  "60657": { city: "Chicago", state: "IL", region: "midwest" },
  "60661": { city: "Chicago", state: "IL", region: "midwest" },
  
  // Arizona
  "85001": { city: "Phoenix", state: "AZ", region: "southwest" },
  "85004": { city: "Phoenix", state: "AZ", region: "southwest" },
  "85016": { city: "Phoenix", state: "AZ", region: "southwest" },
  "85251": { city: "Scottsdale", state: "AZ", region: "southwest" },
  "85701": { city: "Tucson", state: "AZ", region: "southwest" },
  
  // Colorado
  "80202": { city: "Denver", state: "CO", region: "west" },
  "80203": { city: "Denver", state: "CO", region: "west" },
  "80206": { city: "Denver", state: "CO", region: "west" },
  "80301": { city: "Boulder", state: "CO", region: "west" },
  "80903": { city: "Colorado Springs", state: "CO", region: "west" },
  
  // Washington
  "98101": { city: "Seattle", state: "WA", region: "west" },
  "98102": { city: "Seattle", state: "WA", region: "west" },
  "98109": { city: "Seattle", state: "WA", region: "west" },
  "98104": { city: "Seattle", state: "WA", region: "west" },
  "98201": { city: "Everett", state: "WA", region: "west" },
  
  // Massachusetts
  "02101": { city: "Boston", state: "MA", region: "northeast" },
  "02108": { city: "Boston", state: "MA", region: "northeast" },
  "02116": { city: "Boston", state: "MA", region: "northeast" },
  "02139": { city: "Cambridge", state: "MA", region: "northeast" },
  
  // Georgia
  "30301": { city: "Atlanta", state: "GA", region: "southeast" },
  "30303": { city: "Atlanta", state: "GA", region: "southeast" },
  "30305": { city: "Atlanta", state: "GA", region: "southeast" },
  "30309": { city: "Atlanta", state: "GA", region: "southeast" },
  
  // Michigan
  "48201": { city: "Detroit", state: "MI", region: "midwest" },
  "48202": { city: "Detroit", state: "MI", region: "midwest" },
  "48226": { city: "Detroit", state: "MI", region: "midwest" },
  "48104": { city: "Ann Arbor", state: "MI", region: "midwest" },
  "49503": { city: "Grand Rapids", state: "MI", region: "midwest" },
  
  // Pennsylvania
  "19102": { city: "Philadelphia", state: "PA", region: "northeast" },
  "19103": { city: "Philadelphia", state: "PA", region: "northeast" },
  "19106": { city: "Philadelphia", state: "PA", region: "northeast" },
  "15222": { city: "Pittsburgh", state: "PA", region: "northeast" },
  
  // Ohio
  "43215": { city: "Columbus", state: "OH", region: "midwest" },
  "44113": { city: "Cleveland", state: "OH", region: "midwest" },
  "45202": { city: "Cincinnati", state: "OH", region: "midwest" },
  
  // North Carolina
  "27601": { city: "Raleigh", state: "NC", region: "southeast" },
  "28202": { city: "Charlotte", state: "NC", region: "southeast" },
  "27701": { city: "Durham", state: "NC", region: "southeast" },
  
  // Nevada
  "89101": { city: "Las Vegas", state: "NV", region: "southwest" },
  "89109": { city: "Las Vegas", state: "NV", region: "southwest" },
  "89501": { city: "Reno", state: "NV", region: "southwest" },
  
  // Oregon
  "97201": { city: "Portland", state: "OR", region: "west" },
  "97204": { city: "Portland", state: "OR", region: "west" },
  "97401": { city: "Eugene", state: "OR", region: "west" },
  
  // Minnesota
  "55401": { city: "Minneapolis", state: "MN", region: "midwest" },
  "55102": { city: "St. Paul", state: "MN", region: "midwest" },
  
  // Virginia
  "22202": { city: "Arlington", state: "VA", region: "southeast" },
  "23219": { city: "Richmond", state: "VA", region: "southeast" },
  
  // DC
  "20001": { city: "Washington", state: "DC", region: "northeast" },
  "20002": { city: "Washington", state: "DC", region: "northeast" },
  "20036": { city: "Washington", state: "DC", region: "northeast" },
  
  // Tennessee
  "37201": { city: "Nashville", state: "TN", region: "southeast" },
  "38103": { city: "Memphis", state: "TN", region: "southeast" },
  
  // Missouri
  "63101": { city: "St. Louis", state: "MO", region: "midwest" },
  "64105": { city: "Kansas City", state: "MO", region: "midwest" },
  
  // Maryland
  "21201": { city: "Baltimore", state: "MD", region: "northeast" },
  "20814": { city: "Bethesda", state: "MD", region: "northeast" },
  
  // Wisconsin
  "53202": { city: "Milwaukee", state: "WI", region: "midwest" },
  "53703": { city: "Madison", state: "WI", region: "midwest" },
  
  // Indiana
  "46202": { city: "Indianapolis", state: "IN", region: "midwest" },
  
  // Louisiana
  "70112": { city: "New Orleans", state: "LA", region: "southeast" },
  "70130": { city: "New Orleans", state: "LA", region: "southeast" },
  
  // Utah - Yamily Acosta territory
  "84101": { city: "Salt Lake City", state: "UT", region: "west" },
  "84102": { city: "Salt Lake City", state: "UT", region: "west" },
  "84103": { city: "Salt Lake City", state: "UT", region: "west" },
  "84104": { city: "Salt Lake City", state: "UT", region: "west" },
  "84105": { city: "Salt Lake City", state: "UT", region: "west" },
  "84111": { city: "Salt Lake City", state: "UT", region: "west" },
  "84116": { city: "Salt Lake City", state: "UT", region: "west" },
  "84601": { city: "Provo", state: "UT", region: "west" },
  "84604": { city: "Provo", state: "UT", region: "west" },
  "84606": { city: "Provo", state: "UT", region: "west" },
  "84401": { city: "Ogden", state: "UT", region: "west" },
  "84403": { city: "Ogden", state: "UT", region: "west" },
  "84119": { city: "West Valley City", state: "UT", region: "west" },
  "84120": { city: "West Valley City", state: "UT", region: "west" },
  "84070": { city: "Sandy", state: "UT", region: "west" },
  "84092": { city: "Sandy", state: "UT", region: "west" },
  "84770": { city: "St. George", state: "UT", region: "west" },
  "84790": { city: "St. George", state: "UT", region: "west" },
  "84041": { city: "Layton", state: "UT", region: "west" },
  "84084": { city: "West Jordan", state: "UT", region: "west" },
  "84088": { city: "West Jordan", state: "UT", region: "west" },
  "84057": { city: "Orem", state: "UT", region: "west" },
  "84043": { city: "Lehi", state: "UT", region: "west" },
  "84095": { city: "South Jordan", state: "UT", region: "west" },
  "84020": { city: "Draper", state: "UT", region: "west" },
};

// State to region mapping for fallback
export const stateToRegion: Record<string, "northeast" | "southeast" | "midwest" | "southwest" | "west"> = {
  // Northeast
  "CT": "northeast", "ME": "northeast", "MA": "northeast", "NH": "northeast",
  "NJ": "northeast", "NY": "northeast", "PA": "northeast", "RI": "northeast",
  "VT": "northeast", "DC": "northeast", "MD": "northeast", "DE": "northeast",
  // Southeast
  "AL": "southeast", "FL": "southeast", "GA": "southeast", "KY": "southeast",
  "LA": "southeast", "MS": "southeast", "NC": "southeast", "SC": "southeast",
  "TN": "southeast", "VA": "southeast", "WV": "southeast", "AR": "southeast",
  // Midwest
  "IL": "midwest", "IN": "midwest", "IA": "midwest", "KS": "midwest",
  "MI": "midwest", "MN": "midwest", "MO": "midwest", "NE": "midwest",
  "ND": "midwest", "OH": "midwest", "SD": "midwest", "WI": "midwest",
  // Southwest
  "AZ": "southwest", "NM": "southwest", "NV": "southwest", "OK": "southwest",
  "TX": "southwest",
  // West
  "AK": "west", "CA": "west", "CO": "west", "HI": "west",
  "ID": "west", "MT": "west", "OR": "west", "UT": "west",
  "WA": "west", "WY": "west",
};

// Regional contaminant profiles based on real-world patterns
interface RegionalProfile {
  sourceType: "Municipal" | "Well" | "Mixed";
  hardness: "Soft" | "Moderate" | "Hard" | "Very Hard";
  contaminants: {
    name: string;
    baseLevel: number;
    variance: number;
    safeLimit: number;
    unit: string;
  }[];
}

const regionProfiles: Record<string, RegionalProfile> = {
  northeast: {
    sourceType: "Municipal",
    hardness: "Moderate",
    contaminants: [
      { name: "Lead", baseLevel: 8.5, variance: 4, safeLimit: 15, unit: "ppb" },
      { name: "Chlorine", baseLevel: 1.8, variance: 0.5, safeLimit: 4, unit: "ppm" },
      { name: "PFAS", baseLevel: 8, variance: 6, safeLimit: 4, unit: "ppt" },
      { name: "Arsenic", baseLevel: 2.5, variance: 1, safeLimit: 10, unit: "ppb" },
      { name: "Nitrate", baseLevel: 3.2, variance: 1.5, safeLimit: 10, unit: "ppm" },
      { name: "Chromium-6", baseLevel: 0.8, variance: 0.4, safeLimit: 10, unit: "ppb" },
      { name: "Fluoride", baseLevel: 0.9, variance: 0.3, safeLimit: 4, unit: "ppm" },
    ],
  },
  southeast: {
    sourceType: "Municipal",
    hardness: "Soft",
    contaminants: [
      { name: "Lead", baseLevel: 4.2, variance: 2, safeLimit: 15, unit: "ppb" },
      { name: "Chlorine", baseLevel: 2.1, variance: 0.6, safeLimit: 4, unit: "ppm" },
      { name: "PFAS", baseLevel: 6, variance: 4, safeLimit: 4, unit: "ppt" },
      { name: "Arsenic", baseLevel: 1.8, variance: 0.8, safeLimit: 10, unit: "ppb" },
      { name: "Nitrate", baseLevel: 4.5, variance: 2, safeLimit: 10, unit: "ppm" },
      { name: "THMs", baseLevel: 45, variance: 20, safeLimit: 80, unit: "ppb" },
      { name: "Fluoride", baseLevel: 0.7, variance: 0.2, safeLimit: 4, unit: "ppm" },
    ],
  },
  midwest: {
    sourceType: "Municipal",
    hardness: "Hard",
    contaminants: [
      { name: "Lead", baseLevel: 6.8, variance: 3, safeLimit: 15, unit: "ppb" },
      { name: "Chlorine", baseLevel: 1.5, variance: 0.4, safeLimit: 4, unit: "ppm" },
      { name: "PFAS", baseLevel: 10, variance: 8, safeLimit: 4, unit: "ppt" },
      { name: "Arsenic", baseLevel: 3.2, variance: 1.5, safeLimit: 10, unit: "ppb" },
      { name: "Nitrate", baseLevel: 7.5, variance: 2, safeLimit: 10, unit: "ppm" },
      { name: "Atrazine", baseLevel: 0.8, variance: 0.5, safeLimit: 3, unit: "ppb" },
      { name: "Fluoride", baseLevel: 1.1, variance: 0.3, safeLimit: 4, unit: "ppm" },
    ],
  },
  southwest: {
    sourceType: "Mixed",
    hardness: "Very Hard",
    contaminants: [
      { name: "Lead", baseLevel: 3.5, variance: 2, safeLimit: 15, unit: "ppb" },
      { name: "Chlorine", baseLevel: 1.9, variance: 0.5, safeLimit: 4, unit: "ppm" },
      { name: "PFAS", baseLevel: 5, variance: 3, safeLimit: 4, unit: "ppt" },
      { name: "Arsenic", baseLevel: 7.8, variance: 2, safeLimit: 10, unit: "ppb" },
      { name: "Nitrate", baseLevel: 5.8, variance: 2, safeLimit: 10, unit: "ppm" },
      { name: "Uranium", baseLevel: 12, variance: 6, safeLimit: 30, unit: "ppb" },
      { name: "Fluoride", baseLevel: 1.8, variance: 0.5, safeLimit: 4, unit: "ppm" },
    ],
  },
  west: {
    sourceType: "Municipal",
    hardness: "Moderate",
    contaminants: [
      { name: "Lead", baseLevel: 2.5, variance: 1.5, safeLimit: 15, unit: "ppb" },
      { name: "Chlorine", baseLevel: 1.2, variance: 0.4, safeLimit: 4, unit: "ppm" },
      { name: "PFAS", baseLevel: 12, variance: 8, safeLimit: 4, unit: "ppt" },
      { name: "Arsenic", baseLevel: 4.5, variance: 2, safeLimit: 10, unit: "ppb" },
      { name: "Nitrate", baseLevel: 4.2, variance: 1.5, safeLimit: 10, unit: "ppm" },
      { name: "Chromium-6", baseLevel: 1.2, variance: 0.6, safeLimit: 10, unit: "ppb" },
      { name: "Fluoride", baseLevel: 0.8, variance: 0.2, safeLimit: 4, unit: "ppm" },
    ],
  },
};

// Generate deterministic "random" variance based on ZIP
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 100) / 100;
}

function getContaminantStatus(level: number, safeLimit: number): "safe" | "elevated" | "high" {
  const ratio = level / safeLimit;
  if (ratio <= 0.5) return "safe";
  if (ratio <= 1) return "elevated";
  return "high";
}

function calculateOverallRating(contaminants: ContaminantData[]): "Excellent" | "Good" | "Fair" | "Poor" {
  const hasHigh = contaminants.some(c => c.status === "high");
  const elevatedCount = contaminants.filter(c => c.status === "elevated").length;
  
  if (hasHigh) return "Poor";
  if (elevatedCount >= 3) return "Fair";
  if (elevatedCount >= 1) return "Good";
  return "Excellent";
}

export function getWaterQualityByZip(zip: string): WaterQualityData {
  const cityInfo = zipToCity[zip];
  
  if (cityInfo) {
    // Known ZIP code
    const profile = regionProfiles[cityInfo.region];
    const seed = zip;
    
    const contaminants: ContaminantData[] = profile.contaminants.map((c, index) => {
      const variance = (seededRandom(seed + index.toString()) - 0.5) * 2 * c.variance;
      const level = Math.max(0, Math.round((c.baseLevel + variance) * 10) / 10);
      
      return {
        name: c.name,
        level,
        safeLimit: c.safeLimit,
        unit: c.unit,
        status: getContaminantStatus(level, c.safeLimit),
      };
    });
    
    return {
      zip,
      city: cityInfo.city,
      state: cityInfo.state,
      region: cityInfo.region,
      sourceType: profile.sourceType,
      hardnessLevel: profile.hardness,
      overallRating: calculateOverallRating(contaminants),
      contaminants,
      lastUpdated: "January 2026",
    };
  }
  
  // Unknown ZIP - try to determine region from state
  // First two digits of ZIP can help determine state/region
  const zipPrefix = zip.substring(0, 2);
  let region: "northeast" | "southeast" | "midwest" | "southwest" | "west" = "midwest"; // default
  let estimatedState = "Unknown";
  
  // ZIP prefix to region mapping (simplified)
  const prefixNum = parseInt(zipPrefix, 10);
  if (prefixNum >= 0 && prefixNum <= 9) { region = "northeast"; estimatedState = "Northeast"; }
  else if (prefixNum >= 10 && prefixNum <= 19) { region = "northeast"; estimatedState = "Northeast"; }
  else if (prefixNum >= 20 && prefixNum <= 29) { region = "southeast"; estimatedState = "Southeast"; }
  else if (prefixNum >= 30 && prefixNum <= 39) { region = "southeast"; estimatedState = "Southeast"; }
  else if (prefixNum >= 40 && prefixNum <= 49) { region = "midwest"; estimatedState = "Midwest"; }
  else if (prefixNum >= 50 && prefixNum <= 59) { region = "midwest"; estimatedState = "Midwest"; }
  else if (prefixNum >= 60 && prefixNum <= 69) { region = "midwest"; estimatedState = "Midwest"; }
  else if (prefixNum >= 70 && prefixNum <= 79) { region = "southwest"; estimatedState = "Southwest"; }
  else if (prefixNum >= 80 && prefixNum <= 89) { region = "west"; estimatedState = "West"; }
  else if (prefixNum >= 90 && prefixNum <= 99) { region = "west"; estimatedState = "West"; }
  
  const profile = regionProfiles[region];
  const seed = zip;
  
  const contaminants: ContaminantData[] = profile.contaminants.map((c, index) => {
    const variance = (seededRandom(seed + index.toString()) - 0.5) * 2 * c.variance;
    const level = Math.max(0, Math.round((c.baseLevel + variance) * 10) / 10);
    
    return {
      name: c.name,
      level,
      safeLimit: c.safeLimit,
      unit: c.unit,
      status: getContaminantStatus(level, c.safeLimit),
    };
  });
  
  return {
    zip,
    city: `${estimatedState} Region`,
    state: estimatedState,
    region,
    sourceType: profile.sourceType,
    hardnessLevel: profile.hardness,
    overallRating: calculateOverallRating(contaminants),
    contaminants,
    lastUpdated: "January 2026",
  };
}

// Check if we have specific data for this ZIP
export function hasSpecificData(zip: string): boolean {
  return !!zipToCity[zip];
}
