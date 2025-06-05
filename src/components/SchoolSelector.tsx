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
          description: "Navigate Paris efficiently with metro, buses, bikes, and intercity options",
          tips: [
            "Get a Navigo card (€350/year student pass) via the Île-de-France Mobilités app for unlimited Métro, bus, and tram travel",
            "Use Vélib’ bikes through the Vélib’ Métropole app for short trips",
            "FlixBus connects to Lyon, Toulouse, and more from Paris-Bercy Seine—book via the FlixBus app (from €5)",
            "SNCF TGV trains to other cities (e.g., Lyon in 2 hours) via SNCF Connect app"
          ]
        },
        {
          title: "Student Life & Culture",
          description: "Paris blends historic charm with a vibrant student scene",
          tips: [
            "Hang out in the Latin Quarter for cheap eats like falafel (€6-8) at Rue Mouffetard",
            "Join student associations (BDE) at your school for networking",
            "Visit museums like the Louvre for free if you're an EU student under 26",
            "Attend Fête de la Musique (June 21) for free concerts across the city"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation in the city",
          tips: [
            "Book badminton courts at Gymnase Rosa Parks via Anybuddy",
            "Informal cricket games at Bois de Vincennes with expat groups—football is more common",
            "Relax or study at Parc des Buttes-Chaumont with scenic views",
            "Explore must-visit spots like the Eiffel Tower, Notre-Dame, and Sacré-Cœur"
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
            "TCL card (€35/month student pass) via TCL Compte Mobilité app covers metro, tram, and bus",
            "Velo’v bike rentals through the Velo’v app—great for Presqu’île",
            "FlixBus from Lyon Perrache to Paris, Toulouse, etc. (from €15) via FlixBus app",
            "SNCF TGV to Paris in 2 hours—book via SNCF Connect app"
          ]
        },
        {
          title: "Food & Culture",
          description: "Lyon is the gastronomic capital of France",
          tips: [
            "Try Lyonnaise cuisine at bouchons like Le Café des Fédérations (€15 with student discounts)",
            "Visit Les Halles de Lyon food market for local flavors",
            "Attend Fête des Lumières (December 5-8)—volunteer for free access",
            "Hang out at Les Berges du Rhône for cheap drinks and picnics"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Explore parks and sports facilities in Lyon",
          tips: [
            "Book badminton courts at Gymnase Bellecombe via Anybuddy",
            "Parc de la Tête d’Or for informal cricket with expat groups, or rugby",
            "Relax at Parc de la Tête d’Or—enjoy fields, a lake, and a free zoo",
            "Must-visit: Vieux Lyon, Basilique Notre-Dame de Fourvière"
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
          title: "Transportation",
          description: "Get around Toulouse with ease",
          tips: [
            "Tisséo metro, trams, and buses (€15/month student pass) via Tisséo Collectivités app",
            "VélôToulouse bikes through the VélôToulouse app—perfect for flat terrain",
            "FlixBus to Bordeaux, Paris, etc. (from €9) via FlixBus app",
            "SNCF TGV to Paris in 4 hours via SNCF Connect app"
          ]
        },
        {
          title: "Aerospace & Lifestyle",
          description: "Toulouse is a hub for aerospace with a sunny vibe",
          tips: [
            "Visit Cité de l’Espace for aerospace inspiration",
            "Network with Airbus professionals for internships",
            "Enjoy Toulouse Plages (July-August) for free riverbank events",
            "Hang out at Place Saint-Pierre for €2 beers at Le Saint des Seins"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Saint-Sernin via Anybuddy",
            "Prairie des Filtres for informal cricket with expat groups—football is more common",
            "Relax at Jardin des Plantes with open spaces",
            "Must-visit: Basilique de Saint-Sernin, Place du Capitole"
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
          title: "Transportation",
          description: "Navigate Rouen with ease",
          tips: [
            "Astuce network (€30/month student pass) via My Astuce app for TEOR buses, trams, and Calypso shuttle",
            "Lovélo bike rentals through the Lovélo app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from 33 Avenue Champlain",
            "SNCF trains to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Rouen's rich history and events",
          tips: [
            "Attend Jeanne d’Arc Festival (May 31, 2025) for parades and markets",
            "Explore the medieval old town—Rue du Gros-Horloge has €7-10 crêperies",
            "Le Marignan bar near the cathedral offers €3 drinks on Thursdays",
            "Visit Cathédrale Notre-Dame and Jeanne d’Arc Tower"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Saint-Exupéry via local clubs",
            "Jardins de l’Hôtel de Ville for informal cricket with expat groups—rugby is more popular",
            "Relax at Parc de Grammont with trails",
            "Must-visit: Musée des Beaux-Arts for cultural outings"
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
          title: "Transportation",
          description: "Get around Reims efficiently",
          tips: [
            "Citura buses and trams (€25/month student pass) via Citura app",
            "Walk or bike—Reims is compact",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app",
            "SNCF TGV to Paris in 45 minutes via SNCF Connect app"
          ]
        },
        {
          title: "Champagne Culture",
          description: "Immerse in the heart of the Champagne region",
          tips: [
            "Visit champagne houses like Pommery for student tours (€10-15)",
            "Attend Jeanne d’Arc Festival (May 31, 2025) for parades",
            "Enjoy €10 meals at Place Drouet-d’Erlon brasseries",
            "Must-visit: Cathédrale Notre-Dame de Reims, Palais du Tau"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiolettes via university",
            "Parc de Champagne for informal cricket with expat groups",
            "Relax at Parc de la Patte d’Oie with green spaces",
            "Watch Stade de Reims matches—student tickets from €10"
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
          title: "Transportation",
          description: "Navigate Lille and beyond",
          tips: [
            "Transpole metro, trams, and buses (€35/month student pass) via Transpole app",
            "V’Lille bikes through the V’Lille app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from Gare Lille Europe",
            "SNCF TGV to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Lille’s youthful vibe",
          tips: [
            "Visit Braderie de Lille (first weekend of September) for flea markets and music",
            "Enjoy €5-7 kebabs on Rue de Gand",
            "Le Macumba bar in Wazemmes has €2 drink nights",
            "Must-visit: Vieux-Lille, Palais des Beaux-Arts"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Bois Blancs via Anybuddy",
            "Parc de la Citadelle for informal cricket with expat groups",
            "Relax at Parc de la Citadelle with trails and a zoo",
            "Explore Lille Cathedral for a cultural outing"
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
          title: "Transportation",
          description: "Navigate Strasbourg and beyond",
          tips: [
            "CTS trams and buses (€30/month student pass) via CTS app",
            "Vélhop bikes through the Vélhop app",
            "FlixBus to Paris, Lyon, etc. (from €18) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Strasbourg’s French-German mix",
          tips: [
            "Visit Strasbourg Christmas Market (late November-December) for mulled wine",
            "Enjoy tarte flambée at Au Brasseur for €8-10",
            "La Kulture bar near the cathedral hosts student events",
            "Must-visit: Cathédrale Notre-Dame, La Petite France"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Deux Rives via Anybuddy",
            "Parc de l’Orangerie for informal cricket with expat groups",
            "Relax at Parc de l’Orangerie with a lake and storks",
            "Visit European Parliament for a unique experience"
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
          title: "Transportation",
          description: "Get around Bordeaux with ease",
          tips: [
            "TBM trams, buses, and boats (€30/month student pass) via TBM MyCiti app",
            "VCub bikes through the VCub app",
            "FlixBus to Toulouse, Paris, etc. (from €9) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Wine Culture",
          description: "Immerse in Bordeaux’s wine heritage",
          tips: [
            "Visit La Cité du Vin to learn about wine culture",
            "Attend Fête du Vin (June, next in 2026) for tastings",
            "Hang out at Darwin Ecosystem for cheap food trucks",
            "Must-visit: Place de la Bourse, Grosse Cloche"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiers via Anybuddy",
            "Parc Bordelais for informal cricket with expat groups",
            "Relax at Jardin Public with green spaces",
            "Explore €5 sandwiches on Rue Sainte-Catherine"
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
          title: "Transportation",
          description: "Navigate Nice with ease",
          tips: [
            "Lignes d’Azur trams and buses (€25/month student pass) via Lignes d’Azur app",
            "Vélo Bleu bikes through the Vélo Bleu app",
            "FlixBus to Marseille, Paris, etc. (from €9) via FlixBus app",
            "SNCF trains to Marseille in 2.5 hours via SNCF Connect app"
          ]
        },
        {
          title: "Mediterranean Lifestyle",
          description: "Study with a view of the Mediterranean",
          tips: [
            "Enjoy Carnaval de Nice (February) with parades",
            "Grab socca in Vieux Nice for €3-5",
            "Relax on public beaches—bring your own towel",
            "Must-visit: Promenade des Anglais, Castle Hill"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Pasteur via Anybuddy",
            "Parc Estienne d’Orves for informal cricket with expat groups",
            "Relax at Promenade du Paillon with fountains",
            "Visit Vieux Nice for a cultural outing"
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
          title: "Transportation",
          description: "Navigate Marseille with ease",
          tips: [
            "RTM metro, trams, and buses (€30/month student pass) via RTM app",
            "Ferries to Frioul islands (€5) via RTM",
            "FlixBus to Nice, Paris, etc. (from €9) via FlixBus app from Saint Charles",
            "SNCF trains to Paris in 3 hours via SNCF Connect app"
          ]
        },
        {
          title: "Cultural Diversity",
          description: "Experience Marseille’s multicultural vibe",
          tips: [
            "Enjoy Fête de la Saint-Jean (June 23-24) with bonfires",
            "Grab panisses in Le Panier for €3-5",
            "Hang out at Cours Julien for cheap bars and live music",
            "Must-visit: Vieux-Port, Notre-Dame de la Garde, Calanques"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Palais Omnisports Marseille Grand-Est via Anybuddy",
            "Parc Borély for informal cricket with expat groups",
            "Relax at Parc Borély with fields and trails",
            "Explore the diverse food scene with North African flavors"
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