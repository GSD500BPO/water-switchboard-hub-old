import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Beaker,
  AlertTriangle,
  Bug,
  Thermometer,
  FlaskConical,
  Activity,
  Droplets,
  ClipboardCheck,
  Package,
  TestTube,
  Mail,
  Clock,
  Phone,
  ArrowLeft,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TestInfo {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  price: string;
  detects: string[];
  whenToTest: string[];
  instructions: string[];
  turnaround: string;
  faqs: { question: string; answer: string }[];
}

const testData: Record<string, TestInfo> = {
  standard: {
    id: "standard",
    icon: Beaker,
    titleKey: "tests.standard.title",
    price: "$49",
    detects: [
      "Total Coliform Bacteria",
      "E. coli",
      "pH Levels",
      "Total Dissolved Solids (TDS)",
      "Chlorine Residual",
      "Hardness",
      "Iron",
      "Manganese",
    ],
    whenToTest: [
      "Moving into a new home",
      "Not sure what's wrong with your water",
      "Annual check-up on water quality",
      "Changes in taste, odor, or appearance",
      "Near agricultural or industrial areas",
    ],
    instructions: [
      "Run cold water for 2-3 minutes before collecting",
      "Use the provided sterile container",
      "Fill to the line indicated on the container",
      "Cap tightly and do not touch the inside",
      "Return within 24 hours for best results",
    ],
    turnaround: "10 working days",
    faqs: [
      {
        question: "What does the standard test cover?",
        answer: "The standard test covers the most common water quality parameters including bacteria (E. coli and Coliform), pH, hardness, chlorine, and basic minerals. It's our most popular test for homeowners who want a comprehensive baseline assessment.",
      },
      {
        question: "How often should I test my water?",
        answer: "We recommend testing annually, or immediately if you notice changes in taste, smell, or appearance. If you have a private well, testing should be done at least once per year.",
      },
      {
        question: "Is this test suitable for well water?",
        answer: "Yes! The standard test is suitable for both municipal and well water. For well water, we especially recommend the bacteria testing component.",
      },
    ],
  },
  "heavy-metals": {
    id: "heavy-metals",
    icon: AlertTriangle,
    titleKey: "tests.heavyMetals.title",
    price: "$39",
    detects: [
      "Lead",
      "Copper",
      "Arsenic",
      "Mercury",
      "Cadmium",
      "Chromium",
      "Zinc",
      "Iron",
    ],
    whenToTest: [
      "Homes built before 1986 (lead pipes)",
      "Metallic taste in water",
      "Dark discoloration of water",
      "Nearby industrial activity",
      "Changes in hair color when using dyes",
      "Corroded or aging plumbing",
    ],
    instructions: [
      "Use first-draw sample (water sitting in pipes overnight)",
      "Do NOT run water before collecting",
      "Collect in the morning before any water use",
      "Use the acid-washed container provided",
      "Return within 48 hours",
    ],
    turnaround: "10 working days",
    faqs: [
      {
        question: "Why is lead testing important?",
        answer: "Lead can leach from old pipes and fixtures into drinking water. Even low levels of lead exposure can cause serious health problems, especially in children. Homes built before 1986 are at higher risk.",
      },
      {
        question: "What causes metallic taste in water?",
        answer: "Metallic taste is often caused by elevated levels of iron, copper, or zinc. These can come from corroded pipes, industrial contamination, or natural mineral deposits.",
      },
      {
        question: "Can heavy metals be filtered out?",
        answer: "Yes, many heavy metals can be removed with proper filtration systems. Reverse osmosis and activated carbon filters are effective for most heavy metals. We can recommend solutions based on your test results.",
      },
    ],
  },
  bacteria: {
    id: "bacteria",
    icon: Bug,
    titleKey: "tests.bacteria.title",
    price: "$35",
    detects: [
      "Total Coliform Bacteria",
      "E. coli (Escherichia coli)",
      "Fecal Coliform",
      "Heterotrophic Plate Count (HPC)",
    ],
    whenToTest: [
      "Changes in industrial activity nearby",
      "Water discoloration",
      "Foul smell or taste",
      "Household member with upset stomach or diarrhea",
      "After flooding or sewage backup",
      "Private well owners (annual testing)",
    ],
    instructions: [
      "Sterilize the faucet with flame or alcohol wipe",
      "Run cold water for 2-3 minutes",
      "Use only the sterile container provided",
      "Do not touch the inside of cap or container",
      "Keep refrigerated and return within 24 hours",
    ],
    turnaround: "3-5 working days (Priority notification for E. coli within 24 hours)",
    faqs: [
      {
        question: "What is E. coli and why is it dangerous?",
        answer: "E. coli is a type of bacteria that indicates fecal contamination in water. While some strains are harmless, others can cause severe illness including bloody diarrhea, kidney failure, and can be life-threatening, especially for children and elderly.",
      },
      {
        question: "What should I do if bacteria is found?",
        answer: "If E. coli or Coliform is detected, you should immediately stop drinking the water and boil all water used for drinking, cooking, and brushing teeth. Contact a water treatment specialist for remediation options.",
      },
      {
        question: "How does bacteria get into water?",
        answer: "Bacteria can enter water supplies through damaged pipes, cross-connections, well contamination from septic systems, surface water infiltration, or problems at the water treatment facility.",
      },
    ],
  },
  legionella: {
    id: "legionella",
    icon: Thermometer,
    titleKey: "tests.legionella.title",
    price: "$55",
    detects: [
      "Legionella pneumophila",
      "Legionella species (multiple strains)",
      "Heterotrophic bacteria",
    ],
    whenToTest: [
      "Hotels, hospitals, and healthcare facilities",
      "Buildings with cooling towers",
      "Older buildings with complex plumbing",
      "After periods of low water usage",
      "Spas and pools",
      "Any public water facility",
    ],
    instructions: [
      "Collect from hot water outlets (shower heads, faucets)",
      "Do NOT run water before collecting",
      "Collect first-draw sample",
      "Temperature at point of collection should be recorded",
      "Keep sample cool (not frozen) during transport",
    ],
    turnaround: "7-10 working days",
    faqs: [
      {
        question: "What is Legionella and how is it spread?",
        answer: "Legionella is a bacteria that causes Legionnaires' disease, a severe form of pneumonia. It spreads through inhaling contaminated water droplets from showers, cooling towers, hot tubs, and other water systems. It does NOT spread person to person.",
      },
      {
        question: "Who is at risk for Legionnaires' disease?",
        answer: "People over 50, smokers, those with chronic lung disease, weakened immune systems, or underlying health conditions are at higher risk. However, anyone can contract the disease.",
      },
      {
        question: "How can Legionella be prevented?",
        answer: "Regular cleaning and maintenance of water systems, keeping hot water above 60°C (140°F), avoiding water stagnation, and regular testing are key prevention measures. Commercial buildings should have a water management plan.",
      },
    ],
  },
  chemical: {
    id: "chemical",
    icon: FlaskConical,
    titleKey: "tests.chemical.title",
    price: "$45",
    detects: [
      "pH",
      "Chlorine (Free and Total)",
      "Nitrates and Nitrites",
      "Sulfates",
      "Fluoride",
      "Sodium",
      "Alkalinity",
      "Conductivity",
    ],
    whenToTest: [
      "Corroded or limescale on plumbing",
      "Discolored stains on fixtures",
      "Foul smell from water",
      "Near agricultural areas",
      "Skin irritation after bathing",
      "Poor soap/detergent performance",
    ],
    instructions: [
      "Run cold water for 3-5 minutes",
      "Collect in clean plastic container",
      "Fill completely with no air bubbles",
      "Collect at least 500ml",
      "Return within 48 hours",
    ],
    turnaround: "10 working days",
    faqs: [
      {
        question: "What causes high nitrates in water?",
        answer: "High nitrates typically come from agricultural runoff (fertilizers), septic system leakage, or industrial contamination. Nitrates are especially dangerous for infants and can cause 'blue baby syndrome'.",
      },
      {
        question: "Why does my water smell like rotten eggs?",
        answer: "A rotten egg smell is usually caused by hydrogen sulfide gas, which can come from bacteria in your water heater, well, or from naturally occurring sulfates in groundwater.",
      },
      {
        question: "Is fluoride in water safe?",
        answer: "Fluoride is added to many municipal water supplies to prevent tooth decay. At recommended levels (0.7 ppm), it's considered safe. Higher levels can cause dental fluorosis. Our test will show if your levels are within safe limits.",
      },
    ],
  },
  enterococci: {
    id: "enterococci",
    icon: Activity,
    titleKey: "tests.enterococci.title",
    price: "$40",
    detects: [
      "Enterococcus faecalis",
      "Enterococcus faecium",
      "Other Enterococcus species",
    ],
    whenToTest: [
      "Private well near septic systems",
      "After flooding or sewage overflow",
      "Recurring urinary tract infections in household",
      "Livestock or farming activity nearby",
      "Suspected sewage contamination",
      "Baseline testing for new property",
    ],
    instructions: [
      "Sterilize faucet before collection",
      "Use sterile container provided",
      "Run water for 2-3 minutes before collecting",
      "Keep sample refrigerated",
      "Return within 24 hours (critical)",
    ],
    turnaround: "5 working days",
    faqs: [
      {
        question: "What are Enterococci and why test for them?",
        answer: "Enterococci are bacteria found in human and animal intestines. Their presence in water indicates fecal contamination. They can cause urinary tract infections, bloodstream infections, and other serious health problems.",
      },
      {
        question: "How serious is Enterococci contamination?",
        answer: "Very serious. Unlike some indicators, Enterococci themselves can cause disease. They're also more resistant to chlorination than other bacteria, meaning they may survive treatment that kills other pathogens.",
      },
      {
        question: "What should I do if Enterococci is found?",
        answer: "Stop drinking the water immediately. Boil water for all consumption until the contamination source is identified and resolved. A water treatment professional should assess your well and plumbing system.",
      },
    ],
  },
  thm: {
    id: "thm",
    icon: Droplets,
    titleKey: "tests.thm.title",
    price: "$50",
    detects: [
      "Chloroform",
      "Bromodichloromethane",
      "Dibromochloromethane",
      "Bromoform",
      "Total Trihalomethanes (TTHMs)",
    ],
    whenToTest: [
      "Chlorinated municipal water supply",
      "Concerned about long-term health effects",
      "High chlorine smell in water",
      "Family history of cancer",
      "Annual monitoring for safety",
      "Planning a family (reproductive concerns)",
    ],
    instructions: [
      "Use glass vials provided (not plastic)",
      "Fill completely with no headspace",
      "Do not open vials until ready to collect",
      "Keep samples cold and dark",
      "Return within 24 hours",
    ],
    turnaround: "10-14 working days",
    faqs: [
      {
        question: "What are THMs and where do they come from?",
        answer: "Trihalomethanes (THMs) are chemical compounds formed when chlorine used to disinfect water reacts with organic matter. They're odorless, colorless, and tasteless, making them undetectable without testing.",
      },
      {
        question: "Are THMs dangerous?",
        answer: "Long-term exposure to high levels of THMs has been linked to increased cancer risk and reproductive problems. The EPA sets the maximum contaminant level at 80 ppb. Levels above this require action.",
      },
      {
        question: "How can I reduce THMs in my water?",
        answer: "Activated carbon filters can effectively remove THMs. Running water to flush pipes, using point-of-use filters, and installing whole-house carbon filtration are all effective strategies.",
      },
    ],
  },
  comprehensive: {
    id: "comprehensive",
    icon: ClipboardCheck,
    titleKey: "tests.comprehensive.title",
    price: "$129",
    detects: [
      "All bacteria tests (E. coli, Coliform, etc.)",
      "All heavy metals (Lead, Arsenic, etc.)",
      "All chemical parameters",
      "THMs and disinfection byproducts",
      "Pesticides and herbicides",
      "Volatile Organic Compounds (VOCs)",
      "Pharmaceuticals (basic panel)",
      "Radionuclides",
    ],
    whenToTest: [
      "Buying a new home",
      "Complete peace of mind",
      "Multiple concerns about water quality",
      "Haven't tested in several years",
      "Health issues with unknown cause",
      "Complete baseline before installing filtration",
    ],
    instructions: [
      "Multiple samples required (kit includes all containers)",
      "Follow separate instructions for each sample type",
      "Some samples require first-draw, others after running",
      "All samples should be collected same day",
      "Return all samples together within 24 hours",
    ],
    turnaround: "14 working days",
    faqs: [
      {
        question: "Why choose the comprehensive test?",
        answer: "The comprehensive test provides the most complete picture of your water quality. It's ideal for new homeowners, those with unexplained health concerns, or anyone who wants thorough peace of mind about their water.",
      },
      {
        question: "What makes this different from running multiple tests?",
        answer: "Beyond convenience, the comprehensive test includes parameters not available in individual tests, such as pharmaceutical screening and radionuclides. You also save significantly compared to ordering tests separately.",
      },
      {
        question: "How should I prepare for the comprehensive test?",
        answer: "Review all instructions before collection day. You'll need to collect multiple samples at different times (first draw and after running). Plan to complete all collections in one morning and ship same day.",
      },
    ],
  },
};

