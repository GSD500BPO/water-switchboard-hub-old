import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, ArrowLeft, Clock } from "lucide-react";
import { getCompaniesByCity, getAverageRating, getTotalReviews } from "@/data/companies";

const serviceLabels: Record<string, string> = {
  water_softening: "Water Softening",
  reverse_osmosis: "Reverse Osmosis",
  ro_systems: "RO Systems",
  filtration: "Filtration",
  alkaline_water: "Alkaline Water",
  whole_house: "Whole House",
  uv_sterilization: "UV Sterilization",
  iron_removal: "Iron Removal",
};

const CityPage = () => {
  const { state, city } = useParams();
  const stateSlug = state || "utah";
  const citySlug = city || "salt-lake-city";
  
  const companies = getCompaniesByCity(stateSlug, citySlug);
  
  const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const stateName = stateSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to={`/water-treatment/${stateSlug}`} className="hover:text-blue-600">{stateName}</Link>
              <span>/</span>
              <span className="font-medium text-gray-900">{cityName}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <Link to={`/water-treatment/${stateSlug}`} className="inline-flex items-center text-blue-100 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to {stateName}
            </Link>
            <h1 className="text-3xl font-bold">Water Treatment in {cityName}</h1>
            <p className="text-blue-100 mt-2">
              {companies.length} companies serving this area
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Service Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-blue-600 cursor-pointer">All Services</Badge>
            {Object.values(serviceLabels).map((label) => (
              <Badge key={label} variant="outline" className="cursor-pointer hover:bg-gray-100">
                {label}
              </Badge>
            ))}
          </div>

          {/* Company List */}
          {companies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No companies found for this area yet.</p>
              <Link to="/schedule-test">
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Get Matched with Local Experts
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {companies.map((company) => {
                const avgRating = getAverageRating(company);
                const totalReviews = getTotalReviews(company);
                
                return (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Left: Company Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{company.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-lg">{avgRating}</span>
                                <span className="text-gray-500">({totalReviews} reviews)</span>
                              </div>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Get Quote
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {company.services.map((svc: string) => (
                              <Badge key={svc} variant="secondary">
                                {serviceLabels[svc] || svc}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {company.address.street}, {company.address.city}, {company.address.state} {company.address.zip}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {company.phone}
                            </div>
                          </div>
                        </div>

                        {/* Right: Review Sources */}
                        <div className="md:w-64 bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-3 text-sm">Review Sources</h4>
                          <div className="space-y-2">
                            {company.reviews?.google && (
                              <a 
                                href={company.reviews.google.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-sm hover:bg-white p-2 rounded"
                              >
                                <span>Google</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{company.reviews.google.rating}</span>
                                  <span className="text-gray-400">({company.reviews.google.count})</span>
                                </div>
                              </a>
                            )}
                            {company.reviews?.yelp && (
                              <a 
                                href={company.reviews.yelp.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-sm hover:bg-white p-2 rounded"
                              >
                                <span>Yelp</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{company.reviews.yelp.rating}</span>
                                  <span className="text-gray-400">({company.reviews.yelp.count})</span>
                                </div>
                              </a>
                            )}
                            {company.reviews?.angi && (
                              <a 
                                href={company.reviews.angi.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-sm hover:bg-white p-2 rounded"
                              >
                                <span>Angi</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{company.reviews.angi.rating}</span>
                                  <span className="text-gray-400">({company.reviews.angi.count})</span>
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Not Sure Which Company to Choose?</h3>
            <p className="text-gray-600 mb-6">
              Get a free water test and we'll match you with the best local experts.
            </p>
            <Link to="/schedule-test">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Free Water Test
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CityPage;
