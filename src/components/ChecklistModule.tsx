import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SchoolSelector } from './SchoolSelector';
import { ModuleContent } from './ModuleContent';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
}

interface ChecklistModuleProps {
  modules: Module[];
  userProgress: any;
  setUserProgress: (progress: any) => void;
  onSchoolSelect: (school: any) => void;
  currentPage: string;
}

export const ChecklistModule = ({
  modules,
  userProgress,
  setUserProgress,
  onSchoolSelect,
  currentPage
}: ChecklistModuleProps) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Reset selected module when navigating back to checklist page
  useEffect(() => {
    console.log('ChecklistModule useEffect triggered:', { currentPage });
    if (currentPage === 'checklist' && selectedModule) {
      console.log('Resetting selected module due to page navigation');
      setSelectedModule(null);
    }
  }, [currentPage]); // Only watch currentPage, not selectedModule

  // Unlock all modules once on load
  useEffect(() => {
    if (!userProgress.unlockedModules || userProgress.unlockedModules.length !== modules.length) {
      setUserProgress({
        ...userProgress,
        unlockedModules: modules.map(m => m.id)
      });
    }
  }, [modules, userProgress, setUserProgress]);

  const handleModuleClick = (module: Module) => {
    const isUnlocked = userProgress.unlockedModules.includes(module.id);
    if (!isUnlocked) return;
    
    console.log('Module clicked:', module.id);
    
    if (module.id === 'integration') {
      setUserProgress({
        ...userProgress,
        currentPage: 'integration'
      });
      return;
    }
    
    setSelectedModule(module);
  };

  const handleModuleComplete = (moduleId: string) => {
    const newProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      keys: userProgress.keys + 1,
    };

    setUserProgress(newProgress);
  };

  if (selectedModule) {
    if (selectedModule.type === 'school') {
      return (
        <SchoolSelector
          onBack={() => setSelectedModule(null)}
          onSchoolSelect={onSchoolSelect}
        />
      );
    } else {
      return (
        <ModuleContent
          module={selectedModule}
          onBack={() => setSelectedModule(null)}
          onComplete={handleModuleComplete}
          isCompleted={userProgress.completedModules.includes(selectedModule.id)}
        />
      );
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 Checklist - Begin Your Journey
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete each module to unlock the next step in your French education journey.
          Earn keys by finishing modules and unlock new opportunities!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const isUnlocked = userProgress.unlockedModules.includes(module.id);

          return (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isUnlocked
                  ? 'hover:shadow-lg border-2 border-transparent hover:border-blue-200'
                  : 'opacity-60 cursor-not-allowed'
              } ${isCompleted ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => handleModuleClick(module)}
            >
              <CardContent className="p-6">
                <div className={`w-full h-32 bg-gradient-to-br ${module.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-4xl">{module.icon}</div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                  )}

                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                    </div>
                  )}

                  {isUnlocked && !isCompleted && (
                    <div className="absolute bottom-2 right-2">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {module.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isCompleted
                      ? 'bg-green-100 text-green-800'
                      : isUnlocked
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked'}
                  </span>

                  {isUnlocked && (
                    <Button
                      size="sm"
                      variant={isCompleted ? "secondary" : "default"}
                      className="h-8"
                    >
                      {isCompleted ? 'Review' : 'Start'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h3>
            <p className="text-gray-600">
              {userProgress.completedModules.length} of {modules.length} modules completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((userProgress.completedModules.length / modules.length) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>

        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(userProgress.completedModules.length / modules.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-blue-700 font-medium">
          🔑 Keys Earned: {userProgress.keys}
        </div>
      </div>
    </div>
  );
};
