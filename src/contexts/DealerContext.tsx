import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDealerByParam, getDealerByState, getDealerByZip, isUtahZip, type Dealer } from "@/data/dealerData";

interface DealerContextType {
  dealer: Dealer | null;
  isDealerMode: boolean;
  detectionSource: "qr" | "ip" | "zip" | null;
  isLoading: boolean;
  detectFromZip: (zip: string) => void;
  clearDealer: () => void;
}

const DealerContext = createContext<DealerContextType | undefined>(undefined);

const STORAGE_KEY = "cwt-dealer-mode";
const DETECTION_SOURCE_KEY = "cwt-detection-source";

interface StoredDealerData {
  dealerId: string;
  source: "qr" | "ip" | "zip";
  timestamp: number;
}

export function DealerProvider({ children }: { children: ReactNode }) {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [detectionSource, setDetectionSource] = useState<"qr" | "ip" | "zip" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect dealer on mount
  useEffect(() => {
    const detectDealer = async () => {
      setIsLoading(true);

      try {
        // 1. Check sessionStorage first (persists during visit)
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: StoredDealerData = JSON.parse(stored);
          // Check if still valid (within 24 hours)
          if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            const dealerFromStorage = getDealerByParam(data.dealerId) || getDealerByState("Utah");
            if (dealerFromStorage) {
              setDealer(dealerFromStorage);
              setDetectionSource(data.source);
              setIsLoading(false);
              return;
            }
          }
        }

        // 2. Check URL params (highest priority)
        const params = new URLSearchParams(window.location.search);
        const source = params.get("source");
        const qrId = params.get("qr_id");
        const dealerParam = params.get("dealer");

        // Check for Yamily's QR code parameter
        if (source) {
          const dealerFromParam = getDealerByParam(source);
          if (dealerFromParam) {
            persistDealer(dealerFromParam.id, "qr");
            setDealer(dealerFromParam);
            setDetectionSource("qr");
            setIsLoading(false);
            return;
          }
        }

        if (qrId || dealerParam) {
          const dealerFromParam = getDealerByParam(qrId || dealerParam || "");
          if (dealerFromParam) {
            persistDealer(dealerFromParam.id, "qr");
            setDealer(dealerFromParam);
            setDetectionSource("qr");
            setIsLoading(false);
            return;
          }
        }

        // 3. Check IP geolocation (only if no URL params matched)
        try {
          const geoResponse = await fetch("https://ip-api.com/json/?fields=regionName,status", {
            signal: AbortSignal.timeout(3000), // 3 second timeout
          });
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            if (geoData.status === "success" && geoData.regionName) {
              const dealerFromGeo = getDealerByState(geoData.regionName);
              if (dealerFromGeo) {
                persistDealer(dealerFromGeo.id, "ip");
                setDealer(dealerFromGeo);
                setDetectionSource("ip");
                setIsLoading(false);
                return;
              }
            }
          }
        } catch (geoError) {
          console.log("Geo detection failed, continuing without dealer mode");
        }

        // 4. No dealer detected - default experience
        setIsLoading(false);
      } catch (error) {
        console.error("Dealer detection error:", error);
        setIsLoading(false);
      }
    };

    detectDealer();
  }, []);

  const persistDealer = (dealerId: string, source: "qr" | "ip" | "zip") => {
    const data: StoredDealerData = {
      dealerId,
      source,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const detectFromZip = (zip: string) => {
    if (isUtahZip(zip)) {
      const dealerFromZip = getDealerByZip(zip);
      if (dealerFromZip) {
        persistDealer(dealerFromZip.id, "zip");
        setDealer(dealerFromZip);
        setDetectionSource("zip");
      }
    }
  };

  const clearDealer = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setDealer(null);
    setDetectionSource(null);
  };

  return (
    <DealerContext.Provider
      value={{
        dealer,
        isDealerMode: !!dealer,
        detectionSource,
        isLoading,
        detectFromZip,
        clearDealer,
      }}
    >
      {children}
    </DealerContext.Provider>
  );
}

export function useDealer() {
  const context = useContext(DealerContext);
  if (context === undefined) {
    throw new Error("useDealer must be used within a DealerProvider");
  }
  return context;
}
