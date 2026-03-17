import { getAllStates, getCitiesInState, getCompaniesByCity, getCompaniesByState, getAllCompanies } from "./companies";
import type { Company } from "./companies";

// ---------- Service definitions ----------

export const SERVICES = [
  { slug: "water-softener", key: "water_softener", label: "Water Softener Installation", shortLabel: "Water Softeners" },
  { slug: "reverse-osmosis", key: "reverse_osmosis", label: "Reverse Osmosis Systems", shortLabel: "Reverse Osmosis" },
  { slug: "whole-house-filtration", key: "whole_house_filtration", label: "Whole House Water Filtration", shortLabel: "Whole House Filters" },
  { slug: "alkaline-water", key: "alkaline_water", label: "Alkaline Water Systems", shortLabel: "Alkaline Water" },
  { slug: "uv-sterilization", key: "uv_sterilization", label: "UV Water Sterilization", shortLabel: "UV Sterilization" },
  { slug: "iron-removal", key: "iron_removal", label: "Iron & Manganese Removal", shortLabel: "Iron Removal" },
  { slug: "water-testing", key: "water_testing", label: "Water Quality Testing", shortLabel: "Water Testing" },
  { slug: "well-water", key: "well_water", label: "Well Water Treatment", shortLabel: "Well Water" },
  { slug: "commercial", key: "commercial", label: "Commercial Water Treatment", shortLabel: "Commercial" },
] as const;

export type ServiceDef = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCompaniesByService(stateSlug: string, citySlug: string, serviceKey: string): Company[] {
  return getCompaniesByCity(stateSlug, citySlug).filter((c) => c.services?.includes(serviceKey));
}

// ---------- Water problems for programmatic pages ----------

export const WATER_PROBLEMS = [
  {
    slug: "hard-water",
    title: "Hard Water Solutions",
    keyword: "hard water",
    description: "Hard water causes scale buildup in pipes, white spots on dishes, dry skin and hair, and reduces the lifespan of appliances like water heaters and dishwashers.",
    symptoms: ["White crusty deposits on faucets", "Spots on dishes and glassware", "Stiff, scratchy laundry", "Dry skin and hair after showering", "Reduced water heater efficiency"],
    solutions: ["water_softener", "whole_house_filtration"],
  },
  {
    slug: "chlorine-taste",
    title: "Chlorine Taste & Smell",
    keyword: "chlorine in tap water",
    description: "Municipal water treatment adds chlorine to kill bacteria, but residual chlorine causes an unpleasant taste and smell. Chlorine and its byproducts (THMs) may pose health risks with long-term exposure.",
    symptoms: ["Swimming pool taste or smell", "Dry, irritated skin", "Faded hair color", "Rubber gasket degradation"],
    solutions: ["whole_house_filtration", "reverse_osmosis"],
  },
  {
    slug: "lead-contamination",
    title: "Lead in Water",
    keyword: "lead in drinking water",
    description: "Lead enters water through aging pipes, solder, and fixtures. There is no safe level of lead exposure, especially for children. Homes built before 1986 are at highest risk.",
    symptoms: ["No visible symptoms — lead is invisible and odorless", "Only detected through water testing", "Health effects: developmental delays in children, kidney problems, high blood pressure"],
    solutions: ["reverse_osmosis", "whole_house_filtration"],
  },
  {
    slug: "iron-staining",
    title: "Iron & Rust in Water",
    keyword: "iron in water",
    description: "Dissolved iron causes orange-brown staining on fixtures, laundry, and toilets. It gives water a metallic taste and can clog pipes over time. Common in well water and areas with older infrastructure.",
    symptoms: ["Orange/brown stains in sinks and toilets", "Metallic taste", "Reddish-brown sediment", "Stained laundry", "Clogged pipes and appliances"],
    solutions: ["iron_removal", "whole_house_filtration"],
  },
  {
    slug: "bad-taste-odor",
    title: "Bad Tasting or Smelling Water",
    keyword: "bad tasting water",
    description: "Water with off-putting taste or odor — whether sulfur (rotten eggs), metallic, musty, or chemical — signals contaminants that may affect health. Professional testing identifies the exact cause.",
    symptoms: ["Rotten egg smell (hydrogen sulfide)", "Metallic or bitter taste", "Musty or earthy odor", "Chemical/bleach taste"],
    solutions: ["whole_house_filtration", "reverse_osmosis", "water_testing"],
  },
  {
    slug: "well-water-problems",
    title: "Well Water Contamination",
    keyword: "well water treatment",
    description: "Private wells aren't regulated by the EPA, so homeowners are responsible for testing and treatment. Common issues include bacteria, nitrates, iron, sulfur, and pesticide contamination.",
    symptoms: ["No municipal oversight or testing", "Bacteria (coliform, E. coli) risk", "Nitrate contamination near farmland", "Sulfur smell and iron staining", "Sediment and turbidity"],
    solutions: ["well_water", "uv_sterilization", "whole_house_filtration", "water_testing"],
  },
  {
    slug: "scale-buildup",
    title: "Scale Buildup in Pipes & Appliances",
    keyword: "scale buildup water",
    description: "Mineral scale from hard water accumulates inside pipes, water heaters, dishwashers, and washing machines, reducing efficiency and causing premature failure. Scale can reduce water heater efficiency by up to 30%.",
    symptoms: ["Reduced water pressure over time", "Water heater taking longer to heat", "White scale on shower heads", "Appliance breakdowns", "Higher energy bills"],
    solutions: ["water_softener"],
  },
  {
    slug: "contaminants",
    title: "Water Contaminants & Safety",
    keyword: "water contaminants",
    description: "Municipal water can contain over 250 contaminants including PFAS ('forever chemicals'), pharmaceutical residues, microplastics, and disinfection byproducts — many of which are legal but not necessarily safe.",
    symptoms: ["PFAS (forever chemicals)", "Pharmaceutical residues", "Microplastics", "Disinfection byproducts (THMs, HAAs)", "Pesticides and herbicides"],
    solutions: ["reverse_osmosis", "whole_house_filtration", "water_testing"],
  },
] as const;

