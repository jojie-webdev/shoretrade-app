export type Result = {
  id: string;
  type: string;
  offers: number;
  image: string;
  expiry: string;
};

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Result[];
  currentPath: string;
  onClickItem: (row: any) => void;
  isPendingAccount: boolean;
}
