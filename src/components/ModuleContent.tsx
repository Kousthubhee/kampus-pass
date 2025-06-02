```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';

interface ModuleDetail {
  documents?: string[];
  steps?: string[];
  fees?: string[];
  resources?: { name: string; url: string }[];
}

interface Step {
  id: string;
  title: string;
  description: string;
  details?: ModuleDetail;
}

interface ModuleContentProps {
  module: {
    id: string;
    title: string;
    description: string;
    color?: string;
    icon?: string;
  };
  onBack: () => void;
  onComplete: (moduleId: string) => void;
  isCompleted: boolean;
}

export const ModuleContent = ({ module, onBack, onComplete, isCompleted }: ModuleContentProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const getModuleSteps = (moduleId: string): Step[] => {
    switch (moduleId) {
      case 'pre-arrival-1':
        return [
          {
            id: 'campus-france',
            title: 'Campus France Registration',
            description: 'Create account and submit application',
            details: {
              steps: [
                'Create an account on the Campus France website',
                'Fill out the application form with academic details',
                'Upload required documents',
                'Pay the Campus France fee',
                'Schedule and attend an interview (if required)',
                'Receive the authorization letter'
              ],
              documents: [
                'Academic transcripts',
                'Motivation letter',
                'CV',
                'Proof of language proficiency (if required)',
                'Passport copy'
              ],
              fees: ['Campus France fee: 50-100 euros (varies by country)'],
              resources: [{ name: 'Campus France Guide', url: 'https://www.campusfrance.org/en/procedure' }]
            }
          },
          {
            id: 'vfs',
            title: 'VFS Appointment',
            description: 'Book and attend visa appointment',
            details: {
              steps: [
                'Complete Campus France procedure',
                'Schedule VFS Global appointment',
                'Submit documents at VFS center',
                'Attend biometric data collection',
                'Track application status online',
                'Collect visa from VFS center'
              ],
              documents: [
                'Valid passport (valid for at least 3 months after return)',
                'Campus France authorization letter',
                'Two recent passport-sized photos',
                'Acceptance letter from French institution',
                'Proof of financial resources (615 euros/month or bank statement)',
                'Proof of accommodation in France',
                'Health insurance coverage',
                'Visa application form (completed)'
              ],
              fees: [
                'VFS service fee: 40 euros (approx.)',
                'Visa fee: 80 euros for long-stay student visa'
              ],
              resources: [{ name: 'VFS Global Website', url: 'https://www.vfsglobal.com' }]
            }
          },
          {
            id: 'documents',
            title: 'Document Preparation',
            description: 'Gather all required documents',
            details: {
              steps: [
                'Verify document requirements on VFS and Campus France websites',
                'Obtain certified translations (if needed)',
                'Make photocopies of all documents',
                'Organize documents in the required order'
              ],
              documents: [
                'All documents listed in VFS and Campus France steps',
                'Additional documents specific to your country (check VFS website)'
              ]
            }
          },
          {
            id: 'visa-fee',
            title: 'Visa Fee Payment',
            description: 'Pay visa processing fees',
            details: {
              steps: [
                'Pay Campus France fee during application',
                'Pay VFS service and visa fees at appointment',
                'Keep receipts for all payments'
              ],
              fees: [
                'Campus France fee: 50-100 euros',
                'VFS service fee: 40 euros',
                'Visa fee: 80 euros'
              ]
            }
          }
        ];
      case 'pre-arrival-2':
        return [
          {
            id: 'clothing',
            title: 'Climate-Appropriate Clothing',
            description: 'Pack clothes suitable for French weather',
            details: {
              steps: [
                'Research seasonal weather in your French destination',
                'Pack layers for variable temperatures',
                'Include formal attire for university events',
                'Consider purchasing winter clothing in France if needed'
              ],
              resources: [{ name: 'Weather in France', url: 'https://www.weather-france.com' }]
            }
          },
          {
            id: 'food-research',
            title: 'Food and Dietary Research',
            description: 'Learn about French cuisine and dietary options',
            details: {
              steps: [
                'Explore French dietary habits and meal structures',
                'Identify local supermarkets and specialty stores',
                'Research vegetarian/vegan or dietary restriction options',
                'Learn basic French food-related vocabulary'
              ],
              resources: [{ name: 'French Food Guide', url: 'https://www.france.fr/en/food' }]
            }
          },
          {
            id: 'cultural-prep',
            title: 'Cultural Preparation',
            description: 'Understand French customs and etiquette',
            details: {
              steps: [
                'Read about French social norms and greetings',
                'Learn about academic culture in French universities',
                'Understand public behavior expectations',
                'Watch French films or read books for cultural insights'
              ],
              resources: [{ name: 'French Culture', url: 'https://www.diplomatie.gouv.fr/en/culture' }]
            }
          },
          {
            id: 'language-basics',
            title: 'Basic French Learning',
            description: 'Learn essential French phrases',
            details: {
              steps: [
                'Learn greetings and polite expressions',
                'Practice basic phrases for shopping and dining',
                'Use language apps like Duolingo or Babbel',
                'Join a beginner French course if possible'
              ],
              resources: [
                { name: 'Duolingo', url: 'https://www.duolingo.com' },
                { name: 'Babbel', url: 'https://www.babbel.com' }
              ]
            }
          }
        ];
      case 'post-arrival':
        return [
          {
            id: 'bank-account',
            title: 'Open Bank Account',
            description: 'Set up French bank account',
            details: {
              steps: [
                'Choose a bank (e.g., BNP Paribas, Société Générale)',
                'Schedule an appointment',
                'Submit required documents',
                'Deposit initial amount (if required)',
                'Receive debit card and account details'
              ],
              documents: [
                'Valid passport and visa',
                'Proof of address in France (e.g., utility bill or rental contract)',
                'Student enrollment certificate',
                'Initial deposit (10-50 euros, varies by bank)'
              ],
              resources: [
                { name: 'BNP Paribas', url: 'https://www.bnpparibas.fr' },
                { name: 'Société Générale', url: 'https://www.societegenerale.fr' }
              ]
            }
          },
          {
            id: 'ssn-equivalent',
            title: 'Social Security Number',
            description: 'Obtain French social security number',
            details: {
              steps: [
                'Register with CPAM (French health insurance)',
                'Submit required documents online or in person',
                'Receive temporary social security number',
                'Obtain permanent number after processing'
              ],
              documents: [
                'Passport and visa',
                'Birth certificate (translated if needed)',
                'Proof of address',
                'Student enrollment certificate'
              ],
              resources: [{ name: 'CPAM', url: 'https://www.ameli.fr' }]
            }
          },
          {
            id: 'insurance',
            title: 'Health Insurance',
            description: 'Enroll in French health insurance',
            details: {
              steps: [
                'Enroll in student social security via CPAM',
                'Choose a complementary insurance (mutuelle) if desired',
                'Submit documents to CPAM',
                'Receive health insurance card (Carte Vitale)'
              ],
              documents: [
                'Passport and visa',
                'Proof of enrollment',
                'Proof of address'
              ],
              resources: [{ name: 'Ameli', url: 'https://www.ameli.fr' }]
            }
          },
          {
            id: 'caf',
            title: 'CAF Application',
            description: 'Apply for housing assistance (CAF)',
            details: {
              steps: [
                'Sign a lease agreement',
                'Obtain housing insurance',
                'Register with CAF online',
                'Submit proof of residence and income',
                'Receive housing allowance (if eligible)'
              ],
              documents: [
                'Lease agreement',
                'Housing insurance certificate',
                'Proof of income',
                'Bank account details (RIB)'
              ],
              resources: [{ name: 'CAF Website', url: 'https://www.caf.fr' }]
            }
          },
          {
            id: 'phone-plan',
            title: 'Phone Plan',
            description: 'Set up French mobile phone plan',
            details: {
              steps: [
                'Choose a provider (e.g., Orange, SFR)',
                'Visit a store or order online',
                'Provide identification and payment details',
                'Activate SIM card'
              ],
              documents: ['Passport', 'Proof of address', 'Bank card or RIB'],
              resources: [
                { name: 'Orange', url: 'https://www.orange.fr' },
                { name: 'SFR', url: 'https://www.sfr.fr' }
              ]
            }
          }
        ];
      default:
        return [
          {
            id: 'step1',
            title: 'Getting Started',
            description: 'Initial setup and preparation',
            details: {
              steps: ['Review module objectives', 'Gather necessary materials', 'Set up a schedule']
            }
          },
          {
            id: 'step2',
            title: 'Main Process',
            description: 'Complete the main requirements',
            details: {
              steps: ['Follow the primary steps', 'Submit required items', 'Check progress']
            }
          },
          {
            id: 'step3',
            title: 'Finalization',
            description: 'Wrap up and confirm completion',
            details: {
              steps: ['Verify all steps are complete', 'Submit final documents', 'Confirm with authorities']
            }
          }
        ];
    }
  };

  const steps = getModuleSteps(module.id);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleModuleComplete = () => {
    onComplete(module.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <FileText className="h-12 w-12 mr-4 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
            <p className="text-xl text-gray-700">{module.description}</p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-4 bg-green-100 p-3 rounded-lg">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Module Completed! You earned a key</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isStepCompleted = completedSteps.includes(step.id);
          
          return (
            <Card key={step.id} className={isStepCompleted ? 'ring-2 ring-green-500' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={isStepCompleted 
                      ? 'w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-green-500 text-white' 
                      : 'w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-gray-200 text-gray-600'}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : (index + 1).toString()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
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
                </div>

                {step.details && (
                  <div className="mt-4 space-y-4 text-gray-700">
                    {step.details.steps && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Steps</h4>
                        <ol className="list-decimal pl-5 text-sm">
                          {step.details.steps.map((subStep, subIndex) => (
                            <li key={subIndex}>{subStep}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {step.details.documents && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Required Documents</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {step.details.documents.map((doc, docIndex) => (
                            <li key={docIndex}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.details.fees && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Fees</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {step.details.fees.map((fee, feeIndex) => (
                            <li key={feeIndex}>{fee}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.details.resources && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Resources</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {step.details.resources.map((resource, resIndex) => (
                            <li key={resIndex}>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        {completedSteps.length === steps.length && !isCompleted && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  All Steps Completed!
                </h3>
                <p className="text-green-700 mb-4">
                  Great job! You have finished all steps in this module.
                </p>
                <Button 
                  onClick={handleModuleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Module and Earn Key
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          Progress: {completedSteps.length} of {steps.length} steps completed
        </div>
      </div>
    </div>
  );
};