export default function TestDetail() {
  const { testId } = useParams<{ testId: string }>();
  const { t } = useLanguage();

  const test = testId ? testData[testId] : null;

  if (!test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-primary mb-4">Test Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The test you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = test.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tests
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                <Icon className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {t(test.titleKey as any)}
                </h1>
                <div className="flex items-center gap-4">
                  <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-1">
                    {test.price}
                  </Badge>
                  <span className="text-primary-foreground/70 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Results in {test.turnaround}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* What This Test Detects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-secondary" />
                    What This Test Detects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {test.detects.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* When To Get This Test */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    When To Get This Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {test.whenToTest.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-secondary font-bold">•</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Sample Collection Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Sample Collection Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {test.instructions.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-foreground pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {test.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - CTAs */}
            <div className="space-y-6">
              {/* Order Card */}
              <Card className="border-secondary bg-secondary/5 sticky top-4">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary mb-2">
                      {test.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Results in {test.turnaround}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Order Test Kit
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Request Free Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Free test includes consultation with EPA-certified specialist
                  </p>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Need Help Choosing?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="tel:066-976-35-88"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 text-secondary" />
                    <span>066-976 35 88</span>
                  </a>
                  <a
                    href="mailto:info@communitywatertest.com"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5 text-secondary" />
                    <span>Email Us</span>
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Our team is available to help you choose the right test for
                    your situation.
                  </p>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Sample collection containers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Step-by-step instructions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Prepaid return shipping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>ISO 17025 accredited lab testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Detailed results report</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
