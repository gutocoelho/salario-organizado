
export interface Category {
  name: string;
  percentage: number;
  color: string;
  description: string;
}

export interface Result extends Category {
  value: number;
}
