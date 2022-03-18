import { GenericResponse } from 'types/GenericResponse';

export type UploadBulkMeta = {
  companyId: string;
  csv: string;
};

export type UploadBulkState = {
  category?: string;
  metric?: string;
  employeeId?: string;
  type?: string;
  sizeFrom?: string;
  sizeTo?: string;
  isUngraded?: boolean;
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
  }[];
  specifications: string[];
  images: Record<string, any>;
  pricePerKilo?: number;
  minOrder?: number;
  sellInMultiplesOfMinOrder?: boolean;
  catchDate?: Date | string;
  description?: string;
  ends?: Date | string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  isAquafuture: boolean;
  dirtyFields?: Array<string>;
  coopId?: string;
  addressId?: string;
  measurementUnit?: string;
  ref?: string;
  typeDisplayText: string;
  specificationsDisplayText: string[];
  quality: string | null;
  isPreAuctionSale: boolean;
  isAuctionSale: boolean;
  auctionDate: string | null;
  isIkeJime: boolean;
  isIceSlurry: boolean;
  packaging: { id: string | null } | null;
};

export type UploadBulkPayload = GenericResponse<{
  companyId: string;
  editableListings: UploadBulkState[];
}>;
