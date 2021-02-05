interface Price {
  from: number;
  to: number;
  unit: string;
}
export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  sortIndex: number;
}

export interface CategoryType {
  id: string;
  name: string;
  count: string;
  thumbnail: string;
  price: Price;
  measurementUnit: string;
}

export interface CategoryPayload {
  id: string;
  name: string;
}

interface Price {
  from: number;
  to: number;
  unit: string;
}
