
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
    const value = e.target.value;
    // Remove qualquer caractere não numérico, exceto ponto e vírgula
    const cleanValue = value.replace(/[^\d,.]/g, "");
    
    // Converte para um formato que possa ser convertido para número
    const numberValue = cleanValue.replace(",", ".");
    
    // Verifica se é um número válido
    if (!isNaN(Number(numberValue))) {
      onIncomeChange(cleanValue);
    }
  };

  const formatDisplayValue = (value: string) => {
    if (!value) return "";
    
    // Remove todos os caracteres não numéricos, exceto ponto e vírgula
    const cleanValue = value.replace(/[^\d,.]/g, "");
    
    // Formata o número para reais
    try {
      const number = Number(cleanValue.replace(",", "."));
      if (!isNaN(number)) {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(number);
      }
    } catch (e) {
      return value;
    }
    
    return value;
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
          value={formatDisplayValue(income)}
          onChange={handleChange}
          placeholder="R$ 0,00"
          inputMode="decimal"
          className="text-2xl text-center h-16"
        />
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!income || income === "0" || income === "0,00"}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
