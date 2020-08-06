import { GenericResponse } from 'types/GenericResponse';
import { PlaceData } from 'types/PlaceData';

export type RegisterMeta = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile: string;
  company: {
    businessName: string;
    abn: string;
  };
  bankAccounts?: {
    accountName: string;
    bsb: string;
    accountNumber: string;
  };
  address: PlaceData;
  businessLogo?: any | null; // TODO: Update type
  userGroup: 'buyer' | 'seller';
  registerDebtFinancing?: boolean;
  debtFinancingSegment?: string;
  debtFinancingEstRevenue?: string;
  products?: string[];
};

export type RegisterRequestData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: {
    name: string;
    abn: string;
    relationship?: string;
  };
  debtFinancingSegment: string;
  registerDebtFinancing: boolean;
  debtFinancingEstRevenue: number;
  url?: string;
  products?: string[];
  mobile: string;
  profileImage?: string;
  addresses: Partial<PlaceData>[];
  bankAccounts:
    | {
        accountName: string;
        bsb: string;
        accountNumber: string;
      }
    | {};
  playerId?: string;
};

export type RegisterPayload = GenericResponse;
