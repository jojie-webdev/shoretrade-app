import {
  CheckboxFilter,
  Filters,
} from 'components/module/FilterModal/FilterModal.props';
import moment from 'moment';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestFiltersResponseItem } from 'types/store/GetAllMarketRequestFiltersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import theme from 'utils/Theme';

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

  return 'Plenty of time';
};

interface request {
  label: string;
  value: string;
}

export const getRespectiveValues = (
  toFind: string,
  requestFilter: request[],
  data: GetAllMarketRequestFiltersResponseItem
) => {
  if (toFind === 'Location') {
    const filterLocation = requestFilter
      .filter((i) => i.label === toFind)
      .map((i) => {
        return i.value;
      });
    return filterLocation.reduce(
      (accum: any, cur: any) => accum.concat(cur),
      []
    );
  }
  if (toFind === 'Type') {
    const filterTypes = requestFilter
      .filter((i) => i.label === toFind)
      .map((i) => {
        return data.typeOptions.find(
          (typeOption) => typeOption.categoryName === i.value
        )?.typeIds;
      });
    return filterTypes.reduce((accum: any, cur: any) => accum.concat(cur), []);
  }
  if (toFind === 'Size') {
    const filterSize = requestFilter
      .filter((i) => i.label === toFind)
      .map((i) => {
        return i.value;
      });
    return filterSize.reduce((accum: any, cur: any) => accum.concat(cur), []);
  }
  if (toFind === 'Specs') {
    const filterSpecs = requestFilter
      .filter((i) => i.label === toFind)
      .map((i) => {
        return data.stateOptions.find(
          (stateOptions) => stateOptions.name === i.value
        )?.name;
      });
    return filterSpecs.reduce((accum: any, cur: any) => accum.concat(cur), []);
  }
  return [];
};

export const isRedLabel = (createdAt: string) => {
  const expiry = getExpiry(createdAt);
  const isRedLabel =
    expiry === 'Expires Soon' || expiry === 'Less than 48 hours left';

  return isRedLabel;
};

export const identifyBuyerRequest = (
  data: GetActiveOffersRequestResponseItem,
  buyerRequests?: GetAllMarketRequestResponseItem[]
) => {
  const buyerRequest = buyerRequests?.find(
    (buyerRequest) => buyerRequest.id === data.marketRequest.id
  );

  return buyerRequest;
};

export const getShippingAddress = (
  data: GetActiveOffersRequestResponseItem,
  buyerRequests?: GetAllMarketRequestResponseItem[]
) => {
  const buyerRequest = identifyBuyerRequest(data, buyerRequests);
  const { shippingTo } = buyerRequest || {};
  const address = `${shippingTo?.suburb} ${shippingTo?.state} ${shippingTo?.postcode}`;

  return address;
};

export const hasShippingAddress = (
  data: GetActiveOffersRequestResponseItem,
  buyerRequests?: GetAllMarketRequestResponseItem[]
) => {
  const { shippingTo } = identifyBuyerRequest(data, buyerRequests) || {};
  const { suburb, state, postcode } = shippingTo || {};
  const hasAddress = suburb || state || postcode;

  return hasAddress;
};
