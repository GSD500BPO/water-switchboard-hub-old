import { Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import testimonial1 from "@/assets/dealer-testimonial-1.jpg";
import testimonial2 from "@/assets/dealer-testimonial-2.jpg";

// Video thumbnail data - these link to Facebook Reels
const videoData = [
  {
    id: 1,
    thumbnail: testimonial1,
    url: "https://web.facebook.com/reel/1277930490828994",
    titleEs: "Testimonio de Cliente",
    titleEn: "Customer Testimonial",
  },
  {
    id: 2,
    thumbnail: testimonial2,
    url: "https://web.facebook.com/share/r/1Acd43rbge/",
    titleEs: "Resultados Reales",
    titleEn: "Real Results",
  },
];

export function DealerVideos() {
  const { language } = useLanguage();
  const { dealer, isDealerMode } = useDealer();

  if (!isDealerMode || !dealer?.facebookVideos?.length) return null;

  const handleVideoClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {language === "es" 
              ? "Lo Que Dicen Nuestros Clientes" 
              : "What Our Customers Say"}
          </h2>
          <p className="text-muted-foreground">
            {language === "es" 
              ? "Testimonios reales de familias en tu comunidad" 
              : "Real testimonials from families in your community"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {videoData.map((video) => (
            <Card 
              key={video.id}
              className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
              onClick={() => handleVideoClick(video.url)}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={language === "es" ? video.titleEs : video.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                  </div>
                </div>
                {/* External link indicator */}
                <div className="absolute top-3 right-3">
                  <div className="bg-black/60 text-white rounded-full p-1.5">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium text-foreground">
                  {language === "es" ? video.titleEs : video.titleEn}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Ver en Facebook" : "Watch on Facebook"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {language === "es" 
            ? "Haz clic para ver los videos completos en Facebook" 
            : "Click to watch full videos on Facebook"}
        </p>
      </div>
    </section>
  );
}
