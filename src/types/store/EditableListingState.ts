export type EditableListingState = Partial<{
  isAlreadyCreated?: boolean; //from listing details edit
  currentStep: number;
  currentHistoricalListingId?: string; // passed with type to control form data flow
  currentListingId?: string; // passed with type to control form data flow
  company: string; // company name, to get shipping address later on
  employee: string; // employee id
  type: string; // type id
  states: string[];
  isUngraded: boolean;
  sizeFrom: string | null;
  sizeTo: string | null;
  images: {
    image: {
      name: string;
      type: string;
      data: string | ArrayBuffer | null; // base64 image data
    };
    requirementId: string;
  }[];
  existingImages: {
    image: string;
    requirementId: string;
  }[];
  pricePerKilo: number;
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
    fixed?: boolean;
  }[];
  minOrder: number;
  sellInMultiplesOfMinOrder?: boolean;
  catchDate: Date | null;
  catchRecurrence: string | null;
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: Date | null;
  isAquafuture: boolean;
  addressId: string;
  isCustomType?: boolean;
  customTypeData?: {
    name: string;
    categoryId: string;
    metric: {
      id: string;
      name: string;
    };
  };
  isBulkUpload?: boolean;
  packaging?: {
    id?: string;
    custom?: {
      width: number;
      height: number;
      length: number;
      airlineApproved?: boolean;
    };
  };
  quality: null | string;
}>;

export type EditableListingPayload = EditableListingState;
