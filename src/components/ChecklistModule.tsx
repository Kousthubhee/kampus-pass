
import { useState, useEffect } from 'react';
import { SchoolSelector } from './SchoolSelector';
import { ModuleContent } from './ModuleContent';
import { ChecklistHeader } from './ChecklistHeader';
import { ModuleCard } from './ModuleCard';
import { ProgressSection } from './ProgressSection';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  keysRequired?: number;
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
  }, [currentPage]);

  // Initialize with some modules unlocked and others requiring keys
  useEffect(() => {
    if (!userProgress.unlockedModules) {
      setUserProgress({
        ...userProgress,
        unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2'] // Only first 3 modules unlocked
      });
    }
  }, [modules, userProgress, setUserProgress]);

  const handleModuleClick = (module: Module) => {
    const isUnlocked = userProgress.unlockedModules.includes(module.id);
    
    // If module is locked and requires keys, check if user has enough keys
    if (!isUnlocked && module.keysRequired) {
      if (userProgress.keys < module.keysRequired) {
        console.log('Not enough keys to unlock module:', module.id);
        return;
      }
      
      // Unlock the module by spending keys
      const newProgress = {
        ...userProgress,
        keys: userProgress.keys - module.keysRequired,
        unlockedModules: [...userProgress.unlockedModules, module.id]
      };
      setUserProgress(newProgress);
    }
    
    if (!isUnlocked && !module.keysRequired) return;
    
    console.log('Module clicked:', module.id);
    
    // Handle navigation to specific pages
    const pageMapping: { [key: string]: string } = {
      'school': 'school-insights',
      'pre-arrival-1': 'pre-arrival-1',
      'pre-arrival-2': 'pre-arrival-2',
      'post-arrival': 'post-arrival',
      'integration': 'integration',
      'finance': 'finance-tracking'
    };

    if (pageMapping[module.id]) {
      setUserProgress({
        ...userProgress,
        currentPage: pageMapping[module.id]
      });
      return;
    }
    
    setSelectedModule(module);
  };

  const handleModuleComplete = (moduleId: string) => {
    const newProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      keys: userProgress.keys + 1, // Earn 1 key per completed module
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
      <ChecklistHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const isUnlocked = userProgress.unlockedModules.includes(module.id);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              onModuleClick={handleModuleClick}
              userKeys={userProgress.keys}
            />
          );
        })}
      </div>

      <ProgressSection 
        modules={modules}
        completedModulesCount={userProgress.completedModules.length}
        keys={userProgress.keys}
      />
    </div>
  );
};
