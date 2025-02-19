
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-6 text-center max-w-2xl mx-auto p-6"
    >
      <span className="px-3 py-1 text-sm font-semibold bg-category-investment/10 text-category-investment rounded-full">
        Planejamento Financeiro
      </span>
      <h1 className="text-4xl font-bold tracking-tight">
        Salário Zen
        <span className="block text-2xl mt-2 text-muted-foreground">
          Simulador de Distribuição de Renda
        </span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        Organize suas finanças de maneira inteligente e equilibrada. Vamos ajudá-lo
        a planejar melhor seus gastos mensais.
      </p>
      <Button
        size="lg"
        className="mt-8 animate-fade-in"
        onClick={onNext}
      >
        Começar Simulação
      </Button>
    </motion.div>
  );
};
