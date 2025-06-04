
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Users, BookOpen, Star } from 'lucide-react';

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export const SchoolInsightsPage = ({ onBack }: SchoolInsightsPageProps) => {
  const schools = [
    {
      name: "Sorbonne Université",
      city: "Paris",
      rating: 4.8,
      students: 55000,
      programs: ["Engineering", "Medicine", "Sciences", "Humanities"],
      description: "One of France's most prestigious universities with a rich history dating back to 1257."
    },
    {
      name: "École Polytechnique",
      city: "Palaiseau",
      rating: 4.9,
      students: 3000,
      programs: ["Engineering", "Mathematics", "Physics", "Computer Science"],
      description: "Elite engineering school known for producing top engineers and scientists."
    },
    {
      name: "Sciences Po",
      city: "Paris",
      rating: 4.7,
      students: 14000,
      programs: ["Political Science", "International Relations", "Economics", "Law"],
      description: "Premier institution for political and social sciences education."
    }
  ];

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
            🏫 School & Local Insights
          </h1>
          <p className="text-lg text-gray-600">
            Explore French schools and get local insights for each city
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{school.name}</CardTitle>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {school.city}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">{school.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{school.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{school.students.toLocaleString()} students</span>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Programs:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {school.programs.map((program, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