export type WaterProblem = (typeof WATER_PROBLEMS)[number];

export function getProblemBySlug(slug: string): WaterProblem | undefined {
  return WATER_PROBLEMS.find((p) => p.slug === slug);
}

export function getCompaniesForProblem(stateSlug: string, citySlug: string, problem: WaterProblem): Company[] {
  const companies = getCompaniesByCity(stateSlug, citySlug);
  return companies.filter((c) =>
    c.services?.some((svc) => problem.solutions.includes(svc))
  );
}

// ---------- City water quality data ----------

export const CITY_WATER_DATA: Record<string, {
  source: string;
  hardness: string;
  hardnessGrains: string;
  tds: string;
  topContaminants: string[];
  epaViolations: string;
  population: string;
  waterSystem: string;
}> = {
  "San Antonio": { source: "Edwards Aquifer", hardness: "Very Hard", hardnessGrains: "15-20 gpg", tds: "300-400 ppm", topContaminants: ["Calcium", "Magnesium", "Chlorine", "Fluoride", "Haloacetic acids"], epaViolations: "None recent", population: "1.5M", waterSystem: "San Antonio Water System (SAWS)" },
  "Phoenix": { source: "Salt River, Verde River, Colorado River", hardness: "Hard", hardnessGrains: "10-15 gpg", tds: "500-700 ppm", topContaminants: ["Arsenic", "Chromium", "Chlorine", "TDS", "Fluoride"], epaViolations: "Arsenic levels near limit", population: "1.6M", waterSystem: "City of Phoenix Water Services" },
  "New York": { source: "Catskill/Delaware/Croton Watersheds", hardness: "Soft", hardnessGrains: "1-3 gpg", tds: "30-70 ppm", topContaminants: ["Lead (from pipes)", "Chlorine", "THMs", "HAAs", "Microplastics"], epaViolations: "Lead service line concerns", population: "8.3M", waterSystem: "NYC DEP" },
  "Miami": { source: "Biscayne Aquifer", hardness: "Hard", hardnessGrains: "10-14 gpg", tds: "200-350 ppm", topContaminants: ["Chlorine", "Haloacetic acids", "Trihalomethanes", "Calcium", "PFAS"], epaViolations: "THM seasonal spikes", population: "450K", waterSystem: "Miami-Dade Water and Sewer" },
  "Dallas": { source: "Area reservoirs (Lavon, Ray Hubbard, Lewisville)", hardness: "Moderate-Hard", hardnessGrains: "8-12 gpg", tds: "200-400 ppm", topContaminants: ["Chloramine", "Fluoride", "Atrazine", "THMs", "Lead"], epaViolations: "None recent", population: "1.3M", waterSystem: "Dallas Water Utilities" },
  "San Diego": { source: "Colorado River, Northern CA imports", hardness: "Hard", hardnessGrains: "12-17 gpg", tds: "400-700 ppm", topContaminants: ["Calcium", "Magnesium", "Chlorine", "TDS", "Chromium-6"], epaViolations: "None recent", population: "1.4M", waterSystem: "City of San Diego PUD" },
  "Jacksonville": { source: "Floridan Aquifer (groundwater)", hardness: "Hard", hardnessGrains: "10-15 gpg", tds: "200-400 ppm", topContaminants: ["Sulfur", "Iron", "Calcium", "THMs", "HAAs"], epaViolations: "None recent", population: "950K", waterSystem: "JEA" },
  "Atlanta": { source: "Chattahoochee River", hardness: "Soft", hardnessGrains: "2-4 gpg", tds: "50-100 ppm", topContaminants: ["Chlorine", "THMs", "HAAs", "Lead (older homes)", "Chromium-6"], epaViolations: "Aging infrastructure concerns", population: "500K", waterSystem: "Atlanta DWM" },
  "Denver": { source: "South Platte River, mountain snowmelt", hardness: "Soft-Moderate", hardnessGrains: "3-7 gpg", tds: "100-200 ppm", topContaminants: ["Chlorine", "Lead (older homes)", "Fluoride", "PFAS", "Microplastics"], epaViolations: "PFAS monitoring", population: "715K", waterSystem: "Denver Water" },
  "Orlando": { source: "Floridan Aquifer (groundwater)", hardness: "Hard-Very Hard", hardnessGrains: "12-18 gpg", tds: "250-500 ppm", topContaminants: ["Sulfur", "Iron", "Calcium", "Chlorine", "THMs"], epaViolations: "None recent", population: "310K", waterSystem: "Orlando Utilities Commission" },
  "Las Vegas": { source: "Lake Mead (Colorado River)", hardness: "Very Hard", hardnessGrains: "16-22 gpg", tds: "500-800 ppm", topContaminants: ["Calcium", "Magnesium", "Chlorine", "Arsenic", "Chromium-6"], epaViolations: "Arsenic near limit", population: "650K", waterSystem: "LVVWD" },
  "Chicago": { source: "Lake Michigan", hardness: "Moderate", hardnessGrains: "7-10 gpg", tds: "150-250 ppm", topContaminants: ["Lead (service lines)", "Chlorine", "Chromium-6", "THMs", "PFAS"], epaViolations: "Lead service line replacement ongoing", population: "2.7M", waterSystem: "Chicago DWM" },
  "Sacramento": { source: "American River, Sacramento River", hardness: "Soft", hardnessGrains: "2-5 gpg", tds: "50-150 ppm", topContaminants: ["Chlorine", "THMs", "Agricultural runoff", "PFAS", "Chromium-6"], epaViolations: "None recent", population: "525K", waterSystem: "City of Sacramento DOU" },
  "Tampa": { source: "Hillsborough River, desalination, wellfields", hardness: "Hard", hardnessGrains: "10-15 gpg", tds: "200-400 ppm", topContaminants: ["Chloramine", "Calcium", "Sulfur", "THMs", "PFAS"], epaViolations: "None recent", population: "400K", waterSystem: "Tampa Water Department" },
  "Los Angeles": { source: "Colorado River, CA Aqueduct, local groundwater", hardness: "Hard", hardnessGrains: "10-16 gpg", tds: "300-600 ppm", topContaminants: ["Chlorine", "Chromium-6", "PFAS", "THMs", "Arsenic"], epaViolations: "Chromium-6 concerns", population: "4M", waterSystem: "LADWP" },
  "Salt Lake City": { source: "Mountain snowmelt, underground aquifers", hardness: "Moderate-Hard", hardnessGrains: "8-15 gpg", tds: "200-400 ppm", topContaminants: ["Calcium", "Magnesium", "Chlorine", "Arsenic", "Lead"], epaViolations: "None recent", population: "200K", waterSystem: "SLC DPU" },
  "Houston": { source: "Lake Houston, Lake Livingston, groundwater", hardness: "Moderate-Hard", hardnessGrains: "8-14 gpg", tds: "200-350 ppm", topContaminants: ["Chloramine", "Fluoride", "Atrazine", "THMs", "PFAS"], epaViolations: "Boil water notices (storm events)", population: "2.3M", waterSystem: "City of Houston PWE" },
  "Austin": { source: "Colorado River, Lake Travis", hardness: "Moderate", hardnessGrains: "7-12 gpg", tds: "200-350 ppm", topContaminants: ["Chloramine", "Fluoride", "THMs", "Zebra mussel byproducts", "Algae toxins"], epaViolations: "Algae bloom events", population: "1M", waterSystem: "Austin Water" },
  "El Paso": { source: "Hueco Bolson aquifer, Rio Grande, desalination", hardness: "Hard-Very Hard", hardnessGrains: "12-20 gpg", tds: "400-700 ppm", topContaminants: ["TDS", "Calcium", "Sulfate", "Arsenic", "Fluoride"], epaViolations: "None recent", population: "680K", waterSystem: "El Paso Water" },
  "Provo": { source: "Mountain springs, Provo River, wells", hardness: "Hard", hardnessGrains: "10-16 gpg", tds: "200-400 ppm", topContaminants: ["Calcium", "Magnesium", "Chlorine", "Nitrates", "TDS"], epaViolations: "None recent", population: "115K", waterSystem: "Provo City PW" },
  "St George": { source: "Quail Creek Reservoir, Sand Hollow, wells", hardness: "Hard-Very Hard", hardnessGrains: "14-20 gpg", tds: "300-500 ppm", topContaminants: ["Calcium", "Magnesium", "TDS", "Chlorine", "Arsenic"], epaViolations: "None recent", population: "100K", waterSystem: "Washington County Water" },
  "Ogden": { source: "Pineview Reservoir, mountain sources", hardness: "Moderate-Hard", hardnessGrains: "8-13 gpg", tds: "150-300 ppm", topContaminants: ["Calcium", "Chlorine", "Seasonal turbidity", "THMs", "Lead (older homes)"], epaViolations: "None recent", population: "87K", waterSystem: "Ogden City PW" },
};

