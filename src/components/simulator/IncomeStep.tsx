
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { formatCurrency, parseCurrencyInput } from "@/utils/currency";

interface IncomeStepProps {
  income: string;
  onIncomeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IncomeStep = ({
  income,
  onIncomeChange,
  onNext,
  onBack,
}: IncomeStepProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrencyInput(e.target.value);
    onIncomeChange(parsed);
  };

  const displayValue = income ? formatCurrency(Number(income) * 100) : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto p-6"
    >
      <span className="px-3 py-1 text-sm font-semibold bg-category-fixed/10 text-category-fixed rounded-full">
        Passo 1 de 3
      </span>
      <h2 className="text-3xl font-bold text-center">
        Qual é a sua renda mensal?
      </h2>
      <div className="w-full">
        <Input
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder="R$ 0,00"
          inputMode="numeric"
          className="text-2xl text-center h-16"
        />
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext} disabled={!income || income === "0"}>
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
