export type AuthState = {
  token: string | null;
  type: 'buyer' | 'seller' | null;
};
