export type CartItem = {
  companyName: string; // Seller
  companyId: string; // Seller
  listing: {
    id: string;
    type: string;
    fisherman: { id: string; name: string };
    metric: string;
    sizeFrom: string;
    sizeTo: string;
    price: string;
    origin: { state: string; suburb: string; countryCode: string };
    description: string;
    caught: string; // yyyy-mm-dd
    ends: string;
    specifications: string[]; // ['Live', 'Wild', 'Whole'];
    image: string;
    minimumOrder: string; // '1.0'
    sellInMultiplesOf: boolean;
    remaining: number;
    average: number;
    isAquafuture: boolean;
    allowedWeightAdjustment: number;
    isFavourite: boolean;
    address: {
      id: string;
      streetNumber: string;
      streetName: string;
      suburb: string;
      state: string;
      postcode: string;
      countryCode: string;
    };
    measurementUnit: string;
  };
  orderBoxes: {
    id: string;
    weight: number;
    quantity: number;
    count: number;
  }[];
  subTotal: number;
  weight: number;
  id?: string; // only used for local referencing
};

export type CartPayload = CartItem | { id: string };

export type CartState = Record<string, CartItem>;
