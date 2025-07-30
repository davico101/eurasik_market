import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div
                key={stepNumber}
                className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-200
                  ${isCompleted 
                    ? 'bg-primary border-primary' 
                    : isCurrent 
                      ? 'bg-background border-primary' :'bg-background border-muted-foreground/30'
                  }
                `}
              >
                {isCompleted && (
                  <Icon 
                    name="Check" 
                    size={12} 
                    className="text-primary-foreground transform translate-x-0.5 translate-y-0.5" 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center max-w-[80px]">
              <span className={`
                font-caption text-xs text-center leading-tight
                ${isCurrent 
                  ? 'text-primary font-medium' 
                  : isCompleted 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }
              `}>
                {step.label}
              </span>
              {step.icon && (
                <Icon 
                  name={step.icon} 
                  size={14} 
                  className={`
                    mt-1
                    ${isCurrent 
                      ? 'text-primary' 
                      : isCompleted 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div className="mt-4 text-center">
        <p className="font-body text-sm text-foreground">
          Paso {currentStep} de {totalSteps}
        </p>
        <p className="font-caption text-xs text-muted-foreground">
          {steps[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;