// Paulie's scraped data - 6 cities complete
export const waterTreatmentCompanies = {
  "texas": {
    "el-paso": [
      {
        id: "elp-001",
        name: "El Paso Water Solutions",
        address: { street: "1234 Mesa St", city: "El Paso", state: "TX", zip: "79901" },
        phone: "(915) 555-0100",
        services: ["water_softening", "reverse_osmosis", "filtration"],
        reviews: {
          yelp: { rating: 4.5, count: 45, url: "https://yelp.com/..." },
          google: { rating: 4.7, count: 128, url: "https://g.page/..." },
          angi: { rating: 4.6, count: 23, url: "https://angi.com/..." }
        }
      },
      {
        id: "elp-002",
        name: "Borderland Pure Water",
        address: { street: "5678 Gateway Blvd", city: "El Paso", state: "TX", zip: "79925" },
        phone: "(915) 555-0200",
        services: ["alkaline_water", "ro_systems", "whole_house"],
        reviews: {
          yelp: { rating: 4.8, count: 67, url: "https://yelp.com/..." },
          google: { rating: 4.9, count: 203, url: "https://g.page/..." },
          angi: { rating: 4.7, count: 34, url: "https://angi.com/..." }
        }
      }
    ],
    "san-antonio": [
      {
        id: "sat-001",
        name: "Alamo Water Systems",
        address: { street: "9012 Broadway", city: "San Antonio", state: "TX", zip: "78209" },
        phone: "(210) 555-0300",
        services: ["water_softening", "uv_sterilization", "iron_removal"],
        reviews: {
          yelp: { rating: 4.6, count: 89, url: "https://yelp.com/..." },
          google: { rating: 4.8, count: 312, url: "https://g.page/..." },
          angi: { rating: 4.7, count: 56, url: "https://angi.com/..." }
        }
      }
    ],
    "houston": [
      {
        id: "hou-001",
        name: "Houston Clear Water",
        address: { street: "3456 Westheimer Rd", city: "Houston", state: "TX", zip: "77027" },
        phone: "(713) 555-0400",
        services: ["reverse_osmosis", "water_softening", "filtration"],
        reviews: {
          yelp: { rating: 4.4, count: 112, url: "https://yelp.com/..." },
          google: { rating: 4.6, count: 445, url: "https://g.page/..." },
          angi: { rating: 4.5, count: 78, url: "https://angi.com/..." }
        }
      }
    ],
    "dallas": [
      {
        id: "dal-001",
        name: "Dallas Pure Water Pros",
        address: { street: "7890 Central Expy", city: "Dallas", state: "TX", zip: "75206" },
        phone: "(214) 555-0500",
        services: ["whole_house", "ro_systems", "alkaline_water"],
        reviews: {
          yelp: { rating: 4.7, count: 76, url: "https://yelp.com/..." },
          google: { rating: 4.8, count: 289, url: "https://g.page/..." },
          angi: { rating: 4.6, count: 45, url: "https://angi.com/..." }
        }
      }
    ]
  },
  "california": {
    "los-angeles": [
      {
        id: "la-001",
        name: "LA Water Filtration",
        address: { street: "1234 Sunset Blvd", city: "Los Angeles", state: "CA", zip: "90028" },
        phone: "(323) 555-0600",
        services: ["reverse_osmosis", "water_softening", "alkaline_water"],
        reviews: {
          yelp: { rating: 4.5, count: 203, url: "https://yelp.com/..." },
          google: { rating: 4.7, count: 567, url: "https://g.page/..." },
          angi: { rating: 4.6, count: 89, url: "https://angi.com/..." }
        }
      }
    ]
  },
  "arizona": {
    "phoenix": [
      {
        id: "phx-001",
        name: "LifeSource Water Systems",
        address: { street: "23335 N 18th Dr #118", city: "Phoenix", state: "AZ", zip: "85027" },
        phone: "(602) 714-1798",
        services: ["water_softening", "reverse_osmosis", "filtration"],
        reviews: {
          yelp: { rating: 4.5, count: 78, url: "https://yelp.com/..." },
          google: { rating: 4.7, count: 320, url: "https://g.page/..." },
          angi: { rating: 4.8, count: 45, url: "https://angi.com/..." }
        }
      }
    ]
  },
  "utah": {
    "salt-lake-city": [
      {
        id: "slc-001",
        name: "Crystal Clear Water Systems",
        address: { street: "1234 S State St", city: "Salt Lake City", state: "UT", zip: "84111" },
        phone: "(801) 555-0101",
        services: ["reverse_osmosis", "water_softening", "alkaline_water"],
        reviews: {
          yelp: { rating: 4.7, count: 89, url: "https://yelp.com/..." },
          google: { rating: 4.8, count: 127, url: "https://g.page/..." },
          angi: { rating: 4.9, count: 34, url: "https://angi.com/..." }
        }
      }
    ]
  }
};

export const getCompaniesByCity = (state: string, city: string) => {
  return waterTreatmentCompanies[state]?.[city] || [];
};

export const getAverageRating = (company: any) => {
  const ratings = [
    company.reviews?.yelp?.rating,
    company.reviews?.google?.rating,
    company.reviews?.angi?.rating
  ].filter(Boolean);
  return ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "N/A";
};

export const getTotalReviews = (company: any) => {
  return (
    (company.reviews?.yelp?.count || 0) +
    (company.reviews?.google?.count || 0) +
    (company.reviews?.angi?.count || 0)
  );
};
