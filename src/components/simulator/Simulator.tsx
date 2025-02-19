
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeStep } from "./WelcomeStep";
import { IncomeStep } from "./IncomeStep";
import { AdjustmentStep } from "./AdjustmentStep";
import { ResultsStep } from "./ResultsStep";
import type { Category, Result } from "@/types/simulator";

const defaultCategories: Category[] = [
  {
    name: "Custos Fixos",
    percentage: 55,
    color: "#ea384c",
    description: "Suas despesas mensais essenciais",
  },
  {
    name: "Investimentos",
    percentage: 10,
    color: "#8B5CF6",
    description: "Foco garantir uma aposentadoria gratificante",
  },
  {
    name: "Sonhos/Metas",
    percentage: 20,
    color: "#F97316",
    description: "Seus objetivos de curto prazo e emergências",
  },
  {
    name: "Gastos Livres",
    percentage: 15,
    color: "#0EA5E9",
    description: "Para que você possa viver sua vida hoje",
  },
];

export const Simulator = () => {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState("");
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const handleCategoryChange = (index: number, value: number) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], percentage: value };
    setCategories(newCategories);
  };

  const calculateResults = (): Result[] => {
    const incomeValue = Number(income);
    return categories.map((category) => ({
      ...category,
      value: (category.percentage / 100) * incomeValue,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const reset = () => {
    setStep(0);
    setIncome("");
    setCategories(defaultCategories);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeStep key="welcome" onNext={nextStep} />}
        {step === 1 && (
          <IncomeStep
            key="income"
            income={income}
            onIncomeChange={setIncome}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 2 && (
          <AdjustmentStep
            key="adjustment"
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <ResultsStep
            key="results"
            results={calculateResults()}
            onReset={reset}
            onBack={prevStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
