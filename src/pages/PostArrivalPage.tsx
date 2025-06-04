
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, CreditCard, Shield, Home, FileText } from 'lucide-react';

interface PostArrivalPageProps {
  onBack: () => void;
}

export const PostArrivalPage = ({ onBack }: PostArrivalPageProps) => {
  const urgentTasks = [
    {
      title: "Open Bank Account",
      description: "Required for rent, CAF, and daily transactions",
      icon: CreditCard,
      timeline: "Within first week",
      priority: "urgent"
    },
    {
      title: "Apply for Social Security Number (Numéro de Sécurité Sociale)",
      description: "Essential for healthcare and official procedures",
      icon: Shield,
      timeline: "Within first 2 weeks",
      priority: "urgent"
    },
    {
      title: "Register for Health Insurance",
      description: "Student health insurance (LMDE or SMERRA)",
      icon: Shield,
      timeline: "Within first month",
      priority: "high"
    },
    {
      title: "Apply for CAF (Housing Allowance)",
      description: "Financial assistance for accommodation costs",
      icon: Home,
      timeline: "After securing accommodation",
      priority: "high"
    }
  ];

  const documents = [
    "Passport with valid visa",
    "University acceptance letter",
    "Proof of accommodation",
    "Birth certificate (translated)",
    "Bank statements",
    "Passport photos",
    "European Health Insurance Card (if applicable)"
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
            🏠 Post-Arrival Checklist
          </h1>
          <p className="text-lg text-gray-600">
            Bank account, SSN, insurance, CAF, and more
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Urgent Tasks (First Month)</h2>
        <div className="space-y-4">
          {urgentTasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <Card key={index} className={`border-l-4 ${
                task.priority === 'urgent' 
                  ? 'border-l-red-500' 
                  : 'border-l-orange-500'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Icon className="h-6 w-6 mr-3 text-blue-600 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'urgent' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Timeline: {task.timeline}</p>
                  <Button className="mt-3" size="sm">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-3 text-green-600" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Keep these documents with you at all times during your first months in France:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Important Reminders</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Always carry original documents + photocopies</li>
            <li>• Some processes may take several weeks - start early</li>
            <li>• Ask your university's international office for guidance</li>
            <li>• Keep receipts and confirmation numbers for all applications</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
