
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Euro, Calendar, FileText, AlertCircle } from 'lucide-react';

interface FinanceTrackingPageProps {
  onBack: () => void;
}

export const FinanceTrackingPage = ({ onBack }: FinanceTrackingPageProps) => {
  const expenses = [
    { category: "Tuition Fees", amount: "2,770", frequency: "Annual", due: "September" },
    { category: "Accommodation", amount: "400-800", frequency: "Monthly", due: "1st of month" },
    { category: "Food & Groceries", amount: "200-300", frequency: "Monthly", due: "Ongoing" },
    { category: "Transportation", amount: "75", frequency: "Monthly", due: "Ongoing" },
    { category: "Health Insurance", amount: "215", frequency: "Annual", due: "October" },
    { category: "Phone & Internet", amount: "25-50", frequency: "Monthly", due: "Ongoing" }
  ];

  const documents = [
    {
      title: "Residence Permit Renewal",
      deadline: "Before expiration (typically annual)",
      cost: "€225",
      description: "Required to continue studies in France"
    },
    {
      title: "Student Insurance",
      deadline: "Before academic year starts",
      cost: "€215/year",
      description: "Mandatory health insurance for students"
    },
    {
      title: "University Enrollment",
      deadline: "Summer (July-September)",
      cost: "€2,770/year",
      description: "Annual tuition fees for non-EU students"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
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
            Important paperwork and renewal processes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Euro className="h-5 w-5 mr-2 text-green-600" />
            Monthly Budget Tracker
          </h2>
          <div className="space-y-3">
            {expenses.map((expense, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{expense.category}</h3>
                      <p className="text-sm text-gray-500">{expense.frequency}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{expense.amount}</p>
                      <p className="text-xs text-gray-500">{expense.due}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-4 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-900 mb-2">💰 Financial Aid</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• CAF Housing Allowance: €150-300/month</li>
                <li>• Part-time work: Up to 20h/week allowed</li>
                <li>• University scholarships available</li>
                <li>• Student discounts on transport & culture</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Important Renewals
          </h2>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{doc.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">{doc.cost}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Deadline: {doc.deadline}
                  </div>
                  <Button className="mt-3" size="sm" variant="outline">
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">⚠️ Important</h3>
                  <p className="text-red-800 text-sm">
                    Missing renewal deadlines can result in legal complications and affect your ability to stay in France. 
                    Set calendar reminders 2-3 months before each deadline.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
