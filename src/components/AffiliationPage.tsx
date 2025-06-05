import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ExternalLink, Star, Users } from 'lucide-react';

export const AffiliationPage = () => {
  const partners = [
    {
      id: 1,
      name: 'Campus France',
      type: 'Government Agency',
      description: 'Official French government agency for promoting French higher education abroad',
      services: ['Visa guidance', 'University applications', 'Scholarship information'],
      rating: 4.8,
      users: '10,000+',
      logo: '🇫🇷',
      website: 'https://www.campusfrance.org'
    },
    {
      id: 2,
      name: 'CROUS',
      type: 'Student Services',
      description: 'Regional organization managing student life including housing and dining',
      services: ['Student housing', 'Meal plans', 'Financial aid'],
      rating: 4.5,
      users: '500K+',
      logo: '🏢',
      website: 'https://www.crous-paris.fr'
    },
    {
      id: 3,
      name: 'AMELI',
      type: 'Health Insurance',
      description: 'French national health insurance system for students and residents',
      services: ['Health coverage', 'Medical reimbursements', 'Insurance cards'],
      rating: 4.3,
      users: '2M+',
      logo: '🏥',
      website: 'https://www.ameli.fr'
    },
    {
      id: 4,
      name: 'CAF',
      type: 'Financial Support',
      description: 'Family allowance fund providing housing assistance to students',
      services: ['Housing aid', 'Financial assistance', 'Social benefits'],
      rating: 4.4,
      users: '1.5M+',
      logo: '💰',
      website: 'https://www.caf.fr'
    },
    {
      id: 5,
      name: 'VFS Global',
      type: 'Visa Services',
      description: 'Visa application center for French student visa processing',
      services: ['Visa applications', 'Document verification', 'Appointment booking'],
      rating: 4.2,
      users: '50K+',
      logo: '📋',
      website: 'https://visa.vfsglobal.com'
    },
    {
      id: 6,
      name: 'StudyInFrance.org',
      type: 'Education Platform',
      description: 'Comprehensive guide for international students in France',
      services: ['University search', 'Study guides', 'Community support'],
      rating: 4.6,
      users: '25K+',
      logo: '📚',
      website: 'https://www.studyinfrance.org'
    }
  ];

  const partnershipBenefits = [
    'Direct access to official information',
    'Streamlined application processes',
    'Dedicated student support',
    'Verified and up-to-date resources',
    'Priority assistance channels'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Building2 className="h-8 w-8 mr-3 text-red-600" />
          Our Partners
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We collaborate with official French institutions and trusted organizations to provide you with accurate, reliable information and services.
        </p>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Partnership Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="text-blue-600 mr-2">✓</div>
                <span className="text-blue-800">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {partner.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 text-center">
                {partner.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{partner.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{partner.users}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 mb-2">Services:</div>
                  <div className="flex flex-wrap gap-1">
                    {partner.services.map((service, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit {new URL(partner.website).hostname}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Become a Partner
          </h3>
          <p className="text-green-700 mb-4 max-w-2xl mx-auto">
            Are you an educational institution, service provider, or organization that supports international students in France? 
            We'd love to collaborate with you to help more students succeed in their French education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700">
              Partnership Inquiry
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
