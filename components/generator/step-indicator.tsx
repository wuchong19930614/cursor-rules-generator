'use client';

interface StepIndicatorProps {
  currentStep: number;
  steps: { number: number; label: string }[];
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: StepIndicatorProps) {
  const progressPercent = steps.length > 0
    ? Math.round(((currentStep - 1) / (steps.length - 1)) * 100)
    : 0;

  return (
    <nav aria-label="Generator steps" className="w-full space-y-3">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <li key={step.number} className="flex-1 flex items-center min-w-0">
              {/* Connector line before (skip first) */}
              {index > 0 && (
                <div
                  className={`hidden sm:block h-0.5 flex-1 min-w-[1rem] mr-1 sm:mr-2 rounded ${
                    isCompleted || isActive
                      ? 'bg-blue-600 dark:bg-blue-400'
                      : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                onClick={() => onStepClick?.(step.number)}
                disabled={!onStepClick}
                className={`
                  flex items-center justify-center gap-1 sm:gap-1.5
                  min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px]
                  px-1.5 sm:px-3
                  rounded-lg text-xs sm:text-sm font-medium
                  transition-colors duration-150
                  flex-shrink-0
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isCompleted
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                  }
                  ${onStepClick ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700' : 'cursor-default'}
                `}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${step.number}: ${step.label}${isCompleted ? ' (completed)' : ''}${isActive ? ' (current)' : ''}`}
              >
                {isCompleted ? (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center text-xs">
                    {step.number}
                  </span>
                )}
                <span className="hidden xs:inline sm:inline whitespace-nowrap">
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Progress bar */}
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Progress text */}
      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
        Step {currentStep} of {steps.length}
        {currentStep < steps.length && ` — ${Math.round((currentStep / steps.length) * 100)}% complete`}
        {currentStep === steps.length && ' — Ready to download!'}
      </p>
    </nav>
  );
}
