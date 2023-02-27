import { GenericResponse } from 'types/GenericResponse';
import { PlaceData } from 'types/PlaceData';
import { CategoryPayload } from 'types/store/GetCategories';

export type RegisterMeta = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile_cc: string;
  mobile_no: string;
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
  sfmNumber?: string | null;
  userGroup: 'buyer' | 'seller';
  registerDebtFinancing?: boolean;
  debtFinancingSegment?: string;
  debtFinancingEstRevenue?: string;
  products?: string[];
  licenses?: {
    file: any;
    fileName: string;
    fileBack?: any;
    stateId?: string;
    expiredAt?: string;
  }[];
  marketSector: string;
  marketSelling?: CategoryPayload[];
  marketBuying?: CategoryPayload[];
  cardToken: string;
  subscriptionPreference: {
    plan: string;
    addOns: string[];
    transactionValue?: string;
  };
  isDDA?: boolean;
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
  mobile_cc: string;
  mobile_no: string;
  profileImage?: string;
  addresses: Partial<PlaceData>[];
  bankAccounts:
    | {
        accountName: string;
        bsb: string;
        accountNumber: string;
      }
    | {};
  sfmNumber?: string | null;
  playerId?: string;
  sellerLicenses?: {
    url: string;
    name: string;
    fileType: 'IMAGE' | 'PDF' | 'DOC';
    url_back?: string;
    file_type_back?: string;
    expired_at: string;
    state_id: string;
  }[];
  marketSector: string;
  marketSelling?: CategoryPayload[];
  marketBuying?: CategoryPayload[];
  cardToken: string;
  subscriptionPreference: {
    plan: string;
    addOns: string[];
    transactionValue?: string;
  };
  isDDA?: boolean;
};

export type RegisterPayload = GenericResponse;
