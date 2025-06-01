import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Building2, Users, Info } from 'lucide-react';

interface School {
  id: string;
  name: string;
  description: string;
  location: string;
  ranking?: string;
  tuition?: string;
  programs: string[];
}

interface LocalInsight {
  title: string;
  description: string;
  tips: string[];
}

interface City {
  name: string;
  description: string;
  emoji: string;
  schools: School[];
  localInsights: LocalInsight[];
}

interface SchoolSelectorProps {
  onBack: () => void;
  onSchoolSelect: (school: School) => void;
}

export const SchoolSelector = ({ onBack, onSchoolSelect }: SchoolSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const cities: Record<string, City> = {
    paris: {
      name: 'Paris',
      description: 'Capital city with top-tier schools in all domains',
      emoji: '🇫🇷',
      schools: [
        { id: 'sorbonne', name: 'Sorbonne University', description: 'Humanities, sciences, and medicine', location: 'Paris', programs: ['Humanities', 'Science', 'Medicine'] },
        { id: 'psl', name: 'PSL University', description: 'Includes ENS, Dauphine, Mines ParisTech', location: 'Paris', programs: ['Science', 'Economics', 'Engineering'] },
        { id: 'polytechnique', name: 'École Polytechnique', description: 'Elite engineering grande école', location: 'Palaiseau (Paris area)', programs: ['Engineering', 'Science', 'Economics'] },
        { id: 'hec-paris', name: 'HEC Paris', description: 'Top global business school', location: 'Jouy-en-Josas', programs: ['MBA', 'Grande École'] },
        { id: 'escp', name: 'ESCP Business School', description: 'Multi-campus, Paris is the flagship', location: 'Paris', programs: ['MIM', 'MBA'] },
        { id: 'sciencespo-paris', name: 'Sciences Po Paris', description: 'Political science, international affairs', location: 'Paris', programs: ['Politics', 'International Affairs'] },
        { id: 'neoma-paris', name: 'NEOMA Business School (Paris)', description: 'Executive & MSc programs', location: 'Paris', programs: ['MSc', 'Executive'] },
        { id: 'telecom-paris', name: 'Télécom Paris', description: 'Tech-focused grande école', location: 'Paris', programs: ['Engineering', 'Telecom'] },
        { id: 'essec', name: 'ESSEC Business School', description: 'Cergy campus in Paris region', location: 'Cergy', programs: ['MIM', 'MBA', 'MSc'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Paris efficiently with metro, buses, and bikes",
          tips: [
            "Get a Navigo weekly/monthly pass for unlimited metro travel",
            "Use Citymapper app for real-time transport information",
            "Vélib' bikes are perfect for short distances",
            "Night buses (Noctilien) run when metro is closed"
          ]
        },
        {
          title: "Housing",
          description: "Finding accommodation in the competitive Paris market",
          tips: [
            "Start looking 2-3 months before arrival",
            "Use platforms like LeBonCoin, SeLoger, PAP",
            "Consider student residences (CROUS) for affordable options",
            "Budget 30-40% of income for rent"
          ]
        },
        {
          title: "Student Life",
          description: "Making the most of student life in Paris",
          tips: [
            "Join student associations (BDE) at your school",
            "Take advantage of student discounts everywhere",
            "Visit museums on first Sunday mornings (often free)",
            "Explore different neighborhoods - each has its character"
          ]
        }
      ]
    },
    lyon: {
      name: 'Lyon',
      description: 'Hub of engineering, medicine, and business',
      emoji: '🇫🇷',
      schools: [
        { id: 'centrale-lyon', name: 'École Centrale de Lyon', description: 'Engineering and applied sciences', location: 'Lyon', programs: ['Engineering'] },
        { id: 'insa-lyon', name: 'INSA Lyon', description: 'Public engineering school', location: 'Lyon', programs: ['Engineering'] },
        { id: 'claude-bernard', name: 'Université Claude Bernard Lyon 1', description: 'Sciences and medicine', location: 'Lyon', programs: ['Medicine', 'Science'] },
        { id: 'em-lyon', name: 'EM Lyon Business School', description: 'Prestigious business Grande École', location: 'Lyon', programs: ['MBA', 'MSc'] },
        { id: 'lumiere-lyon2', name: 'Université Lumière Lyon 2', description: 'Social sciences and arts', location: 'Lyon', programs: ['Arts', 'Social Sciences'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Efficient public transport system in Lyon",
          tips: [
            "TCL card covers metro, tram, and bus",
            "Vélo'v bike sharing system throughout the city",
            "Walking is pleasant in the city center",
            "Student discounts available on monthly passes"
          ]
        },
        {
          title: "Food Culture",
          description: "Lyon is the gastronomic capital of France",
          tips: [
            "Try traditional Lyonnaise cuisine in 'bouchons'",
            "Visit Les Halles de Lyon food market",
            "Student restaurants offer affordable meals",
            "Many restaurants offer student menus"
          ]
        }
      ]
    },
    toulouse: {
      name: 'Toulouse',
      description: 'Leading aerospace and tech education hub',
      emoji: '🇫🇷',
      schools: [
        { id: 'supaero', name: 'ISAE-SUPAERO', description: 'Top aerospace engineering school', location: 'Toulouse', programs: ['Aerospace Engineering'] },
        { id: 'insa-toulouse', name: 'INSA Toulouse', description: 'Public engineering school', location: 'Toulouse', programs: ['Engineering'] },
        { id: 'paul-sabatier', name: 'Université Toulouse III – Paul Sabatier', description: 'Science, tech, health', location: 'Toulouse', programs: ['Science', 'Technology', 'Health'] },
        { id: 'tbs', name: 'TBS Education', description: 'Grande École business program', location: 'Toulouse', programs: ['Business'] },
        { id: 'capitole', name: 'Université Toulouse 1 Capitole', description: 'Law, economics, management', location: 'Toulouse', programs: ['Law', 'Economics', 'Management'] }
      ],
      localInsights: [
        {
          title: "Aerospace Industry",
          description: "Hub of European aerospace with Airbus",
          tips: [
            "Visit Cité de l'espace for aerospace inspiration",
            "Network with aerospace professionals",
            "Internship opportunities at Airbus and suppliers",
            "Join aerospace student clubs"
          ]
        }
      ]
    },
    rouen: {
      name: 'Rouen',
      description: 'Historic city with modern business and tech schools',
      emoji: '🇫🇷',
      schools: [
        { id: 'neoma-rouen', name: 'NEOMA Business School (Main campus)', description: 'PGE, MSc, BBA programs', location: 'Rouen', programs: ['PGE', 'MSc', 'BBA'] },
        { id: 'insa-rouen', name: 'INSA Rouen Normandie', description: 'Engineering across multiple domains', location: 'Rouen', programs: ['Engineering'] },
        { id: 'rouen-univ', name: 'Université de Rouen Normandie', description: 'Comprehensive university', location: 'Rouen', programs: ['Various'] },
        { id: 'esigelec', name: 'ESIGELEC Rouen', description: 'Electronics and digital tech', location: 'Rouen', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Cost of Living",
          description: "More affordable than Paris with good quality of life",
          tips: [
            "Lower rent prices compared to Paris",
            "Good public transportation",
            "Close to Paris (1.5 hours by train)",
            "Rich historical and cultural heritage"
          ]
        }
      ]
    },
    reims: {
      name: 'Reims',
      description: 'Business and international affairs education hub',
      emoji: '🇫🇷',
      schools: [
        { id: 'neoma-reims', name: 'NEOMA Business School (Reims)', description: 'Core business programs', location: 'Reims', programs: ['Business', 'MBA', 'MSc'] },
        { id: 'sciencespo-reims', name: 'Sciences Po Campus Reims', description: 'International program focus', location: 'Reims', programs: ['Politics', 'Global Affairs'] },
        { id: 'reims-univ', name: 'Université de Reims Champagne-Ardenne', description: 'Regional public university', location: 'Reims', programs: ['Various'] },
        { id: 'esiec', name: 'ESIEC Reims', description: 'Packaging and digital engineering', location: 'Reims', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Champagne Culture",
          description: "Heart of the Champagne region",
          tips: [
            "Visit champagne houses for tours",
            "Learn about wine culture and history",
            "Network at wine-related events",
            "Affordable student life in smaller city"
          ]
        }
      ]
    },
    lille: {
      name: 'Lille',
      description: 'Northern hub for business and engineering education',
      emoji: '🇫🇷',
      schools: [
        { id: 'lille-univ', name: 'Université de Lille', description: 'Large multidisciplinary public university', location: 'Lille', programs: ['Various'] },
        { id: 'edhec-lille', name: 'EDHEC Business School', description: 'Top 5 French business school', location: 'Lille', programs: ['MBA', 'MSc', 'Finance'] },
        { id: 'centrale-lille', name: 'École Centrale de Lille', description: 'Elite engineering school', location: 'Lille', programs: ['Engineering'] },
        { id: 'ieseg', name: 'IESEG School of Management', description: 'AACSB-accredited Grande École', location: 'Lille', programs: ['Management', 'MSc'] },
        { id: 'hei', name: 'HEI – Hautes Études d\'Ingénieur', description: 'Private engineering school', location: 'Lille', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "European Location",
          description: "Gateway to Europe with excellent connections",
          tips: [
            "Close to Belgium, Netherlands, UK",
            "High-speed train connections",
            "Vibrant student nightlife",
            "Lower cost of living"
          ]
        }
      ]
    },
    strasbourg: {
      name: 'Strasbourg',
      description: 'Prestigious academic and international region',
      emoji: '🇫🇷',
      schools: [
        { id: 'strasbourg-univ', name: 'Université de Strasbourg', description: 'Prestigious university, strong in sciences and humanities', location: 'Strasbourg', programs: ['Science', 'Humanities'] },
        { id: 'insa-strasbourg', name: 'INSA Strasbourg', description: 'Part of the INSA engineering network', location: 'Strasbourg', programs: ['Engineering'] },
        { id: 'em-strasbourg', name: 'EM Strasbourg Business School', description: 'Business school within the university', location: 'Strasbourg', programs: ['Business'] },
        { id: 'sciencespo-strasbourg', name: 'Sciences Po Strasbourg', description: 'Regional campus of Sciences Po', location: 'Strasbourg', programs: ['Politics'] }
      ],
      localInsights: [
        {
          title: "European Capital",
          description: "Home to European institutions",
          tips: [
            "Internship opportunities at EU institutions",
            "Bilingual French-German environment",
            "Strong international student community",
            "Beautiful historic city center"
          ]
        }
      ]
    },
    bordeaux: {
      name: 'Bordeaux',
      description: 'Southwest academic powerhouse in sciences and business',
      emoji: '🇫🇷',
      schools: [
        { id: 'bordeaux-univ', name: 'Université de Bordeaux', description: 'Comprehensive research university', location: 'Bordeaux', programs: ['Science', 'Engineering'] },
        { id: 'kedge-bordeaux', name: 'KEDGE Business School', description: 'Top-tier business school', location: 'Bordeaux', programs: ['MBA', 'MSc'] },
        { id: 'enseirb', name: 'ENSEIRB-MATMECA', description: 'Engineering in IT, electronics, math', location: 'Bordeaux', programs: ['Engineering'] },
        { id: 'sciencespo-bordeaux', name: 'Sciences Po Bordeaux', description: 'Political science and international studies', location: 'Bordeaux', programs: ['Politics'] },
        { id: 'inpbordeaux', name: 'INP Bordeaux', description: 'Engineering network incl. ENSEIRB-MATMECA, ENSCBP', location: 'Bordeaux', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Wine Culture",
          description: "World capital of wine",
          tips: [
            "Learn about wine industry and culture",
            "Visit vineyards and châteaux",
            "Network in wine and luxury industries",
            "Modern tram system for easy transport"
          ]
        }
      ]
    },
    nice: {
      name: 'Nice',
      description: 'Côte d’Azur region with business and engineering strengths',
      emoji: '🇫🇷',
      schools: [
        { id: 'uca', name: 'Université Côte d\'Azur', description: 'Alliance of local institutions under one label', location: 'Nice', programs: ['Various'] },
        { id: 'skema-nice', name: 'SKEMA Business School (Sophia)', description: 'Global business school with AI focus', location: 'Sophia Antipolis', programs: ['Business', 'AI'] },
        { id: 'polytech-nice', name: 'Polytech Nice Sophia', description: 'Engineering school within UCA', location: 'Nice', programs: ['Engineering'] },
        { id: 'edhec-nice', name: 'EDHEC Business School (Nice)', description: 'Specializes in Finance MSc and Global MBA', location: 'Nice', programs: ['Finance', 'MBA'] },
        { id: 'mines-sophia', name: 'Mines Paris – Sophia', description: 'AI and systems engineering research campus', location: 'Sophia Antipolis', programs: ['Engineering', 'AI'] }
      ],
      localInsights: [
        {
          title: "Mediterranean Lifestyle",
          description: "Study with a view of the Mediterranean",
          tips: [
            "Year-round pleasant weather",
            "Beach lifestyle and outdoor activities",
            "Higher cost of living",
            "Tech hub in Sophia Antipolis"
          ]
        }
      ]
    },
    marseille: {
      name: 'Marseille',
      description: 'Mediterranean port city with large academic presence',
      emoji: '🇫🇷',
      schools: [
        { id: 'amu', name: 'Aix-Marseille Université', description: 'One of France’s largest public universities', location: 'Marseille', programs: ['Various'] },
        { id: 'kedge-marseille', name: 'KEDGE Business School (Marseille)', description: 'Major business school', location: 'Marseille', programs: ['Business'] },
        { id: 'centrale-marseille', name: 'École Centrale de Marseille', description: 'Part of the Centrale engineering group', location: 'Marseille', programs: ['Engineering'] },
        { id: 'polytech-marseille', name: 'Polytech Marseille', description: 'Engineering programs under AMU', location: 'Marseille', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Cultural Diversity",
          description: "Multicultural Mediterranean port city",
          tips: [
            "Diverse international community",
            "Lower cost of living than Paris",
            "Rich cultural and artistic scene",
            "Good connections to North Africa and Middle East"
          ]
        }
      ]
    }
  };

  if (selectedSchool) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedSchool(null)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
          </Button>
        </div>

        <div className="rounded-lg p-6 mb-6 text-white bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-3xl font-bold mb-1">{selectedSchool.name}</h1>
          <p className="text-lg mb-1">{selectedSchool.description}</p>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {selectedSchool.location}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">🎓 Programs Offered</h2>
              {selectedSchool.programs.map((prog) => (
                <div key={prog} className="flex justify-between text-sm text-gray-700 border-b py-1">
                  <span>{prog}</span>
                  <span className="text-green-600 font-medium">Available</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">📅 Tuition & Fees</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Application fee: €100–200</li>
                <li>Living expenses: €800–1,200/month</li>
                <li>Books & materials: €500–800/year</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">🌐 Admission Requirements</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Bachelor's degree (any field)</li>
                <li>GMAT/GRE scores</li>
                <li>English proficiency (TOEFL/IELTS)</li>
                <li>Personal statement</li>
                <li>2–3 recommendation letters</li>
                <li>Work experience (preferred)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">📞 Contact Information</h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">📧</span> admissions@{selectedSchool.id}.edu</p>
                <p><span className="font-medium">📱</span> +33 1 XX XX XX XX</p>
                <p><span className="font-medium">🌐</span> www.{selectedSchool.id}.edu</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="font-semibold text-gray-800 text-md mb-3">📌 Application Deadlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-blue-800">Fall Intake</h3>
                <p className="text-sm text-gray-700">September 2025</p>
                <p className="text-xs text-gray-500">Deadline: March 15, 2025</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-green-800">Spring Intake</h3>
                <p className="text-sm text-gray-700">January 2026</p>
                <p className="text-xs text-gray-500">Deadline: October 15, 2025</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-purple-800">Summer Intake</h3>
                <p className="text-sm text-gray-700">June 2025</p>
                <p className="text-xs text-gray-500">Deadline: January 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedCity && cities[selectedCity]) {
    const cityData = cities[selectedCity];
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{cityData.name} - Schools & Local Insights</h1>
        </div>

        {/* Local Insights Section */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityData.name}</h2>
              </div>
              <Button onClick={() => setShowInsights(true)} variant="outline" size="sm">
                View All Tips
              </Button>
            </div>
            <p className="text-gray-600 mb-4">Get insider knowledge about living and studying in {cityData.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cityData.localInsights.slice(0, 3).map((insight, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schools Section */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schools in {cityData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityData.schools.map((school) => (
            <Card key={school.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => setSelectedSchool(school)}>
              <CardContent className="p-6 break-words">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 break-words">{school.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{school.location}</span>
                  </div>
                  {school.ranking && (
                    <div className="flex items-center text-sm">
                      <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-green-600 font-medium">{school.ranking}</span>
                    </div>
                  )}
                  {school.tuition && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{school.tuition}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">Programs Offered:</div>
                  <div className="flex flex-wrap gap-1">
                    {school.programs.map((program) => (
                      <span key={program} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Local Insights Modal */}
        <Dialog open={showInsights} onOpenChange={setShowInsights}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Local Insights for {cityData.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {cityData.localInsights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <ul className="space-y-2">
                      {insight.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => selectedCity ? setSelectedCity(null) : onBack()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Select Your City</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cities).map(([cityKey, city]) => (
          <Card key={cityKey} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => setSelectedCity(cityKey)}>
            <CardContent className="p-6">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-xl font-bold text-white">{city.name}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{city.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{city.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{city.schools.length} Schools</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Local Tips</span>
                </div>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
