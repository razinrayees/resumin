import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  completed: boolean;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex items-center justify-center space-x-1 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            onClick={() => onStepClick(step.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step.id === currentStep
                ? 'bg-orange-500 text-white shadow-lg'
                : step.completed
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {step.completed && step.id !== currentStep ? (
              <Check size={16} className="inline mr-1" />
            ) : null}
            {step.title}
          </button>
          {index < steps.length - 1 && (
            <div className="w-8 h-px bg-gray-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};