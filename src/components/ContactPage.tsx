
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'kousthubheekrishna@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'Available on request',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Rouen, France',
      description: 'Our team is based in France'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '24-48 hours',
      description: 'We typically respond within'
    }
  ];

  const creators = [
    {
      name: 'Kousthubhee Krishna',
      role: 'Co-Founder & Developer',
      description: 'Passionate about helping students navigate French education',
      avatar: '👩‍🎓'
    },
    {
      name: 'Srivatsava',
      role: 'Co-Founder & Content Creator',
      description: 'Passionate about helping students navigate French education',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Phone className="h-8 w-8 mr-3 text-pink-600" />
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          Get in touch with us for any questions or support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    className="h-32 resize-none"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-lg mr-4">
                        <Icon className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{info.title}</div>
                        <div className="text-gray-700">{info.value}</div>
                        <div className="text-sm text-gray-500">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Creators: <span className="text-blue-600">Kousthubhee Krishna</span> & <span className="text-cyan-600">Srivatsava</span>
              </h3>
              <p className="text-blue-700 mb-4">
                We're passionate about helping students navigate their journey to study in France. 
                Our platform provides comprehensive guides, checklists, and support to make your 
                French education dreams a reality.
              </p>
              <div className="space-y-3">
                {creators.map((creator, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-3">{creator.avatar}</div>
                    <div>
                      <div className="font-medium text-blue-900">{creator.name}</div>
                      <div className="text-sm text-blue-700">{creator.role}</div>
                      <div className="text-xs text-blue-600">{creator.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Helping students navigate their journey to study in France</h3>
              <p className="text-gray-600 mb-4">
                Our mission is to provide comprehensive, reliable, and up-to-date information 
                to help international students successfully pursue their education in France.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong>Made for students</strong> - We understand the challenges of studying abroad 
                  and have created this platform to make your journey smoother and more successful.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
