
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
    .replace(',', '.');
};

export const parseCurrencyInput = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/^0+/, "") || "0";
};
