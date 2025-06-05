
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, ShoppingBag, Utensils, BookOpen, Filter } from 'lucide-react';

interface PreArrival2PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const PreArrival2Page = ({ onBack, onComplete, isCompleted }: PreArrival2PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = ['all', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'];

  const categories = [
    {
      id: 'food',
      title: "Food Preparation",
      icon: Utensils,
      color: "text-orange-600",
      items: [
        { text: "Research French cuisine and dietary options", city: "all" },
        { text: "Learn about halal/vegetarian food availability", city: "all" },
        { text: "Pack essential spices and specialty ingredients", city: "all" },
        { text: "Understand French meal times and customs", city: "all" },
        { text: "Find Asian grocery stores in Paris (13th arrondissement)", city: "Paris" },
        { text: "Locate halal butchers in Lyon (7th arrondissement)", city: "Lyon" },
        { text: "Research Mediterranean cuisine in Marseille", city: "Marseille" }
      ]
    },
    {
      id: 'clothing',
      title: "Clothing & Weather",
      icon: ShoppingBag,
      color: "text-blue-600",
      items: [
        { text: "Pack weather-appropriate clothing for all seasons", city: "all" },
        { text: "Bring formal attire for presentations/events", city: "all" },
        { text: "Include comfortable walking shoes", city: "all" },
        { text: "Pack thermal clothing for winter months", city: "all" },
        { text: "Prepare for Parisian fashion standards", city: "Paris" },
        { text: "Pack lighter clothing for Nice's Mediterranean climate", city: "Nice" },
        { text: "Bring rain gear for frequent showers in Nantes", city: "Nantes" }
      ]
    },
    {
      id: 'cultural',
      title: "Cultural Preparation",
      icon: BookOpen,
      color: "text-purple-600",
      items: [
        { text: "Learn basic French phrases and greetings", city: "all" },
        { text: "Understand French social customs and etiquette", city: "all" },
        { text: "Research local traditions and holidays", city: "all" },
        { text: "Familiarize yourself with French educational system", city: "all" },
        { text: "Learn about Parisian metro etiquette", city: "Paris" },
        { text: "Understand Lyon's gastronomic culture", city: "Lyon" },
        { text: "Research Strasbourg's German-French blend", city: "Strasbourg" }
      ]
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getFilteredItems = (items: any[]) => {
    if (selectedCity === 'all') return items;
    return items.filter(item => item.city === 'all' || item.city === selectedCity);
  };

  const allStepsCompleted = completedSteps.length >= 12; // Minimum steps to complete

  return (
    <div className="max-w-4xl mx-auto">
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
            🎒 Pre-Arrival Checklist (Part 2)
          </h1>
          <p className="text-lg text-gray-600">
            Food, clothes, and cultural preparation
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

        {/* City Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by City:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(city)}
                className="capitalize"
              >
                {city === 'all' ? 'All Cities' : city}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const filteredItems = getFilteredItems(category.items);
          
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon className={`h-6 w-6 mr-3 ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredItems.map((item, itemIndex) => {
                    const stepId = `${category.id}-${itemIndex}`;
                    const isStepCompleted = completedSteps.includes(stepId);
                    
                    return (
                      <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-start">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            isStepCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {isStepCompleted ? <CheckCircle className="h-3 w-3" /> : '•'}
                          </div>
                          <div>
                            <span className="text-gray-700">{item.text}</span>
                            {item.city !== 'all' && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {item.city}
                              </span>
                            )}
                          </div>
                        </div>
                        {!isStepCompleted && (
                          <Button 
                            size="sm"
                            onClick={() => handleStepComplete(stepId)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    );
                  })}
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
              Great Progress!
            </h3>
            <p className="text-green-700 mb-4">
              You've completed enough steps in this module.
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

      <Card className="mt-8 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Pack light - you can buy most things in France</li>
            <li>• Bring a universal adapter for your electronics</li>
            <li>• Consider shipping some items ahead to reduce luggage weight</li>
            <li>• Download offline translation apps before traveling</li>
            <li>• Join French student groups on social media for tips</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} steps completed
      </div>
    </div>
  );
};
