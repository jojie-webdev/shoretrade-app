export type EditableMarketRequestState = Partial<{
  typeId: string;
  typeName?: string;
  buyerId: string;
  companyId: string;
  addressId: string;
  weight: Weight;
  stateOptions: string[];
  size: sizeData;
  sizes: Size[];
  isUngraded: boolean;
  chosenSpecs: string[];
  isMarketMatchScreen: boolean;
  autoClose: boolean;
}>;
export interface sizeData {
  ungraded: boolean;
  from: string | null;
  to: string | null;
  options?: string[];
}
interface Size {
  from: string | null;
  to: string | null;
}

export interface Weight {
  from: number | null;
  to: number | null;
}

export type EditableMarketRequestPayload = EditableMarketRequestState;
