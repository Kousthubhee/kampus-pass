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
  BookOpen,
  Sun,
  MapPin,
  Briefcase,
  Shield,
  Euro,
  IndianRupee // Assuming lucide-react includes this or use a custom icon
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
          title: 'Daily French Phrases for Survival',
          content: [
            {
              title: 'Greetings',
              rules: [
                'Bonjour (Good morning/afternoon) - Used until 6 PM',
                'Bonsoir (Good evening) - Used after 6 PM',
                'Salut (Hi/Bye) - Informal for friends',
                'Au revoir (Goodbye) - Formal farewell'
              ]
            },
            {
              title: 'Groceries',
              rules: [
                'Où est... ? (Where is...?)',
                'Combien ça coûte ? (How much does it cost?)',
                'Je voudrais... (I would like...)',
                'Avez-vous... ? (Do you have...?)'
              ]
            },
            {
              title: 'Emergencies',
              rules: [
                'Aidez-moi ! (Help me!)',
                'Appelez une ambulance ! (Call an ambulance!)',
                'Je ne me sens pas bien. (I don’t feel well.)',
                'Où est l’hôpital ? (Where is the hospital?)'
              ]
            }
          ]
        },
        {
          id: 'formal-informal',
          title: 'Slang vs Formal French Usage Guide',
          content: [
            {
              title: 'Usage Guide',
              rules: [
                'Use "vous" with strangers, elderly, and professionals',
                'Use "tu" with friends and peers, slang like "cool" or "sympa"',
                'Start formal, wait for "tu" invitation',
                'Avoid slang in business settings'
              ]
            }
          ]
        },
        {
          id: 'pronunciation',
          title: 'Voice & Pronunciation Practice',
          content: [
            {
              title: 'Key Phrases',
              rules: [
                'Bonjour (bohn-zhoor) - Practice nasal "on" sound',
                'Merci (mair-see) - Soft "r" and clear "i"',
                'Excusez-moi (ex-koo-zay-mwa) - Emphasize "mwa"'
              ]
            }
          ]
        },
        {
          id: 'gestures',
          title: 'Common Cultural Gestures and What They Mean',
          content: [
            {
              title: 'Gestures',
              rules: [
                'Shrugging shoulders - Indifference or "I don’t know"',
                'Cheek kiss (la bise) - Greeting close friends',
                'Pointing with lips - Directing attention subtly'
              ]
            }
          ]
        },
        {
          id: 'scenarios',
          title: 'Conversation Scenarios',
          content: [
            {
              title: 'Examples',
              rules: [
                'At boulangerie: Bonjour, une baguette s’il vous plaît.',
                'At prefecture: Bonjour, je suis ici pour ma carte de séjour.',
                'At doctor’s: Bonjour, j’ai besoin d’une consultation.'
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
              title: 'General Norms',
              rules: [
                'Arrive on time for professional meetings',
                'Maintain arm’s length personal space',
                'Directness is common, don’t take it personally'
              ]
            }
          ]
        },
        {
          id: 'public-settings',
          title: 'Do’s and Don’ts in Public Settings',
          content: [
            {
              title: 'Métro',
              rules: [
                'Keep voice low, no loud calls',
                'Offer seats to elderly or pregnant passengers',
                'Avoid eating or drinking'
              ]
            },
            {
              title: 'Markets',
              rules: [
                'Greet vendors with "Bonjour"',
                'Don’t haggle, prices are fixed',
                'Carry cash for small purchases'
              ]
            }
          ]
        },
        {
          id: 'dining',
          title: 'Dining Etiquette in France',
          content: [
            {
              title: 'Rules',
              rules: [
                'Place bread on table, not plate',
                'Say "bon appétit" before eating',
                'Keep hands on table, not lap',
                'Tipping 5-10% for exceptional service'
              ]
            }
          ]
        },
        {
          id: 'greetings',
          title: 'How to Greet',
          content: [
            {
              title: 'Methods',
              rules: [
                'La bise (cheek kisses) for close friends, 2-4 times',
                'Handshake for formal or first meetings',
                'Use "Monsieur" or "Madame" with titles'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'food',
      title: 'Food & Grocery Guidance',
      icon: <Utensils className="h-6 w-6" />,
      color: 'bg-green-100 text-green-700',
      topics: [
        {
          id: 'eating-habits',
          title: 'French Eating Habits',
          content: [
            {
              title: 'General Habits',
              rules: [
                'Lunch at 12-2 PM, dinner at 7-9 PM',
                'Cold food (e.g., salads) common',
                'Smaller portions, multiple courses',
                'Coffee after meals, not during'
              ]
            }
          ]
        },
        {
          id: 'food-labels',
          title: 'Reading Food Labels and Identifying Dietary Needs',
          content: [
            {
              title: 'Tips',
              rules: [
                'Look for "végétarien" or "sans viande"',
                'Halal marked as "halal" on packaging',
                'Check ingredients for pork (porc)',
                'Ask staff if unsure: "Est-ce végétarien/halal ?"'
              ]
            }
          ]
        },
        {
          id: 'specialty-grocery',
          title: 'Tips for Specialty Grocery Shopping',
          content: [
            {
              title: 'Where to Find',
              rules: [
                'Specialty items at Carrefour or Leclerc',
                'Visit local Asian or African markets for diverse spices',
                'Check online stores for international products',
                'Explore ethnic food shops in major cities'
              ]
            }
          ]
        },
        {
          id: 'allergies',
          title: 'Explaining Allergies or Dietary Restrictions in French',
          content: [
            {
              title: 'Phrases',
              rules: [
                'Je suis allergique à... (I am allergic to...)',
                'Je ne mange pas de... (I don’t eat...)',
                'Pouvez-vous éviter... ? (Can you avoid...?)',
                'Je suis végétarien/vegan. (I am vegetarian/vegan.)'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'festivals',
      title: 'Festivals & Social Events',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-700',
      topics: [
        {
          id: 'holidays-events',
          title: 'French Public Holidays and Cultural Events',
          content: [
            {
              title: '2025 Holidays',
              rules: [
                'New Year’s Day (January 1)',
                'Easter Monday (April 21)',
                'Labor Day (May 1)',
                'Victory Day (May 8)',
                'Ascension Day (May 29)',
                'Whit Monday (June 9)',
                'Bastille Day (July 14)',
                'Assumption Day (August 15)',
                'All Saints’ Day (November 1)',
                'Armistice Day (November 11)',
                'Christmas Day (December 25)'
              ]
            },
            {
              title: 'Events',
              rules: [
                'Fête de la Musique (June 21)',
                'Tour de France (July 5-27)',
                'Summer Sales (June 25-July 22)'
              ]
            }
          ]
        },
        {
          id: 'local-events',
          title: 'Joining Local Events & Meetups',
          content: [
            {
              title: 'Options',
              rules: [
                'Use Meetup for local groups',
                'Join Erasmus events at universities',
                'Attend city festivals (e.g., Nice Carnival)'
              ]
            }
          ]
        },
        {
          id: 'potluck',
          title: 'How to Host/Attend a Potluck or Party in France',
          content: [
            {
              title: 'Tips',
              rules: [
                'Bring a dish to share',
                'Arrive 15 minutes late (quart d’heure de politesse)',
                'Offer to help clean up',
                'Thank host with "Merci pour l’invitation"'
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
          title: 'Housing Etiquette',
          content: [
            {
              title: 'Noise Limits',
              rules: [
                'Quiet hours: 10 PM to 7 AM on weekdays',
                'Quiet hours: 10 PM to 8 AM on weekends',
                'No loud music after quiet hours'
              ]
            },
            {
              title: 'Recycling Rules',
              rules: [
                'Yellow bins for plastic and metal',
                'Blue bins for paper and cardboard',
                'Green bins for glass',
                'Brown bins for organic waste'
              ]
            },
            {
              title: 'Greeting Neighbors',
              rules: [
                'Introduce yourself when moving in',
                'Hold doors for others',
                'Keep common areas clean'
              ]
            }
          ]
        },
        {
          id: 'academic',
          title: 'French Academic Culture',
          content: [
            {
              title: 'Class Participation',
              rules: [
                'Raise hand before speaking',
                'Address professors as "Monsieur" or "Madame"',
                'Participate in discussions',
                'Ask questions during designated times'
              ]
            },
            {
              title: 'Email Etiquette',
              rules: [
                'Use "Monsieur/Madame" in greetings',
                'Include clear subject lines',
                'End with "Cordialement"',
                'Use proper punctuation'
              ]
            }
          ]
        },
        {
          id: 'volunteering',
          title: 'Volunteering & Community Involvement',
          content: [
            {
              title: 'Options',
              rules: [
                'Join university volunteer programs',
                'Participate in local charity events',
                'Engage with student associations'
              ]
            }
          ]
        },
        {
          id: 'homesickness',
          title: 'Dealing with Homesickness',
          content: [
            {
              title: 'Support',
              rules: [
                'Connect with international student communities',
                'Attend cultural events to feel connected',
                'Join online forums for expatriates'
              ]
            }
          ]
        },
        {
          id: 'jobs',
          title: 'Part-Time Work and Internships',
          content: [
            {
              title: 'Guidelines',
              rules: [
                'Allowed 964 hours/year part-time, get work permit via prefecture',
                'Check university job boards, Indeed France, or LinkedIn for internships',
                'Dress formally for interviews, emphasize teamwork skills',
                'Basic French often required, improve with daily practice'
              ]
            }
          ]
        },
        {
          id: 'budgeting',
          title: 'Financial Planning for Students',
          content: [
            {
              title: 'Tips',
              rules: [
                'Monthly Costs: Rent €400-700, food €200-300, transport €50-100',
                'Apply for CAF housing aid, student meal vouchers (1.50€/meal)',
                'Shop at discount stores (Lidl, Aldi), use second-hand markets',
                'Open a free student account at BNP Paribas or Société Générale'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'bureaucracy',
      title: 'French Bureaucracy Made Simple',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-red-100 text-red-700',
      topics: [
        {
          id: 'polite-phrases',
          title: 'Polite Phrases for Navigating Prefectures, OFII, CAF, CPAM',
          content: [
            {
              title: 'Phrases',
              rules: [
                'Bonjour, je suis ici pour... (Good morning, I’m here for...)',
                'Pourriez-vous m’aider ? (Could you help me?)',
                'Je ne comprends pas, pouvez-vous expliquer ? (I don’t understand, can you explain?)'
              ]
            }
          ]
        },
        {
          id: 'frustrations',
          title: 'How to Handle Administrative Frustrations Respectfully',
          content: [
            {
              title: 'Tips',
              rules: [
                'Stay calm and polite, say "Je suis désolé(e)"',
                'Ask to speak to a supervisor if needed',
                'Bring all documents and copies'
              ]
            }
          ]
        },
        {
          id: 'templates',
          title: 'Template Emails & Scripts for Polite Follow-ups',
          content: [
            {
              title: 'Example',
              rules: [
                'Subject: Suivi de ma demande (Follow-up on my request)',
                'Bonjour Madame/Monsieur, Je vous écris concernant ma demande du [date]. Merci de me tenir informé(e). Cordialement, [Your Name]',
                'Call script: Bonjour, je suis [Name], j’appelle pour suivre ma demande.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mental-health',
      title: 'Mental Health & Adjustment Tips',
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-teal-100 text-teal-700',
      topics: [
        {
          id: 'culture-shock',
          title: 'Tips for Culture Shock Management',
          content: [
            {
              title: 'Strategies',
              rules: [
                'Take time to adjust, explore gradually',
                'Keep a routine (e.g., daily walks)',
                'Connect with other internationals'
              ]
            }
          ]
        },
        {
          id: 'support-groups',
          title: 'Where to Find Support Groups',
          content: [
            {
              title: 'Resources',
              rules: [
                'International Student Associations at universities',
                'Local community centers',
                'Online groups (e.g., Facebook expat groups)'
              ]
            }
          ]
        },
        {
          id: 'mindfulness',
          title: 'Mindfulness or Meditation Resources',
          content: [
            {
              title: 'Options',
              rules: [
                'Apps: Headspace (English)',
                'Online: YouTube meditation videos',
                'Local yoga classes in cities'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cultural-comparison',
      title: 'Cultural Comparison',
      icon: <Globe className="h-6 w-6" />,
      color: 'bg-indigo-100 text-indigo-700',
      topics: [
        {
          id: 'education',
          title: 'Education System Differences',
          content: [
            {
              title: 'General Comparison',
              rules: [
                'French system: Lecture-based with group projects',
                'Emphasis on critical thinking and discussion',
                'Flexible schedules with independent study'
              ]
            }
          ]
        },
        {
          id: 'workplace',
          title: 'Workplace Communication Styles',
          content: [
            {
              title: 'General Comparison',
              rules: [
                'French style: Direct and formal',
                'Debate and discussion encouraged',
                'Focus on work-life balance'
              ]
            }
          ]
        },
        {
          id: 'values',
          title: 'Value Systems: Collectivist vs Individualist',
          content: [
            {
              title: 'General Comparison',
              rules: [
                'France: Individualist, prioritizes personal freedom',
                'Emphasis on equality in social settings',
                'Value privacy and independence'
              ]
            }
          ]
        },
        {
          id: 'formality',
          title: 'Formality and Hierarchy Differences',
          content: [
            {
              title: 'General Comparison',
              rules: [
                'Less hierarchical, titles used formally',
                'Informal after rapport is built',
                'Respect for personal boundaries'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'practical-living',
      title: 'Practical Living',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-cyan-100 text-cyan-700',
      topics: [
        {
          id: 'weather',
          title: 'Weather Awareness and Seasonal Tips',
          content: [
            {
              title: 'Preparation',
              rules: [
                'June is warm (20-25°C), bring light clothing, sunscreen, stay hydrated',
                'Autumn (September-November) rainy, carry umbrella, waterproof shoes',
                'Winter (December-February) cold (0-5°C), pack warm coats, scarves',
                'Join winter markets or summer beach activities in coastal cities'
              ]
            }
          ]
        },
        {
          id: 'transport',
          title: 'Navigating French Public Transport',
          content: [
            {
              title: 'Tips',
              rules: [
                'Buy Navigo pass in Paris or city-specific cards, validate tickets',
                'Check SNCF or RATP apps for train/métro times, especially during holidays',
                'Show student ID for 50-75% off train tickets (SNCF Carte Jeune)',
                'Use Vélib’ in Paris or city bikes, follow lane rules'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety and Emergency Resources',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-700',
      topics: [
        {
          id: 'emergency-contacts',
          title: 'Emergency Contacts and Safety Tips',
          content: [
            {
              title: 'Resources',
              rules: [
                'Helplines: 112 (emergency), 17 (police), 15 (medical)',
                'Contact university security for on-campus issues',
                'Avoid isolated areas at night, stay in well-lit zones',
                'Lost documents: Report to prefecture and your embassy'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'indian-support',
      title: 'Indo-French Integration',
      icon: <IndianRupee className="h-6 w-6" />, // Note: Use a custom icon or replace with a generic one if unavailable
      color: 'bg-orange-200 text-orange-800',
      topics: [
        {
          id: 'cultural-comparison',
          title: 'Indo-French Cultural Comparison',
          content: [
            {
              title: 'Education System Differences',
              rules: [
                'France: Lecture-based, India: Exam-focused',
                'France: Group projects, India: Individual study',
                'France: Flexible schedules, India: Structured'
              ]
            },
            {
              title: 'Workplace Communication Styles',
              rules: [
                'France: Direct and formal, India: Respectful and indirect',
                'France: Debate encouraged, India: Hierarchy respected',
                'France: Work-life balance, India: Long hours'
              ]
            },
            {
              title: 'Value Systems',
              rules: [
                'France: Individualist, India: Collectivist (family/community focus)',
                'France: Equality in social settings, India: Respect for elders'
              ]
            },
            {
              title: 'Formality and Hierarchy',
              rules: [
                'France: Less hierarchical, India: Strong hierarchy by age/status',
                'France: Informal after rapport, India: Formal longer'
              ]
            }
          ]
        },
        {
          id: 'community',
          title: 'Indian Community Resources',
          content: [
            {
              title: 'Support Options',
              rules: [
                'Join Indian Student Associations at universities',
                'Visit temples (e.g., Sri Sri Radha Krishna Temple in Paris)',
                'Connect via online groups (e.g., Facebook Indian in France)'
              ]
            }
          ]
        },
        {
          id: 'food-preferences',
          title: 'Indian Dietary Preferences',
          content: [
            {
              title: 'Grocery Tips',
              rules: [
                'Find dal, masala, and atta at Indian stores or Carrefour',
                'Rice and spices at Tang Frères or ethnic markets',
                'Check for vegetarian/halal labels'
              ]
            },
            {
              title: 'Phrases for Preferences',
              rules: [
                'Je suis végétarien et j’évite le porc. (I am vegetarian and avoid pork.)',
                'Avez-vous des plats sans viande ? (Do you have meat-free dishes?)'
              ]
            }
          ]
        },
        {
          id: 'homesickness',
          title: 'Managing Homesickness with Indian Context',
          content: [
            {
              title: 'Strategies',
              rules: [
                'Connect with Indian student communities',
                'Celebrate festivals like Diwali with local groups',
                'Cook familiar dishes to feel at home'
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