
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import type { Category } from "@/types/simulator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

interface AdjustmentStepProps {
  categories: Category[];
  onCategoryChange: (index: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const tooltipContent = {
  "Custos Fixos": `Custos Fixos – Sua base financeira
Essa categoria cobre suas despesas mensais essenciais, ou seja, tudo o que é necessário para manter sua vida funcionando. 

Aqui entram aluguel ou prestação do imóvel, contas de luz, água, internet e telefone, plano de saúde, supermercado, transporte (combustível, passagem de ônibus/metrô) e parcelas de financiamentos ou dívidas essenciais. 

O ideal é que esses custos não ultrapassem 50% do seu orçamento, garantindo espaço para outras áreas importantes.`,
  "Investimentos": `Investimentos – Construindo sua liberdade financeira
Essa parte do seu dinheiro é destinada a fazer seu patrimônio crescer e garantir uma aposentadoria confortável. 

Inclui aportes em renda fixa (Tesouro Direto, CDBs, LCI, LCA), ações e fundos imobiliários, previdência privada (se fizer sentido para você) e até criptomoedas, caso esteja alinhado ao seu perfil. 

Quanto antes você começar, mais fácil será alcançar a liberdade financeira, pois a constância nos aportes é o que realmente faz a diferença.`,
  "Sonhos/Metas": `Sonhos/Metas – Para você realizar o que deseja
Aqui fica o dinheiro reservado para objetivos de curto e médio prazo, além da sua reserva de emergência para imprevistos. 

Isso inclui a construção da reserva financeira (equivalente a pelo menos seis meses de despesas), viagens, entrada para um carro ou imóvel, cursos e capacitações. 

Para metas de curto prazo, o ideal é investir em opções mais seguras, como CDBs e fundos DI, garantindo liquidez sem comprometer seus planos.`,
  "Gastos Livres": `Gastos Livres – Para viver o presente sem culpa
Essa é a parte do orçamento que você pode gastar como quiser, sem afetar seu planejamento financeiro. 

Entra aqui tudo o que envolve lazer e bem-estar, como restaurantes, assinaturas de streaming, compras por prazer, passeios e hobbies. 

Ter um limite definido para essa categoria evita exageros e permite que você aproveite o presente sem comprometer sua segurança financeira no futuro.`,
};

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
        <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
          Recomendamos usar de 50% a 60% para Custos Fixos, 10% a 20% para Investimento, 15% a 25% para Sonhos/Metas e 15% a 30% para Gastos livres, mas podem ser ajustados conforme sua necessidade, respeitando o limite total de 100%.
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
              <div className="flex items-center gap-2">
                <h3 className="font-semibold" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button">
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <div className="p-4 whitespace-pre-wrap">
                      {tooltipContent[category.name]}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
