import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Users } from 'lucide-react';

interface School {
  id: string;
  name: string;
  description: string;
  location: string;
  ranking?: string;
  tuition?: string;
  programs: string[];
}

interface City {
  name: string;
  description: string;
  emoji: string;
  schools: School[];
}

interface SchoolSelectorProps {
  onBack: () => void;
  onSchoolSelect: (school: School) => void;
}

export const SchoolSelector = ({ onBack, onSchoolSelect }: SchoolSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

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
          <h1 className="text-2xl font-bold text-gray-900">{cityData.name} Schools</h1>
        </div>

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
                <div className="text-4xl">{city.emoji}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{city.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{city.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{city.schools.length} Schools</span>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