export function getCityWaterData(cityName: string) {
  return CITY_WATER_DATA[cityName] || null;
}

// ---------- Best-of helpers ----------

export function getTopCompaniesInCity(stateSlug: string, citySlug: string, limit: number = 10): Company[] {
  return getCompaniesByCity(stateSlug, citySlug)
    .filter((c) => c.googleRating != null)
    .sort((a, b) => {
      // Sort by rating desc, then review count desc
      if (b.googleRating! !== a.googleRating!) return b.googleRating! - a.googleRating!;
      return (b.googleReviewCount || 0) - (a.googleReviewCount || 0);
    })
    .slice(0, limit);
}

// ---------- All service+city combos ----------

export function getAllServiceCityCombos(): { stateSlug: string; citySlug: string; cityName: string; stateName: string; service: ServiceDef; companyCount: number }[] {
  const combos: any[] = [];
  for (const st of getAllStates()) {
    for (const ct of getCitiesInState(st.slug)) {
      for (const svc of SERVICES) {
        const count = getCompaniesByService(st.slug, ct.slug, svc.key).length;
        if (count > 0) {
          combos.push({
            stateSlug: st.slug,
            citySlug: ct.slug,
            cityName: ct.name,
            stateName: st.name,
            service: svc,
            companyCount: count,
          });
        }
      }
    }
  }
  return combos;
}
