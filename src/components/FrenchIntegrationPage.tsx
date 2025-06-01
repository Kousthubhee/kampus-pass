import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Languages, 
  Users, 
  Utensils, 
  Calendar, 
  Home, 
  FileText, 
  Brain,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export const FrenchIntegrationPage = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules: Module[] = [
    {
      id: 'language',
      title: 'Language & Communication',
      icon: <Languages className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-700',
      sections: [
        {
          title: 'Daily French Phrases',
          content: ['Greetings', 'Grocery shopping phrases', 'Emergency phrases']
        },
        {
          title: 'Formal vs Informal French',
          content: ['Usage guide', 'Common scenarios', 'Professional settings']
        },
        {
          title: 'Pronunciation Practice',
          content: ['Bonjour', 'Merci', 'Excusez-moi', 'S\'il vous plaît']
        }
      ]
    },
    {
      id: 'etiquette',
      title: 'Cultural Etiquette',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-700',
      sections: [
        {
          title: 'French Social Norms',
          content: ['Punctuality', 'Personal space', 'Directness in communication']
        },
        {
          title: 'Public Behavior',
          content: ['Métro etiquette', 'Market behavior', 'Restaurant manners']
        },
        {
          title: 'Greeting Customs',
          content: ['La bise', 'Handshakes', 'Using Monsieur/Madame']
        }
      ]
    },
    {
      id: 'food',
      title: 'Food & Grocery Guidance',
      icon: <Utensils className="h-6 w-6" />,
      color: 'bg-green-100 text-green-700',
      sections: [
        {
          title: 'Eating Habits',
          content: ['Meal times', 'French vs Indian dining', 'Food culture']
        },
        {
          title: 'Shopping Guide',
          content: ['Finding Indian ingredients', 'Reading labels', 'Local markets']
        },
        {
          title: 'Dietary Considerations',
          content: ['Explaining vegetarianism', 'Halal options', 'Food allergies']
        }
      ]
    },
    {
      id: 'events',
      title: 'Festivals & Social Events',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-red-100 text-red-700',
      sections: [
        {
          title: 'French Holidays',
          content: ['Bastille Day', 'Fête de la Musique', 'Christmas traditions']
        },
        {
          title: 'Social Gatherings',
          content: ['Meetup groups', 'Student events', 'Cultural festivals']
        },
        {
          title: 'Party Etiquette',
          content: ['Hosting tips', 'Gift-giving customs', 'RSVP expectations']
        }
      ]
    },
    {
      id: 'student',
      title: 'Student Life Integration',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-700',
      sections: [
        {
          title: 'Housing Guidelines',
          content: ['Noise regulations', 'Recycling rules', 'Neighbor relations']
        },
        {
          title: 'Academic Culture',
          content: ['Class participation', 'Email etiquette', 'Group work norms']
        },
        {
          title: 'Community Involvement',
          content: ['Volunteering opportunities', 'Student associations', 'Local events']
        }
      ]
    },
    {
      id: 'bureaucracy',
      title: 'French Bureaucracy Guide',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-700',
      sections: [
        {
          title: 'Essential Phrases',
          content: ['Prefecture vocabulary', 'CAF terminology', 'OFII phrases']
        },
        {
          title: 'Document Navigation',
          content: ['Common forms', 'Required paperwork', 'Translation services']
        },
        {
          title: 'Communication Templates',
          content: ['Email formats', 'Follow-up scripts', 'Formal requests']
        }
      ]
    },
    {
      id: 'mental',
      title: 'Mental Health & Adjustment',
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-700',
      sections: [
        {
          title: 'Culture Shock Management',
          content: ['Recognition signs', 'Coping strategies', 'Support resources']
        },
        {
          title: 'Community Support',
          content: ['Indian associations', 'Student groups', 'Counseling services']
        },
        {
          title: 'Wellness Resources',
          content: ['Meditation guides', 'Stress management', 'Health services']
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Indo-French Cultural Bridge',
      icon: <Globe className="h-6 w-6" />,
      color: 'bg-cyan-100 text-cyan-700',
      sections: [
        {
          title: 'Educational Differences',
          content: ['Teaching styles', 'Assessment methods', 'Student-teacher dynamics']
        },
        {
          title: 'Social Values',
          content: ['Individualism vs Collectivism', 'Personal boundaries', 'Social hierarchies']
        },
        {
          title: 'Communication Styles',
          content: ['Direct vs Indirect', 'Professional etiquette', 'Social expectations']
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Globe className="h-8 w-8 mr-3 text-indigo-600" />
          French Cultural Integration
        </h1>
        <p className="text-lg text-gray-600">
          Your comprehensive guide to adapting and thriving in French culture
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id}
            className={`transition-all duration-300 ${
              expandedModule === module.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg mr-4 ${module.color}`}>
                    {module.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{module.title}</h2>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedModule === module.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {expandedModule === module.id && (
                <div className="mt-6 grid gap-6">
                  {module.sections.map((section, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-4">
            Need Additional Support?
          </h3>
          <p className="text-indigo-700 mb-4">
            Our community is here to help you navigate your cultural integration journey. 
            Connect with fellow students and access personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Join Student Community
            </Button>
            <Button variant="outline" className="border-indigo-600 text-indigo-600">
              Schedule Cultural Workshop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};