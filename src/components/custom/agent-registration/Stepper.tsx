"use client";

import { cn } from "@/lib/utils";

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  isFirstFormValid: boolean;
}

const Stepper = ({ step = 1, setStep, isFirstFormValid }: StepperProps) => {
  const handleClick = (nextStep: number) => {
    if (nextStep === 2 && !isFirstFormValid) return;
    setStep(nextStep);
  };

  const line = () => (
    <div
      className={cn(
        "flex-1 w-full border",
        step === 1 ? "border-white" : "border-black",
      )}
    ></div>
  );

  return (
    <div className="bg-primary p-4 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-1">
          <div className="w-full flex items-center">
            {/* First Number */}
            <div
              className="w-24 flex items-center cursor-pointer"
              onClick={() => handleClick(1)}
            >
              {/* Blank */}
              <div className="flex-1"></div>
              {/* Number */}
              <div className="relative flex justify-center items-center">
                <div className="w-8 h-8 rounded-full bg-black"></div>
                <span className="font-semibold absolute text-white">1</span>
              </div>
              {/* Line */}
              {line()}
            </div>
            {/* Line */}
            {line()}
            {/* Last Number */}
            <div
              className="w-24 flex items-center cursor-pointer"
              onClick={() => handleClick(2)}
            >
              {/* Line */}
              {line()}
              {/* Number */}
              <div className="relative flex justify-center items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full",
                    step === 1 ? "bg-white" : "bg-black",
                  )}
                ></div>
                <span
                  className={cn(
                    "font-semibold absolute",
                    step === 2 && "text-white",
                  )}
                >
                  2
                </span>
              </div>
              {/* Blank */}
              <div className="flex-1"></div>
            </div>
          </div>
          <div className="w-full flex items-center">
            {/* First Label */}
            <div className="w-24 text-center font-semibold text-sm">
              Data Diri
            </div>
            {/* Line */}
            <div className="flex-1"></div>
            {/* Last Number */}
            <div className="w-24 text-center font-semibold text-sm">
              Background
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
