export type AddCartItemMeta = {
  employeeId: string;
  boxes: {
    id: string; // listing box id
    quantity: number;
  }[];
};

export type AddCartItemPayload = {
  message: string;
  data: {
    transactionRef: string;
    items: string[];
  }; // cart item ids
};
