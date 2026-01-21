import React from 'react';
import { WORKFLOW_STEPS } from '../../constants/statusConfig';

const Stepper = ({ currentStep, currentStepNumber }) => {
  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStepNumber) return 'completed';
    if (stepNumber === currentStepNumber) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {WORKFLOW_STEPS.slice(0, 4).map((step, index) => {
          const status = getStepStatus(step.number);
          const isLast = index === 3;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : status === 'current'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
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
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    getStepStatus(step.number + 1) === 'completed' ||
                    status === 'completed'
                      ? 'bg-green-500'
                      : status === 'current'
                        ? 'bg-blue-200'
                        : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
