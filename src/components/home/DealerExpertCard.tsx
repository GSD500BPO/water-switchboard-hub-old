import { Shield, CheckCircle, Award, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import puronicLogo from "@/assets/puronics-logo.png";

export function DealerExpertCard() {
  const { t, language } = useLanguage();
  const { dealer } = useDealer();

  if (!dealer) return null;

  const handleRequestTest = () => {
    // Scroll to lead capture or open popup
    const popup = document.getElementById("lead-capture-trigger");
    if (popup) {
      popup.click();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-secondary/30 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">
              {language === "es" ? "Tu Experto Local" : "Your Local Expert"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "es" 
                ? "Especialista Certificado en Calidad del Agua" 
                : "Certified Water Quality Specialist"}
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {language === "es" ? "Verificado" : "Verified"}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            {language === "es" ? "Certificado EPA" : "EPA Certified"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {language === "es" ? "Antecedentes Verificados" : "Background Checked"}
          </Badge>
        </div>

        {/* Puronics Badge */}
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border mb-4">
          <img 
            src={puronicLogo} 
            alt="Puronics Authorized Dealer" 
            className="h-10 object-contain"
          />
          <div className="text-xs text-muted-foreground">
            {language === "es" 
              ? "Distribuidor Autorizado" 
              : "Authorized Dealer"}
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleRequestTest}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          size="lg"
        >
          <Phone className="w-4 h-4 mr-2" />
          {language === "es" ? "Solicitar Prueba Gratis" : "Request Free Test"}
        </Button>

        {/* Trust Text */}
        <p className="text-xs text-center text-muted-foreground mt-3">
          {language === "es" 
            ? "Sin costo • Sin compromiso • En tu idioma" 
            : "No cost • No obligation • In your language"}
        </p>
      </CardContent>
    </Card>
  );
}
