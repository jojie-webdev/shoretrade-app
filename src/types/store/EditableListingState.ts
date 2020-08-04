export type EditableListingState = Partial<{
  currentListingId?: string; // passed with type to control form data flow
  company: string; // company name, to get shipping address later on
  employee: string; // employee id
  type: string; // type id
  states: string[];
  isUngraded: boolean;
  sizeFrom: string | null;
  sizeTo: string | null;
  images: {
    image: any | null; // TODO: Update type
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
  }[];
  minOrder: number;
  sellInMultiplesOfMinOrder?: boolean;
  catchDate: Date;
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: Date;
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
}>;

export type EditableListingPayload = EditableListingState;
