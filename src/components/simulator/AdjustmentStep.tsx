
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import type { Category } from "@/types/simulator";
import { toast } from "sonner";

interface AdjustmentStepProps {
  categories: Category[];
  onCategoryChange: (index: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AdjustmentStep = ({
  categories,
  onCategoryChange,
  onNext,
  onBack,
}: AdjustmentStepProps) => {
  const total = categories.reduce((sum, cat) => sum + cat.percentage, 0);

  const handleNext = () => {
    if (total !== 100) {
      toast.error("O total deve ser 100%");
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-2xl mx-auto p-6 space-y-8"
    >
      <div className="text-center">
        <span className="px-3 py-1 text-sm font-semibold bg-category-goals/10 text-category-goals rounded-full">
          Passo 2 de 3
        </span>
        <h2 className="text-3xl font-bold mt-4">Ajuste os percentuais</h2>
        <p className="text-muted-foreground mt-2">
          Total: {total}% {total === 100 ? "✓" : "(ajuste para 100%)"}
        </p>
      </div>

      <div className="grid gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg bg-card border"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold" style={{ color: category.color }}>
                {category.name}
              </h3>
              <span className="text-sm font-medium">{category.percentage}%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>
            <Slider
              value={[category.percentage]}
              onValueChange={(value) => onCategoryChange(index, value[0])}
              max={100}
              step={1}
              className="mt-2"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Ver Resultados</Button>
      </div>
    </motion.div>
  );
};
