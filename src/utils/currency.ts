
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};

export const parseCurrencyInput = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");
  
  // Remove leading zeros
  return numbers.replace(/^0+/, "") || "0";
};
