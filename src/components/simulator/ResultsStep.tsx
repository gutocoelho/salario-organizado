import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Result } from "@/types/simulator";
import { formatCurrency } from "@/utils/currency";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ResultsStepProps {
  results: Result[];
  onReset: () => void;
  onBack: () => void;
}

export const ResultsStep = ({ results, onReset, onBack }: ResultsStepProps) => {
  const total = results.reduce((sum, result) => sum + result.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <div className="text-center">
        <span className="px-3 py-1 text-sm font-semibold bg-category-discretionary/10 text-category-discretionary rounded-full">
          Resultados
        </span>
        <h2 className="text-3xl font-bold mt-4">
          Sua distribuição de renda recomendada
        </h2>
        <p className="text-lg mt-2 text-muted-foreground">
          Parabéns por planejar suas finanças! Com pequenas decisões, grandes mudanças acontecem.
        </p>
        <p className="text-muted-foreground mt-2">
          Renda Total: {formatCurrency(total)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={results}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {results.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Valor"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4">
          {results.map((result) => (
            <motion.div
              key={result.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg bg-card border"
              style={{ borderColor: `${result.color}30` }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ color: result.color }}>
                  {result.name}
                </h3>
                <span className="text-sm font-medium">
                  {result.percentage}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 mb-2">
                {result.description}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(result.value)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg text-muted-foreground text-sm leading-relaxed">
        Ao dividir seu dinheiro entre essas quatro categorias, você garante que suas contas estarão pagas, seus investimentos vão crescer e ainda poderá realizar sonhos e aproveitar a vida. O planejamento financeiro não é sobre privação, mas sim sobre tomar decisões estratégicas para viver melhor hoje e no futuro.
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-8 rounded-lg relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        }}
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2">
            Caminho da Liberdade Financeira
          </h3>
          <p className="text-white/90 mb-4 max-w-lg">
            Aprenda a transformar sua relação com o dinheiro para ter mais dinheiro sobrando todos os meses e fazer seus primeiros investimentos.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open(
                "https://pay.hotmart.com/C84274750V?checkoutMode=10&bid=1701871396665",
                "_blank"
              )
            }
          >
            Eu quero aprender
          </Button>
        </div>
      </motion.div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          Ajustar Valores
        </Button>
        <Button variant="outline" onClick={onReset}>
          Nova Simulação
        </Button>
      </div>
    </motion.div>
  );
};
