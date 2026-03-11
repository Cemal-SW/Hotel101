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
            <div className="flex flex-col items-center gap-2.5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-[1.35rem] font-medium transition-all duration-300"
                style={{
                  background: isCompleted || isCurrent ? "var(--gold)" : "transparent",
                  border: `1px solid ${isCompleted || isCurrent ? "var(--gold)" : "var(--border-strong)"}`,
                  color: isCompleted || isCurrent ? "var(--dark)" : "var(--cream)",
                  opacity: isCompleted || isCurrent ? 1 : 0.4,
                  fontFamily: "var(--font-raleway)",
                  fontVariantNumeric: "lining-nums tabular-nums",
                }}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className="hidden text-[0.95rem] tracking-[0.12em] uppercase sm:block"
                style={{
                  color: isCurrent ? "var(--gold)" : "var(--cream)",
                  fontFamily: "var(--font-raleway)",
                  fontWeight: isCurrent ? 500 : 300,
                  opacity: isCurrent ? 1 : 0.4,
                }}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div
                className="w-16 sm:w-24 h-px mx-2 mb-6 transition-all duration-300"
                style={{
                  background: isCompleted ? "var(--gold)" : "var(--border-color)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
