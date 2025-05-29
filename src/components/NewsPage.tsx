import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, ExternalLink } from 'lucide-react';

export const NewsPage = () => {
  const news = [
    {
      id: 1,
      title: '2025 French Student Visa Reforms Announced',
      summary: 'The French government has introduced changes to student visa documentation and biometric appointments for 2025.',
      category: 'Visa Updates',
      date: '2024-12-10',
      readTime: '3 min read',
      image: '🛂',
      urgent: true,
      link: 'https://www.campusfrance.org/en/student-visa-process'
    },
    {
      id: 2,
      title: 'CAF Housing Aid Amount Increased by 8%',
      summary: 'CAF will raise housing support for students starting September 2025 to match inflation.',
      category: 'Financial Aid',
      date: '2024-12-08',
      readTime: '2 min read',
      image: '🏠',
      urgent: false,
      link: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement'
    },
    {
      id: 3,
      title: 'Campus France Portal Adds Live Chat and Auto-Translation',
      summary: 'The new features aim to simplify communication for non-French-speaking applicants worldwide.',
      category: 'Platform Updates',
      date: '2024-12-05',
      readTime: '4 min read',
      image: '💻',
      urgent: false,
      link: 'https://www.campusfrance.org/en'
    },
    {
      id: 4,
      title: 'Language Policy Updates in French Business Schools',
      summary: 'NEOMA, ESCP, and other Grandes Écoles revise French language requirements for international master’s programs.',
      category: 'Academic',
      date: '2024-12-03',
      readTime: '5 min read',
      image: '🇫🇷',
      urgent: false,
      link: 'https://www.neoma-bs.com/en/news'
    }
  ];

  const partnerships = [
    {
      name: 'Campus France',
      description: 'Official French government agency for international education',
      logo: '🎓'
    },
    {
      name: 'CROUS',
      description: 'Student life and housing services',
      logo: '🏢'
    },
    {
      name: 'AMELI',
      description: 'French health insurance system',
      logo: '🏥'
    },
    {
      name: 'CAF',
      description: 'Family allowance fund for housing aid',
      logo: '💰'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <BookOpen className="h-8 w-8 mr-3 text-orange-600" />
          Stay Updated
        </h1>
        <p className="text-lg text-gray-600">
          Latest news, updates, and important information for studying in France
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        article.category === 'Visa Updates' ? 'bg-red-100 text-red-800' :
                        article.category === 'Financial Aid' ? 'bg-green-100 text-green-800' :
                        article.category === 'Platform Updates' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {article.category}
                      </span>
                      {article.urgent && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{article.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          Read More
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Never Miss Important Updates
              </h3>
              <p className="text-blue-700 mb-4">
                Subscribe to our newsletter for the latest news and updates
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe to Newsletter
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Important Deadlines</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-semibold text-red-900">Visa Applications</div>
                  <div className="text-sm text-red-700">March 15, 2025</div>
                  <div className="text-xs text-red-600">For Fall 2025 intake</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="font-semibold text-yellow-900">CAF Applications</div>
                  <div className="text-sm text-yellow-700">Ongoing</div>
                  <div className="text-xs text-yellow-600">Apply within 6 months of arrival</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-semibold text-green-900">Health Insurance</div>
                  <div className="text-sm text-green-700">Within 30 days</div>
                  <div className="text-xs text-green-600">Upon arrival in France</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Official Partners</h3>
              <div className="space-y-4">
                {partnerships.map((partner, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-2xl mr-3">{partner.logo}</div>
                    <div>
                      <div className="font-medium text-gray-900">{partner.name}</div>
                      <div className="text-sm text-gray-600">{partner.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="https://www.campusfrance.org/en" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    🌐 Campus France Portal
                  </Button>
                </a>
                <a href="https://france-visas.gouv.fr/en/web/france-visas/student" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    📋 Visa Requirements
                  </Button>
                </a>
                <a href="https://www.crous-paris.fr/logements/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    🏠 CROUS Housing
                  </Button>
                </a>
                <a href="https://www.caf.fr" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    💳 CAF Application
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
