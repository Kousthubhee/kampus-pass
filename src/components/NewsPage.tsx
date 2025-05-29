
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, ExternalLink } from 'lucide-react';

export const NewsPage = () => {
  const news = [
    {
      id: 1,
      title: 'New Student Visa Requirements for 2025',
      summary: 'France announces updated visa requirements for international students starting January 2025.',
      category: 'Visa Updates',
      date: '2024-12-10',
      readTime: '3 min read',
      image: '🛂',
      urgent: true
    },
    {
      id: 2,
      title: 'CAF Housing Aid Increase Announced',
      summary: 'French government increases housing assistance for students by 8% for the upcoming academic year.',
      category: 'Financial Aid',
      date: '2024-12-08',
      readTime: '2 min read',
      image: '🏠',
      urgent: false
    },
    {
      id: 3,
      title: 'Campus France Digital Platform Updates',
      summary: 'New features added to Campus France platform to streamline application process.',
      category: 'Platform Updates',
      date: '2024-12-05',
      readTime: '4 min read',
      image: '💻',
      urgent: false
    },
    {
      id: 4,
      title: 'French Language Requirement Changes',
      summary: 'Business schools update French language proficiency requirements for international programs.',
      category: 'Academic',
      date: '2024-12-03',
      readTime: '5 min read',
      image: '🇫🇷',
      urgent: false
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
                      <Button size="sm" variant="outline">
                        Read More
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
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
                <Button variant="outline" className="w-full justify-start">
                  🌐 Campus France Portal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📋 Visa Requirements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏠 CROUS Housing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💳 CAF Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
