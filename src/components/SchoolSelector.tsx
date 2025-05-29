
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Users } from 'lucide-react';

interface SchoolSelectorProps {
  onBack: () => void;
  onSchoolSelect: (school: any) => void;
}

export const SchoolSelector = ({ onBack, onSchoolSelect }: SchoolSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = {
    'paris': {
      name: 'Paris',
      description: 'The capital city with numerous prestigious business schools',
      schools: [
        {
          id: 'hec-paris',
          name: 'HEC Paris',
          description: 'One of Europe\'s leading business schools',
          location: 'Jouy-en-Josas',
          ranking: '#1 in France',
          programs: ['MBA', 'Grande École', 'Executive Education'],
          tuition: '€47,000 - €89,000',
          image: '🏫'
        },
        {
          id: 'essec',
          name: 'ESSEC Business School',
          description: 'Global business school with innovation focus',
          location: 'Cergy-Pontoise',
          ranking: '#2 in France',
          programs: ['Grande École', 'MBA', 'Master in Management'],
          tuition: '€39,000 - €75,000',
          image: '🎓'
        },
        {
          id: 'escp',
          name: 'ESCP Business School',
          description: 'World\'s first business school, founded in 1819',
          location: 'Paris',
          ranking: '#3 in France',
          programs: ['Master in Management', 'MBA', 'Executive MBA'],
          tuition: '€35,000 - €65,000',
          image: '📚'
        }
      ]
    },
    'lyon': {
      name: 'Lyon',
      description: 'France\'s gastronomic capital with excellent business schools',
      schools: [
        {
          id: 'emlyon',
          name: 'emlyon business school',
          description: 'Leading school for entrepreneurship and innovation',
          location: 'Lyon/Paris',
          ranking: '#4 in France',
          programs: ['Grande École', 'Global MBA', 'Executive Education'],
          tuition: '€36,000 - €72,000',
          image: '🏢'
        },
        {
          id: 'skema-lyon',
          name: 'SKEMA Business School',
          description: 'Global business school with multiple campuses',
          location: 'Lyon',
          ranking: '#7 in France',
          programs: ['Master in Management', 'MBA', 'MSc Programs'],
          tuition: '€28,000 - €55,000',
          image: '🌍'
        }
      ]
    },
    'reims': {
      name: 'Reims',
      description: 'Historic city in Champagne region with top business schools',
      schools: [
        {
          id: 'neoma',
          name: 'NEOMA Business School',
          description: 'Result of merger between Reims MS and Rouen BS',
          location: 'Reims/Rouen/Paris',
          ranking: '#6 in France',
          programs: ['Grande École', 'Global MBA', 'Master in Management'],
          tuition: '€32,000 - €62,000',
          image: '🥂'
        }
      ]
    }
  };

  if (selectedCity && cities[selectedCity]) {
    const cityData = cities[selectedCity];
    
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCity(null)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cities
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {cityData.name} Business Schools
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityData.schools.map((school) => (
            <Card 
              key={school.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => onSchoolSelect(school)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{school.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{school.description}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{school.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-green-600 font-medium">{school.ranking}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{school.tuition}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">Programs Offered:</div>
                  <div className="flex flex-wrap gap-1">
                    {school.programs.slice(0, 2).map((program) => (
                      <span 
                        key={program}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {program}
                      </span>
                    ))}
                    {school.programs.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{school.programs.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <Button className="w-full mt-4" size="sm">
                  View Details
                </Button>
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
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Select Your City</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cities).map(([cityKey, city]) => (
          <Card 
            key={cityKey}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedCity(cityKey)}
          >
            <CardContent className="p-6">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🏛️</div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{city.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{city.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {city.schools.length} Schools
                </span>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
