
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Calendar, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PreArrival1PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const PreArrival1Page = ({ onBack, onComplete, isCompleted }: PreArrival1PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const checklistItems = [
    {
      id: 'campus-france',
      title: "Campus France Registration",
      description: "Complete your Campus France application and interview",
      urgency: "high",
      timeline: "3-4 months before departure",
      overview: "Campus France is a mandatory step for courses over 90 days, facilitating the pre-consular process.",
      steps: [
        "Create an account on the Etudes en France platform (www.pastel.diplomatie.gouv.fr/etudesenfrance)",
        "Fill out the application with academic records, CV, SOP, and language proficiency details",
        "Pay the fee (INR 18,500, exemptions for scholarship holders) at payment.ifindia.in",
        "Schedule and attend an interview at a Campus France office in India (e.g., Delhi, Mumbai)",
        "Interview: Assesses your academic plans and reasons for choosing France. You'll receive a No Objection Certificate (NOC) upon success"
      ],
      documents: [
        "Passport: Scanned copy (valid for 3 months beyond stay, not older than 10 years, with two blank pages), including first/last pages and previous visas",
        "Educational Documents: High school transcripts (Class 10, 12), undergraduate degrees/transcripts, additional diplomas",
        "Language Proficiency: DELF/DALF (French) or IELTS/TOEFL (English) certificates",
        "CV: Detailed resume of academic/professional background",
        "Statement of Purpose (SOP): Letter explaining your goals and reasons for choosing France",
        "Proof of Payment: Receipt of the Campus France fee",
        "For Interview: Originals and photocopies of all documents submitted online"
      ],
      tips: "Start early, ensure document accuracy",
      links: ["Campus France India (www.inde.campusfrance.org)", "Etudes en France (www.pastel.diplomatie.gouv.fr/etudesenfrance)"]
    },
    {
      id: 'vfs',
      title: "VFS Visa Application",
      description: "Submit visa documents and attend biometric appointment",
      urgency: "high",
      timeline: "2-3 months before departure",
      overview: "Apply for a Long-Stay Student Visa (VLS-TS) for programs over 90 days, which also serves as a residence permit for the first year.",
      steps: [
        "Choose the visa type (VLS-TS for long stays)",
        "Book an appointment at France-Visas (france-visas.gouv.fr)",
        "Submit documents at a VFS Global Centre, pay the fee (€50 + VFS fees ~INR 3,138), and attend a biometric appointment",
        "Processing: 15–20 days, apply 8–12 weeks early"
      ],
      documents: [
        "Application form dated and signed, printed and returned in original (no scanning)",
        "France-Visas receipt printed and returned in original (no scanning)",
        "Passport: Original travel document issued less than 10 years ago, with at least two blank pages, valid for at least 3 months longer than the intended stay",
        "Photographs: Two passport-size photos (ID photograph, white background, per VFS specs)",
        "Campus France Letter with registration number (Etudes en France certificate)",
        "Campus France NOC (printed screenshot from email)",
        "Proof of accommodation in France",
        "Proof of minimum monthly income of €615",
        "Bank statements showing sufficient funds (minimum 12 lakhs living expenses + total fees for one year)",
        "OFII Form: Completed Office Français de l'Immigration et de l'Intégration form"
      ],
      tips: "Check document consistency, pay full tuition fees to boost approval chances, track status on France-Visas",
      links: ["France-Visas (france-visas.gouv.fr)", "VFS Global (www.vfs-france.co.in)"]
    },
    {
      id: 'documents',
      title: "Document Translation",
      description: "Get official translations of academic documents",
      urgency: "medium",
      timeline: "2 months before departure",
      overview: "Translate academic documents into French if required by the university or visa authorities.",
      steps: [
        "Identify documents to translate based on university/visa requirements",
        "Use certified translation services in India",
        "Submit documents for translation and ensure they are certified"
      ],
      documents: [
        "Educational Documents: High school certificates (Class 12 mark sheet/certificate), undergraduate degrees/transcripts, additional diplomas",
        "Other Documents (if required): Birth certificate, if requested"
      ],
      tips: "Keep originals and translations, verify translator credentials",
      links: ["Search for 'certified document translation services in India for France'"]
    },
    {
      id: 'insurance',
      title: "Travel Insurance",
      description: "Purchase comprehensive travel and health insurance",
      urgency: "medium",
      timeline: "1 month before departure",
      overview: "Insurance is mandatory to cover medical expenses and repatriation.",
      steps: [
        "Choose a policy covering medical expenses, hospitalization, repatriation (€300–715/year)",
        "Purchase from Indian providers (e.g., AXA, Allianz)",
        "Register for France's healthcare system upon arrival (etudiant-etranger.ameli.fr)"
      ],
      documents: [
        "Passport: Copy for identification",
        "Travel Itinerary: Details of travel dates (e.g., flight ticket)",
        "Visa Details (if available): Copy of visa approval/application",
        "Personal Information: Full name, date of birth, contact details",
        "Insurance Certificate: Proof of coverage (medical expenses, repatriation, duration)"
      ],
      tips: "Compare quotes, consider a mutuelle for extra coverage",
      links: ["Search 'international student health insurance for France'", "French healthcare (etudiant-etranger.ameli.fr)"]
    },
    {
      id: 'flight',
      title: "Flight Booking",
      description: "Book your flight to France",
      urgency: "low",
      timeline: "1-2 months before departure",
      overview: "Secure your flight to arrive on time for your course.",
      steps: [
        "Check visa approval before booking",
        "Book 1-2 months in advance using platforms like Expedia, Kayak, or Skyscanner",
        "Consider flight duration, layovers, baggage allowance"
      ],
      documents: [
        "Passport: Details (number, expiry date) for booking",
        "Visa: Copy of Long-Stay Student Visa (VLS-TS)",
        "Payment Information: Credit/debit card or online payment details",
        "E-Ticket/Itinerary: Proof of one-way flight (flight number, date, time) – optional dummy ticket if not finalized"
      ],
      tips: "Book a one-way ticket if unsure of return, choose reliable airlines (e.g., Air France)",
      links: ["Expedia", "Kayak", "Skyscanner"]
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const allStepsCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ✈️ Pre-Arrival Checklist (Part 1)
          </h1>
          <p className="text-lg text-gray-600">
            Campus France, VFS, and essential preparations
          </p>
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {checklistItems.map((item, index) => {
          const isStepCompleted = completedSteps.includes(item.id);
          const isExpanded = expandedItems.includes(item.id);
          
          return (
            <Card key={index} className={`border-l-4 border-l-blue-500 ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        Timeline: {item.timeline}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    item.urgency === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : item.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.urgency} priority
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <span className="text-blue-600 hover:text-blue-800">
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </span>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Overview</h4>
                      <p className="text-blue-800 text-sm">{item.overview}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Steps to Complete
                      </h4>
                      <ul className="space-y-2">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-sm">
                            <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-orange-600" />
                        Required Documents
                      </h4>
                      <ul className="space-y-1">
                        {item.documents.map((doc, docIndex) => (
                          <li key={docIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Tips
                      </h4>
                      <p className="text-yellow-800 text-sm">{item.tips}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2 text-blue-600" />
                        Useful Links
                      </h4>
                      <ul className="space-y-1">
                        {item.links.map((link, linkIndex) => (
                          <li key={linkIndex} className="text-sm text-blue-600 hover:text-blue-800">
                            • {link}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Click "View Details" above for comprehensive information
                  </div>
                  {!isStepCompleted && (
                    <Button 
                      size="sm"
                      onClick={() => handleStepComplete(item.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                  {isStepCompleted && (
                    <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Steps Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all steps in this module.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {checklistItems.length} steps completed
      </div>
    </div>
  );
};
