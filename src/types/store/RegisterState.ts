import { GenericResponse } from 'types/GenericResponse';
import { PlaceData } from 'types/PlaceData';
import { CategoryPayload } from 'types/store/GetCategories';
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
  businessLogo?: File | null;
  userGroup: 'buyer' | 'seller';
  registerDebtFinancing?: boolean;
  debtFinancingSegment?: string;
  debtFinancingEstRevenue?: string;
  products?: string[];
  licenseImage?: File | null;
  licenseName?: string;
  marketSector: string;
  marketSelling?: CategoryPayload[];
  marketBuying?: CategoryPayload[];
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
  sellerLicense?: {
    url: string;
    name?: string;
    fileType: string;
  };
  marketSector: string;
  marketSelling?: CategoryPayload[];
  marketBuying?: CategoryPayload[];
};

export type RegisterPayload = GenericResponse;
