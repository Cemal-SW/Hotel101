interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
                style={{
                  background: isCompleted || isCurrent ? "var(--gold)" : "transparent",
                  border: `1px solid ${isCompleted || isCurrent ? "var(--gold)" : "rgba(255,255,255,0.2)"}`,
                  color: isCompleted || isCurrent ? "var(--dark)" : "rgba(245,240,232,0.4)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className="text-xs tracking-wider uppercase hidden sm:block"
                style={{
                  color: isCurrent ? "var(--gold)" : "rgba(245,240,232,0.4)",
                  fontFamily: "var(--font-raleway)",
                  fontWeight: isCurrent ? 500 : 300,
                }}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div
                className="w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-300"
                style={{
                  background: isCompleted
                    ? "var(--gold)"
                    : "rgba(255,255,255,0.15)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
