
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const parseCurrencyInput = (value: string): string => {
  return value.replace(/\D/g, "");
};
