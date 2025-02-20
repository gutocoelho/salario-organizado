
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
    const value = e.target.value.replace(/\D/g, '');
    onIncomeChange(value);
  };

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
          value={income}
          onChange={handleChange}
          placeholder="Digite apenas números"
          className="text-2xl text-center h-16"
        />
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          disabled={!income || parseInt(income, 10) === 0}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
