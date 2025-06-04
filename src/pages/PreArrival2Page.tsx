
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, ShoppingBag, Utensils, BookOpen } from 'lucide-react';

interface PreArrival2PageProps {
  onBack: () => void;
}

export const PreArrival2Page = ({ onBack }: PreArrival2PageProps) => {
  const categories = [
    {
      title: "Food Preparation",
      icon: Utensils,
      color: "text-orange-600",
      items: [
        "Research French cuisine and dietary options",
        "Learn about halal/vegetarian food availability",
        "Pack essential spices and specialty ingredients",
        "Understand French meal times and customs"
      ]
    },
    {
      title: "Clothing & Weather",
      icon: ShoppingBag,
      color: "text-blue-600",
      items: [
        "Pack weather-appropriate clothing for all seasons",
        "Bring formal attire for presentations/events",
        "Include comfortable walking shoes",
        "Pack thermal clothing for winter months"
      ]
    },
    {
      title: "Cultural Preparation",
      icon: BookOpen,
      color: "text-purple-600",
      items: [
        "Learn basic French phrases and greetings",
        "Understand French social customs and etiquette",
        "Research local traditions and holidays",
        "Familiarize yourself with French educational system"
      ]
    }
  ];

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
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
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
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 bg-green-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-green-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-green-800 text-sm">
            <li>• Pack light - you can buy most things in France</li>
            <li>• Bring a universal adapter for your electronics</li>
            <li>• Consider shipping some items ahead to reduce luggage weight</li>
            <li>• Download offline translation apps before traveling</li>
            <li>• Join French student groups on social media for tips</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
