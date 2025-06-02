import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface StepDetails {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface ModuleContentProps {
  module?: Module;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
  isCompleted?: boolean;
}

const DEFAULT_MODULE: Module = {
  id: 'default',
  title: 'Untitled Module',
  description: 'No description available',
  color: 'from-blue-500 to-blue-700',
  icon: '📝'
};

export const ModuleContent = ({ 
  module = DEFAULT_MODULE, 
  onBack, 
  onComplete, 
  isCompleted = false 
}: ModuleContentProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedStep, setSelectedStep] = useState<StepDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getModuleSteps = (moduleId: string): StepDetails[] => {
    const modules: Record<string, StepDetails[]> = {
      'pre-arrival-1': [
        {
          id: 'campus-france',
          title: 'Campus France Registration',
          description: 'Create account and submit application',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">For Indian Students:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Visit <a href="https://www.india.campusfrance.org" class="text-blue-600 underline" target="_blank">Campus France India</a></li>
                <li>Create account on Études en France portal (EEF)</li>
                <li>Pay application fee of ₹18,000 (approx)</li>
                <li>Upload documents:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Passport copy</li>
                    <li>Academic transcripts (attested)</li>
                    <li>IELTS/TOEFL scores (min 6.5 bands)</li>
                    <li>Statement of Purpose</li>
                    <li>Recommendation letters</li>
                  </ul>
                </li>
                <li>Schedule interview at nearest Campus France office (Delhi, Mumbai, Bangalore, Kolkata)</li>
                <li>Receive approval within 15-20 working days</li>
              </ol>
              <div class="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 class="font-medium text-yellow-800">Pro Tip:</h4>
                <p class="text-yellow-700 text-sm">Apply at least 3 months before intake as interview slots fill quickly.</p>
              </div>
            </div>
          `
        },
        {
          id: 'vfs',
          title: 'VFS Appointment',
          description: 'Book and attend visa appointment',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">VFS Process for Indian Students:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>After Campus France approval, login to <a href="https://france-visas.gouv.fr" class="text-blue-600 underline" target="_blank">France-Visas</a></li>
                <li>Fill long-stay student visa application (VLS-TS)</li>
                <li>Book appointment at nearest VFS center (11 cities in India)</li>
                <li>Documents required:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Passport (valid 3+ months beyond stay)</li>
                    <li>Campus France ID</li>
                    <li>Admission letter from French institution</li>
                    <li>Financial proof (min ₹60,000/month or blocked account)</li>
                    <li>Flight itinerary (one-way acceptable)</li>
                    <li>Travel insurance (min €30,000 coverage)</li>
                  </ul>
                </li>
                <li>Pay visa fee of €99 (approx ₹8,500)</li>
                <li>Biometric data collection at VFS center</li>
              </ol>
              <div class="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 class="font-medium text-blue-800">Important:</h4>
                <p class="text-blue-700 text-sm">Processing time is 15-21 working days. Premium lounge service available for faster processing.</p>
              </div>
            </div>
          `
        },
        {
          id: 'documents',
          title: 'Document Preparation',
          description: 'Gather all required documents',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Essential Documents Checklist:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Academic Documents</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>10th & 12th mark sheets (attested)</li>
                    <li>Bachelor's degree/provisional certificate</li>
                    <li>Transcripts (English/French translated)</li>
                    <li>IELTS/TOEFL/DELF scorecards</li>
                    <li>GRE/GMAT (if applicable)</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Financial Documents</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Bank statements (last 6 months)</li>
                    <li>Education loan sanction letter (if any)</li>
                    <li>Sponsorship letter (notarized)</li>
                    <li>Income tax returns (parents/self)</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Identity Documents</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Passport (valid 3+ months)</li>
                    <li>PAN card copy</li>
                    <li>Aadhaar card copy</li>
                    <li>Birth certificate</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Other Documents</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>SOP (500-1000 words)</li>
                    <li>LORs (2-3 academic/professional)</li>
                    <li>CV/Resume (Europass format preferred)</li>
                    <li>Passport-size photos (35x45mm white background)</li>
                  </ul>
                </div>
              </div>
              <div class="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 class="font-medium text-red-800">Note:</h4>
                <p class="text-red-700 text-sm">All documents must be notarized if in Hindi/regional languages. French translations required for some documents.</p>
              </div>
            </div>
          `
        },
        {
          id: 'visa-fee',
          title: 'Visa Fee Payment',
          description: 'Pay visa processing fees',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Payment Process for Indian Students:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Visa application fee: €99 (approx ₹8,500)</li>
                <li>Payment methods:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Online payment via France-Visas portal (international cards)</li>
                    <li>Demand Draft in favor of "VFS Global"</li>
                    <li>Cash payment at VFS center (only some locations)</li>
                  </ul>
                </li>
                <li>Campus France fee: ₹18,000 (non-refundable)</li>
                <li>VFS service charge: ₹1,800 (approx)</li>
                <li>SMS/email alerts: ₹300 (optional)</li>
                <li>Courier service: ₹800 (optional)</li>
              </ol>
              <div class="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 class="font-medium text-green-800">Tip:</h4>
                <p class="text-green-700 text-sm">Keep multiple payment options ready. International transaction fees may apply (inform your bank beforehand).</p>
              </div>
            </div>
          `
        }
      ],
      'pre-arrival-2': [
        {
          id: 'clothing',
          title: 'Climate-Appropriate Clothing',
          description: 'Pack clothes suitable for French weather',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Packing Guide for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Essential Clothing</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Winter (Nov-Mar):</strong> Thermal innerwear (2-3 sets), heavy woolen sweaters, down jacket (-5°C rating), gloves, muffler, woolen cap</li>
                    <li><strong>Rainy:</strong> Waterproof jacket with hood, umbrella, waterproof shoes</li>
                    <li><strong>Formal:</strong> 2-3 sets of formal wear for presentations</li>
                    <li><strong>Traditional:</strong> 1-2 Indian outfits for festivals</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Regional Variations</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Paris/North:</strong> Colder winters (pack more thermals)</li>
                    <li><strong>South France:</strong> Milder winters but rainy</li>
                    <li><strong>Alps region:</strong> Heavy snow gear if studying near mountains</li>
                  </ul>
                </div>
              </div>
              <div class="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 class="font-medium text-purple-800">Indian Student Tip:</h4>
                <p class="text-purple-700 text-sm">Bring comfortable sandals (like Hawai chappals) as they're expensive in France. Pack extra socks - French winters demand frequent changes.</p>
              </div>
            </div>
          `
        },
        {
          id: 'food-research',
          title: 'Food & Dietary Research',
          description: 'Learn about French cuisine and dietary options',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Food Guide for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">What to Bring From India</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Spices: Turmeric, red chili, garam masala, sambar powder (500g each)</li>
                    <li>Ready-to-eat: 10-15 MTR/Haldiram's packets for initial days</li>
                    <li>Pickles: 2-3 bottles (ensure proper sealing)</li>
                    <li>Special items: Poha, upma mix, chai masala</li>
                    <li>Pressure cooker gasket (hard to find in France)</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Indian Stores in France</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Paris:</strong> Passage Brady (Little India), Tang Frères</li>
                    <li><strong>Lyon:</strong> Épicerie Bollywood</li>
                    <li><strong>Toulouse:</strong> Namaste India</li>
                    <li>Online: <a href="https://www.indealacarte.com" class="text-blue-600 underline" target="_blank">Inde à la Carte</a></li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">Budget Eating Tips</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>University restaurants (RU) offer meals for €3.30</li>
                  <li>Learn to cook basic French dishes (ratatouille, quiche)</li>
                  <li>Sunday markets offer cheapest fresh produce</li>
                  <li>Halal meat widely available in most cities</li>
                </ul>
              </div>
              <div class="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 class="font-medium text-yellow-800">Important:</h4>
                <p class="text-yellow-700 text-sm">Declare all food items at customs. Meat/dairy products are prohibited. Pack spices in original sealed packets.</p>
              </div>
            </div>
          `
        },
        {
          id: 'cultural-prep',
          title: 'Cultural Preparation',
          description: 'Understand French customs and etiquette',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Cultural Guide for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Social Etiquette</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Greetings:</strong> Always say "Bonjour" when entering shops</li>
                    <li><strong>Cheek kisses:</strong> 2-4 depending on region (observe first)</li>
                    <li><strong>Punctuality:</strong> Being late is rude (unlike Indian standard time)</li>
                    <li><strong>Personal space:</strong> Maintain more distance than in India</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Academic Culture</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>First-name basis with professors is common</li>
                    <li>Independent learning expected (less hand-holding)</li>
                    <li>Strict plagiarism rules (use proper citations)</li>
                    <li>Class participation is often graded</li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">Indian Community Support</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>Join university Indian student associations</li>
                  <li>Facebook groups: "Indians in Paris/Lyon" etc.</li>
                  <li>Temples: ISKCON Paris, Sri Manicka Vinayakar Alayam</li>
                  <li>Indian festivals celebrated in major cities</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 class="font-medium text-blue-800">Culture Shock Alert:</h4>
                <p class="text-blue-700 text-sm">Sunday closures are strict - stock groceries. French directness isn't rudeness. Alcohol is common in social events but not mandatory.</p>
              </div>
            </div>
          `
        },
        {
          id: 'language-basics',
          title: 'Basic French Learning',
          description: 'Learn essential French phrases',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Survival French for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Essential Phrases</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Bonjour</strong> (Hello) - Use until evening</li>
                    <li><strong>Je ne parle pas français</strong> (I don't speak French)</li>
                    <li><strong>Où est...?</strong> (Where is...?) [metro/toilet]</li>
                    <li><strong>Combien ça coûte?</strong> (How much does it cost?)</li>
                    <li><strong>L'addition, s'il vous plaît</strong> (Bill please)</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Academic Terms</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Amphi</strong> (Lecture hall)</li>
                    <li><strong>TD</strong> (Tutorial class)</li>
                    <li><strong>Partiel</strong> (Mid-term exam)</li>
                    <li><strong>Stage</strong> (Internship)</li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">Learning Resources</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Apps:</strong> Duolingo, Memrise (focus on pronunciation)</li>
                  <li><strong>YouTube:</strong> "Learn French with Vincent"</li>
                  <li><strong>University:</strong> Free French courses (check your établissement)</li>
                  <li><strong>Exchange:</strong> Tandem language partners</li>
                </ul>
              </div>
              <div class="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 class="font-medium text-green-800">Pro Tip:</h4>
                <p class="text-green-700 text-sm">Even basic French earns respect. Learn numbers for prices and "Je suis végétarien(ne)" if vegetarian. Most Indians pick up conversational French in 3-6 months.</p>
              </div>
            </div>
          `
        }
      ],
      'post-arrival': [
        {
          id: 'bank-account',
          title: 'Open Bank Account',
          description: 'Set up French bank account',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Banking Guide for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Student-Friendly Banks</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Société Générale:</strong> Campus account (no fees first year)</li>
                    <li><strong>BNP Paribas:</strong> Good international transfers</li>
                    <li><strong>LCL:</strong> Many campus branches</li>
                    <li><strong>Online:</strong> Revolut France (for currency exchange)</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Required Documents</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Passport + visa</li>
                    <li>Proof of enrollment (certificat de scolarité)</li>
                    <li>French address proof (EDF bill/lease)</li>
                    <li>Indian address proof (Aadhaar translated)</li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">Process Timeline</h4>
                <ol class="list-decimal pl-5 space-y-1 text-sm">
                  <li>Book appointment (1-2 week wait)</li>
                  <li>Sign contract (30-45 min meeting)</li>
                  <li>Receive RIB immediately</li>
                  <li>Get card by mail in 7-10 days</li>
                  <li>Activate online banking</li>
                </ol>
              </div>
              <div class="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 class="font-medium text-red-800">Important:</h4>
                <p class="text-red-700 text-sm">Ask about international transfer fees. Inform Indian bank about foreign transactions. Initial deposit usually €50-100.</p>
              </div>
            </div>
          `
        },
        {
          id: 'ssn-equivalent',
          title: 'Social Security Number',
          description: 'Obtain French social security number',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Social Security Registration:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Automatic for EU students via EHIC card</li>
                <li>Non-EU students register at:
                  <a href="https://etudiant-etranger.ameli.fr" class="text-blue-600 underline block" target="_blank">Ameli Foreign Student Portal</a>
                </li>
                <li>Required documents:
                  <ul class="list-disc pl-5 mt-1 text-sm">
                    <li>Passport copy</li>
                    <li>Visa (mentioning "étudiant")</li>
                    <li>Birth certificate (translated)</li>
                    <li>Proof of enrollment</li>
                    <li>RIB (bank details)</li>
                  </ul>
                </li>
                <li>Receive temporary number by email in 2-3 weeks</li>
                <li>Physical Carte Vitale arrives by mail in 2-3 months</li>
              </ol>
              <div class="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 class="font-medium text-purple-800">Indian Students Note:</h4>
                <p class="text-purple-700 text-sm">Healthcare reimbursement is 70% initially. Get complementary mutuelle insurance (LMDE/SMERRA) for full coverage (€20-30/month).</p>
              </div>
            </div>
          `
        },
        {
          id: 'insurance',
          title: 'Health Insurance',
          description: 'Enroll in French health insurance',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Health Insurance Options:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Public Insurance (Sécurité Sociale)</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Mandatory for all students</li>
                    <li>Covers 70% of medical costs</li>
                    <li>Free for students under 28</li>
                    <li>Register via Ameli website</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Complementary Insurance (Mutuelle)</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Covers remaining 30%</li>
                    <li>Popular providers: LMDE, SMERRA</li>
                    <li>Cost: €20-50/month</li>
                    <li>Includes dental/vision coverage</li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">For Indian Students</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>Indian insurance not accepted for visa extension</li>
                  <li>Keep Indian travel insurance for initial 3 months</li>
                  <li>Pre-existing conditions must be declared</li>
                  <li>Pharmacies provide first aid for free</li>
                </ul>
              </div>
              <div class="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 class="font-medium text-yellow-800">Emergency Numbers:</h4>
                <p class="text-yellow-700 text-sm">15 (Medical), 17 (Police), 18 (Fire). EU-wide emergency: 112. Indian Embassy in Paris: +33 1 40 50 70 70.</p>
              </div>
            </div>
          `
        },
        {
          id: 'caf',
          title: 'CAF Application',
          description: 'Apply for housing assistance (CAF)',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">CAF Guide for Indian Students:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Eligibility:
                  <ul class="list-disc pl-5 mt-1 text-sm">
                    <li>Must have valid long-stay visa</li>
                    <li>Lease in your name (or sublet with owner's permission)</li>
                    <li>Income below €7,500/year (typical for students)</li>
                  </ul>
                </li>
                <li>Apply online at:
                  <a href="https://www.caf.fr" class="text-blue-600 underline block" target="_blank">CAF Website</a>
                </li>
                <li>Required documents:
                  <ul class="list-disc pl-5 mt-1 text-sm">
                    <li>Passport + visa copies</li>
                    <li>Lease contract (bail)</li>
                    <li>Landlord attestation (if subletting)</li>
                    <li>RIB (bank details)</li>
                    <li>Proof of enrollment</li>
                  </ul>
                </li>
                <li>Processing time: 2-4 months</li>
                <li>Average benefit: €100-250/month</li>
              </ol>
              <div class="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 class="font-medium text-green-800">Pro Tip:</h4>
                <p class="text-green-700 text-sm">Apply immediately after getting lease - benefits are retroactive. Use Google Translate on CAF website. Keep following up via messages.</p>
              </div>
            </div>
          `
        },
        {
          id: 'phone-plan',
          title: 'Phone Plan',
          description: 'Set up French mobile phone plan',
          content: `
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Mobile Plans for Indian Students:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Prepaid Options</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Lebara:</strong> €10/month (100min, 5GB)</li>
                    <li><strong>Lycamobile:</strong> Cheap international calls</li>
                    <li>Available at tabacs/tobacco shops</li>
                    <li>No contract, no French bank needed</li>
                  </ul>
                </div>
                <div class="border rounded-md p-3">
                  <h4 class="font-medium mb-2">Monthly Plans</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Free Mobile:</strong> €20/month (100GB, unlimited EU calls)</li>
                    <li><strong>SFR:</strong> Student discounts available</li>
                    <li><strong>Orange:</strong> Best coverage but expensive</li>
                    <li>Require French bank account for auto-debit</li>
                  </ul>
                </div>
              </div>
              <div class="border rounded-md p-3">
                <h4 class="font-medium mb-2">Indian SIM Tips</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>Port Indian number to Jio/Airtel International Roaming</li>
                  <li>Use WhatsApp calling for India contacts</li>
                  <li>Buy dual SIM phone in India (one for French, one for Indian OTPs)</li>
                  <li>International calling cards available at Indian stores</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 class="font-medium text-blue-800">Warning:</h4>
                <p class="text-blue-700 text-sm">Avoid buying phones from French carriers - they're locked to networks. Bring an unlocked phone from India.</p>
              </div>
            </div>
          `
        }
      ],
      'default': [
        {
          id: 'step1',
          title: 'Getting Started',
          description: 'Initial setup and preparation',
          content: '<p>Default content for step 1</p>'
        },
        {
          id: 'step2',
          title: 'Main Process',
          description: 'Complete the main requirements',
          content: '<p>Default content for step 2</p>'
        },
        {
          id: 'step3',
          title: 'Finalization',
          description: 'Wrap up and confirm completion',
          content: '<p>Default content for step 3</p>'
        }
      ]
    };

    return modules[moduleId] || modules['default'];
  };

  const steps = getModuleSteps(module.id);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleModuleComplete = () => {
    onComplete(module.id);
  };

  const openStepDetails = (step: StepDetails) => {
    setSelectedStep(step);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
      </div>

      <div className={`bg-gradient-to-r ${module.color} rounded-lg p-8 text-white mb-8`}>
        <div className="flex items-center mb-4">
          <div className="text-6xl mr-4">{module.icon}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-xl opacity-90">{module.description}</p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-4 bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Module Completed! You earned a key 🗝️</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isStepCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id} 
              className={`${isStepCompleted ? 'ring-2 ring-green-500' : ''} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => openStepDetails(step)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepComplete(step.id);
                        }}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedStep?.title}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDialogOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedStep?.content && (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedStep.content }}
            />
          )}
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => {
                if (selectedStep?.id && !completedSteps.includes(selectedStep.id)) {
                  handleStepComplete(selectedStep.id);
                }
                setIsDialogOpen(false);
              }}
              disabled={selectedStep?.id && completedSteps.includes(selectedStep.id)}
            >
              {selectedStep?.id && completedSteps.includes(selectedStep.id) 
                ? 'Step Completed' 
                : 'Mark as Complete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8 text-center">
        {completedSteps.length === steps.length && !isCompleted && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  All Steps Completed!
                </h3>
                <p className="text-green-700 mb-4">
                 