"use client";

import { useClipStore } from "@/store/clip-store";
import StepStrategy from "./steps/step-strategy";
import StepScript from "./steps/step-script";
import StepVoice from "./steps/step-voice";
import StepMedia from "./steps/step-media";
import StepAssembly from "./steps/step-assembly";

export default function NovoClipPage() {
  const { currentStep } = useClipStore();

  switch (currentStep) {
    case 1:
      return <StepStrategy />;
    case 2:
      return <StepScript />;
    case 3:
      return <StepVoice />;
    case 4:
      return <StepMedia />;
    case 5:
      return <StepAssembly />;
    default:
      return <StepStrategy />;
  }
}
