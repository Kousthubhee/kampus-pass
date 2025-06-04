
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, FileText, Calendar, MapPin } from 'lucide-react';

interface PreArrival1PageProps {
  onBack: () => void;
}

export const PreArrival1Page = ({ onBack }: PreArrival1PageProps) => {
  const checklistItems = [
    {
      title: "Campus France Registration",
      description: "Complete your Campus France application and interview",
      status: "pending",
      urgency: "high",
      timeline: "3-4 months before departure"
    },
    {
      title: "VFS Visa Application",
      description: "Submit visa documents and attend biometric appointment",
      status: "pending",
      urgency: "high",
      timeline: "2-3 months before departure"
    },
    {
      title: "Document Translation",
      description: "Get official translations of academic documents",
      status: "pending",
      urgency: "medium",
      timeline: "2 months before departure"
    },
    {
      title: "Travel Insurance",
      description: "Purchase comprehensive travel and health insurance",
      status: "pending",
      urgency: "medium",
      timeline: "1 month before departure"
    },
    {
      title: "Flight Booking",
      description: "Book your flight to France",
      status: "pending",
      urgency: "low",
      timeline: "1 month before departure"
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
            ✈️ Pre-Arrival Checklist (Part 1)
          </h1>
          <p className="text-lg text-gray-600">
            Campus France, VFS, and essential preparations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-gray-400" />
                    {item.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.urgency === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : item.urgency === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.urgency} priority
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline: {item.timeline}
              </div>
              <Button className="mt-3" size="sm">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
              <p className="text-blue-800 text-sm">
                Start these processes early as they can take several months. Campus France and VFS appointments 
                can have long waiting times, especially during peak application periods.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
