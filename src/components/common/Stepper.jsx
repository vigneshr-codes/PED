import React from 'react';
import { Check } from 'lucide-react';

const WORKFLOW_STEPS = [
  { key: 'project', label: 'Project', number: 1 },
  { key: 'scope', label: 'Scope', number: 2 },
  { key: 'estimate', label: 'Estimate', number: 3 },
  { key: 've', label: 'VE Tool', number: 4 }
];

const Stepper = ({ currentStep, currentStepNumber }) => {
  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStepNumber) return 'completed';
    if (stepNumber === currentStepNumber) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {WORKFLOW_STEPS.map((step, index) => {
          const status = getStepStatus(step.number);
          const isLast = index === WORKFLOW_STEPS.length - 1;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : status === 'current'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                {/* Label */}
                <span
                  className={`mt-2 text-xs font-medium ${
                    status === 'current'
                      ? 'text-blue-600'
                      : status === 'completed'
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                  <div
                    className={`h-full ${
                      status === 'completed'
                        ? 'w-full bg-green-500'
                        : 'w-0'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
