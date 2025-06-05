
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, CreditCard, Shield, Home, FileText, Filter } from 'lucide-react';

interface PostArrivalPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const PostArrivalPage = ({ onBack, onComplete, isCompleted }: PostArrivalPageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = ['all', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'];

  const urgentTasks = [
    {
      id: 'bank-account',
      title: "Open Bank Account",
      description: "Required for rent, CAF, and daily transactions",
      icon: CreditCard,
      timeline: "Within first week",
      priority: "urgent",
      cityInfo: {
        "Paris": "Visit BNP Paribas or Société Générale branches near universities",
        "Lyon": "Crédit Agricole has good student packages in Lyon",
        "Marseille": "LCL offers special rates for international students",
        "all": "Bring passport, student certificate, and proof of address"
      }
    },
    {
      id: 'social-security',
      title: "Apply for Social Security Number (Numéro de Sécurité Sociale)",
      description: "Essential for healthcare and official procedures",
      icon: Shield,
      timeline: "Within first 2 weeks",
      priority: "urgent",
      cityInfo: {
        "Paris": "Visit CPAM office in your arrondissement",
        "Lyon": "CPAM office at 26 Place Tobie Robatel",
        "Toulouse": "CPAM at 2 Rue Georges Vivent",
        "all": "Book appointment online at ameli.fr"
      }
    },
    {
      id: 'health-insurance',
      title: "Register for Health Insurance",
      description: "Student health insurance (LMDE or SMERRA)",
      icon: Shield,
      timeline: "Within first month",
      priority: "high",
      cityInfo: {
        "Paris": "Multiple LMDE offices across Paris",
        "Lyon": "SMERRA office at 7 Rue Jean-Marie Leclair",
        "all": "Choose between LMDE and SMERRA based on your university"
      }
    },
    {
      id: 'caf',
      title: "Apply for CAF (Housing Allowance)",
      description: "Financial assistance for accommodation costs",
      icon: Home,
      timeline: "After securing accommodation",
      priority: "high",
      cityInfo: {
        "Paris": "Visit CAF office in your arrondissement or apply online",
        "Lyon": "CAF Métropole de Lyon office",
        "all": "Apply online at caf.fr with accommodation contract"
      }
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

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length >= urgentTasks.length;

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
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>

        {/* City Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by City:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(city)}
                className="capitalize"
              >
                {city === 'all' ? 'All Cities' : city}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Urgent Tasks (First Month)</h2>
        <div className="space-y-4">
          {urgentTasks.map((task, index) => {
            const Icon = task.icon;
            const isStepCompleted = completedSteps.includes(task.id);
            const citySpecificInfo = selectedCity === 'all' 
              ? task.cityInfo.all 
              : task.cityInfo[selectedCity as keyof typeof task.cityInfo] || task.cityInfo.all;
            
            return (
              <Card key={index} className={`border-l-4 ${
                task.priority === 'urgent' 
                  ? 'border-l-red-500' 
                  : 'border-l-orange-500'
              } ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Icon className="h-6 w-6 mr-3 text-blue-600 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{task.description}</p>
                        {citySpecificInfo && (
                          <p className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                            💡 {citySpecificInfo}
                          </p>
                        )}
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
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Timeline: {task.timeline}</p>
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Tasks Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all urgent tasks.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

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

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {urgentTasks.length} tasks completed
      </div>
    </div>
  );
};
