
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface IncomeStepProps {
  income: string;
  onIncomeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IncomeStep = ({
  onNext,
  onBack,
}: IncomeStepProps) => {
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
        Valor fixo para teste:
      </h2>
      <div className="w-full text-center text-2xl font-bold">
        R$ 2.500,00
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
