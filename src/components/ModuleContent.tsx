import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, FileText, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModuleContentProps {
  module: any;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
  isCompleted: boolean;
}

interface StepDetails {
  id: string;
  title: string;
  description: string;
  content?: string;
}

export const ModuleContent = ({ module, onBack, onComplete, isCompleted }: ModuleContentProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedStep, setSelectedStep] = useState<StepDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getModuleSteps = (moduleId: string): StepDetails[] => {
    switch (moduleId) {
      case 'pre-arrival-1':
        return [
          { 
            id: 'campus-france', 
            title: 'Campus France Registration', 
            description: 'Create account and submit application',
            content: `
              <h3 class="font-bold text-lg mb-2">Detailed Steps:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Visit the Campus France website for your country</li>
                <li>Create an account on the "Études en France" portal</li>
                <li>Fill in personal, academic, and program details</li>
                <li>Upload required documents (passport, transcripts, etc.)</li>
                <li>Submit the application and pay the Campus France fee</li>
                <li>Attend an academic interview if required</li>
                <li>Receive Campus France approval</li>
              </ol>
              <p class="mt-4 text-sm text-gray-600">Mark as complete once you receive confirmation from Campus France.</p>
            `
          },
          { 
            id: 'vfs', 
            title: 'VFS Appointment', 
            description: 'Book and attend visa appointment',
            content: `
              <h3 class="font-bold text-lg mb-2">Detailed Steps:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Visit the France-Visas website and complete the online form</li>
                <li>Receive a France-Visas reference number</li>
                <li>Book an appointment via VFS Global or consulate website</li>
                <li>Choose a convenient date and location</li>
                <li>Attend the appointment with all required documents</li>
              </ol>
              <p class="mt-4 text-sm text-gray-600">Mark as complete after attending your appointment.</p>
            `
          },
          // Add similar content for other steps...
        ];
      case 'pre-arrival-2':
        return [
          { 
            id: 'clothing', 
            title: 'Climate-Appropriate Clothing', 
            description: 'Pack clothes suitable for French weather',
            content: `
              <h3 class="font-bold text-lg mb-2">Packing Guide:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Winter (Dec-Feb):</strong> Thermal layers, warm coat, gloves, scarf, waterproof boots</li>
                <li><strong>Spring (Mar-May):</strong> Light jackets, sweaters, umbrella</li>
                <li><strong>Summer (Jun-Aug):</strong> Lightweight clothes, sunscreen, sunglasses</li>
                <li><strong>Autumn (Sep-Nov):</strong> Layers, waterproof jacket, boots</li>
              </ul>
              <p class="mt-4 text-sm text-gray-600">Consider regional variations - North is cooler, South is warmer.</p>
            `
          },
          // Add similar content for other steps...
        ];
      case 'post-arrival':
        return [
          { 
            id: 'bank-account', 
            title: 'Open Bank Account', 
            description: 'Set up French bank account',
            content: `
              <h3 class="font-bold text-lg mb-2">Bank Account Setup:</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Choose a bank (popular options: Société Générale, BNP Paribas, LCL)</li>
                <li>Prepare documents: Passport, visa, proof of enrollment, proof of address</li>
                <li>Book an appointment (some banks allow online pre-registration)</li>
                <li>Sign the contract and receive your RIB (bank details)</li>
                <li>Wait for your debit card (usually 1-2 weeks)</li>
              </ol>
              <p class="mt-4 text-sm text-gray-600">Mark as complete once your account is active.</p>
            `
          },
          // Add similar content for other steps...
        ];
      default:
        return [
          { id: 'step1', title: 'Getting Started', description: 'Initial setup and preparation' },
          { id: 'step2', title: 'Main Process', description: 'Complete the main requirements' },
          { id: 'step3', title: 'Finalization', description: 'Wrap up and confirm completion' }
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

  const openStepDetails = (step: StepDetails) => {
    setSelectedStep(step);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
      </div>

      <div className={`bg-gradient-to-r ${module.color} rounded-lg p-8 text-white mb-8`}>
        <div className="flex items-center mb-4">
          <div className="text-6xl mr-4">{module.icon}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-xl opacity-90">{module.description}</p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-4 bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Module Completed! You earned a key 🗝️</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isStepCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id} 
              className={`${isStepCompleted ? 'ring-2 ring-green-500' : ''} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => openStepDetails(step)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepComplete(step.id);
                        }}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Step Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedStep?.title}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDialogOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedStep?.content && (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedStep.content }}
            />
          )}
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => {
                if (selectedStep?.id && !completedSteps.includes(selectedStep.id)) {
                  handleStepComplete(selectedStep.id);
                }
                setIsDialogOpen(false);
              }}
              disabled={selectedStep?.id && completedSteps.includes(selectedStep.id)}
            >
              {selectedStep?.id && completedSteps.includes(selectedStep.id) 
                ? 'Step Completed' 
                : 'Mark as Complete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                  Great job! You've finished all steps in this module.
                </p>
                <Button 
                  onClick={handleModuleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Module & Earn Key 🗝️
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