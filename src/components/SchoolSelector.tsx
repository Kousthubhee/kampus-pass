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
    // Remaining cities: Reims, Lille, Strasbourg, Bordeaux, Nice, Marseille can be appended similarly.
  };

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
            <Card key={school.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => onSchoolSelect(school)}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{school.description}</p>
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
        <Button variant="ghost" onClick={onBack} className="mr-4">
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
