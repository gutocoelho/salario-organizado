
// export const formatCurrency = (value: number): string => {
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value / 100);
// };
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value); // Remove the division by 100
};
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: "currency",
    currency: "BRL",
    useGrouping: true  // This ensures thousands separators are shown
  }).format(value);
};

export const parseCurrencyInput = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");
  
  // Remove leading zeros
  return numbers.replace(/^0+/, "") || "0";
};
