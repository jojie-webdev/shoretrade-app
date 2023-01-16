import { TypeMarginCategoryName } from 'routes/Seller/AddProduct/ChooseType/ChooseType.props';
import { GenericResponse } from 'types/GenericResponse';

export type SearchProductTypeMeta = {
  term: string;
};

export type SearchProductTypeResponseItem = {
  label: string;
  value: string;
  image: string;
  marginCategory?: TypeMarginCategoryName;
};

export type SearchProductTypePayload = GenericResponse<{
  token: string;
  types: SearchProductTypeResponseItem[];
}>;
