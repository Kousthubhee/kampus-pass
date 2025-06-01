import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Languages, 
  Users, 
  Utensils, 
  Calendar, 
  Home, 
  FileText, 
  Brain,
  Globe,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface TopicContent {
  title: string;
  rules: string[];
}

interface Topic {
  id: string;
  title: string;
  content: TopicContent[];
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  topics: Topic[];
}

export const FrenchIntegrationPage = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modules: Module[] = [
    {
      id: 'language',
      title: 'Language & Communication',
      icon: <Languages className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-700',
      topics: [
        {
          id: 'daily-phrases',
          title: 'Daily French Phrases',
          content: [
            {
              title: 'Greetings',
              rules: [
                'Bonjour (Good morning/afternoon) - Used until 6 PM',
                'Bonsoir (Good evening) - Used after 6 PM',
                'Salut (Hi/Bye) - Informal greeting for friends',
                'Au revoir (Goodbye) - Formal farewell'
              ]
            },
            {
              title: 'Grocery Shopping Phrases',
              rules: [
                'Où est... ? (Where is...?)',
                'Combien ça coûte ? (How much does it cost?)',
                'Je voudrais... (I would like...)',
                'Avez-vous... ? (Do you have...?)'
              ]
            }
          ]
        },
        {
          id: 'formal-informal',
          title: 'Formal vs Informal French',
          content: [
            {
              title: 'Usage Guide',
              rules: [
                'Use "vous" with strangers, elderly, and professionals',
                'Use "tu" with friends, family, and peers',
                'Always start formal, wait to be invited to use "tu"',
                'In business settings, maintain "vous" unless specified'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'student',
      title: 'Student Life Integration',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-700',
      topics: [
        {
          id: 'housing',
          title: 'Housing Guidelines',
          content: [
            {
              title: 'Noise Regulations',
              rules: [
                'Quiet hours: 10 PM to 7 AM on weekdays',
                'Quiet hours: 10 PM to 8 AM on weekends',
                'No loud music or TV after quiet hours',
                'Be mindful of footsteps in apartments above others'
              ]
            },
            {
              title: 'Recycling Rules',
              rules: [
                'Yellow bins for plastic and metal',
                'Blue bins for paper and cardboard',
                'Green bins for glass',
                'Organic waste in brown bins where available'
              ]
            },
            {
              title: 'Neighbor Relations',
              rules: [
                'Introduce yourself when you move in',
                'Hold doors for neighbors',
                'Keep common areas clean',
                'Respect shared spaces like laundry rooms'
              ]
            }
          ]
        },
        {
          id: 'academic',
          title: 'Academic Culture',
          content: [
            {
              title: 'Class Participation',
              rules: [
                'Raise hand before speaking',
                'Address professors as "Monsieur" or "Madame"',
                'Participate actively in discussions',
                'Ask questions during designated times'
              ]
            },
            {
              title: 'Email Etiquette',
              rules: [
                'Use formal greetings: "Monsieur/Madame"',
                'Include clear subject lines',
                'End with "Cordialement" or "Bien à vous"',
                'Use proper French punctuation'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'etiquette',
      title: 'Cultural Etiquette',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-700',
      topics: [
        {
          id: 'social-norms',
          title: 'French Social Norms',
          content: [
            {
              title: 'Punctuality',
              rules: [
                'Arrive exactly on time for professional meetings',
                'For social gatherings, arrive 15 minutes late (quart d\'heure de politesse)',
                'Never arrive early to dinner parties',
                'Call if you\'ll be more than 15 minutes late'
              ]
            },
            {
              title: 'Personal Space',
              rules: [
                'Maintain arm\'s length distance in conversations',
                'Avoid touching unless you know someone well',
                'Keep voices down in public transport',
                'Don\'t stare or make prolonged eye contact with strangers'
              ]
            }
          ]
        }
      ]
    }
  ];

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Globe className="h-8 w-8 mr-3 text-indigo-600" />
          French Cultural Integration
        </h1>
        <p className="text-lg text-gray-600">
          Interactive lessons to help you adapt and thrive in French culture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id}
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-indigo-200"
            onClick={() => handleModuleClick(module)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  {module.icon}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {module.topics.length} topics available
              </p>
              
              <div className="flex items-center text-sm text-indigo-600">
                <BookOpen className="h-4 w-4 mr-1" />
                Start Learning
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {selectedModule?.icon}
              <span className="ml-3">{selectedModule?.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {selectedModule?.topics.map((topic) => (
                <AccordionItem key={topic.id} value={topic.id}>
                  <AccordionTrigger className="text-lg font-medium">
                    {topic.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {topic.content.map((content, index) => (
                        <Accordion key={index} type="single" collapsible>
                          <AccordionItem value={`content-${index}`}>
                            <AccordionTrigger className="text-base">
                              {content.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {content.rules.map((rule, ruleIndex) => (
                                  <li key={ruleIndex} className="flex items-start">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                    <span className="text-gray-700">{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
