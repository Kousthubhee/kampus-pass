
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Euro, PiggyBank, Receipt, CreditCard } from 'lucide-react';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const FinanceTrackingPage = ({ onBack, onComplete, isCompleted }: FinanceTrackingPageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const financeSteps = [
    {
      id: 'budget-planning',
      title: "Create Monthly Budget",
      description: "Plan your monthly expenses including rent, food, transport",
      icon: PiggyBank,
      priority: "high"
    },
    {
      id: 'expense-tracking',
      title: "Set Up Expense Tracking",
      description: "Use apps like Bankin' or Linxo to track your spending",
      icon: Receipt,
      priority: "medium"
    },
    {
      id: 'student-discounts',
      title: "Get Student Discount Cards",
      description: "Apply for student transport cards and meal cards",
      icon: CreditCard,
      priority: "high"
    },
    {
      id: 'emergency-fund',
      title: "Build Emergency Fund",
      description: "Save at least 500€ for unexpected expenses",
      icon: Euro,
      priority: "medium"
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length >= financeSteps.length;

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
            📄 Tracking your Finances
          </h1>
          <p className="text-lg text-gray-600">
            Important paperwork and financial management
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
      </div>

      <div className="space-y-4">
        {financeSteps.map((step, index) => {
          const Icon = step.icon;
          const isStepCompleted = completedSteps.includes(step.id);
          
          return (
            <Card key={index} className={`border-l-4 border-l-teal-500 ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-teal-600" />
                        {step.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    step.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {step.priority} priority
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  {!isStepCompleted && (
                    <Button 
                      size="sm"
                      onClick={() => handleStepComplete(step.id)}
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

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Financial Planning Complete!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've set up your financial tracking system.
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

      <Card className="mt-8 bg-teal-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-teal-900 mb-3">💰 Financial Tips for Students in France</h3>
          <ul className="space-y-2 text-teal-800 text-sm">
            <li>• Average monthly budget: 800-1200€ (varies by city)</li>
            <li>• Use student restaurants (RU) for affordable meals (3.30€)</li>
            <li>• Get a Navigo student transport card in Paris (75% discount)</li>
            <li>• Look for part-time jobs (maximum 20h/week on student visa)</li>
            <li>• Apply for APL housing assistance through CAF</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {financeSteps.length} steps completed
      </div>
    </div>
  );
};
