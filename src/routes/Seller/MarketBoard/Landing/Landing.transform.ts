import {
  CheckboxFilter,
  Filters,
} from 'components/module/FilterModal/FilterModal.props';
import moment from 'moment';
import { GetAllMarketRequestFiltersResponseItem } from 'types/store/GetAllMarketRequestFiltersState';

export const requestToModalFilter = (
  data?: GetAllMarketRequestFiltersResponseItem
): { filters: Filters[]; checkboxFilters: CheckboxFilter[] } => {
  if (!data) {
    return { filters: [], checkboxFilters: [] };
  }

  const locationValues = data.destination
    .map((val) => val.state)
    .filter((v) => typeof v === 'string' && v.length > 0);
  const sizeValues = [...data.sizeOptions.sizeList, 'Ungraded'];
  const specsValue = data.stateOptions.map((val) => val.name);
  const typeValues = data.typeOptions.map((val) => val.categoryName);

  const filters: Filters[] = [
    { label: 'Location', values: locationValues, type: 'choice' },
    {
      label: 'Size',
      values: sizeValues,
      type: 'choice',
    },
    {
      label: 'Specs',
      values: specsValue,
      type: 'choice',
    },
    {
      label: 'Type',
      values: typeValues,
      type: 'choice',
    },
  ];

  const checkboxFilters: CheckboxFilter[] = data.typeOptions.map((val) => ({
    label: val.categoryName,
    value: val.categoryName,
  }));

  return { filters, checkboxFilters };
};

export const getType = (
  values: string[],
  data: GetAllMarketRequestFiltersResponseItem
) => {
  const typeValues = data.typeOptions.map((val) => val.categoryName);

  const intersection = typeValues.filter((val) => values.includes(val));

  if (intersection.length === 0) {
    return undefined;
  }

  const [type] = intersection;

  const t = data.typeOptions.find(
    (typeOption) => typeOption.categoryName === type
  );

  return t?.typeIds ? t.typeIds[0] : undefined;
};

export const getSpecs = (
  values: string[],
  data: GetAllMarketRequestFiltersResponseItem
) => {
  const specs = data.stateOptions.map((val) => val.name);
  return specs.find((val) => values.includes(val));
};

export const getLocation = (
  values: string[],
  data: GetAllMarketRequestFiltersResponseItem
) => {
  const locationValues = data.destination
    .map((val) => val.state)
    .filter((v) => typeof v === 'string' && v.length > 0);

  return locationValues.find((val) => values.includes(val));
};

export const getSize = (
  values: string[],
  data: GetAllMarketRequestFiltersResponseItem
) => {
  const sizeValues = [...data.sizeOptions.sizeList, 'Ungraded'];
  return sizeValues.filter((val) => values.includes(val));
};

export const getExpiry = (date: string) => {
  const duration = moment().diff(moment(date), 'days');

  if (duration >= 7) {
    return 'Expired';
  }

  if (duration >= 5) {
    return 'Less than 48 hours left';
  }

  if (duration >= 2) {
    return 'Expires Soon';
  }

  return '';
};
