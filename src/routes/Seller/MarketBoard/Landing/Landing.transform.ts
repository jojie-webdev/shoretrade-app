import {
  CheckboxFilter,
  Filters,
} from 'components/module/FilterModal/FilterModal.props';
import moment from 'moment';
import { prop, sortBy } from 'ramda';
import {
  GetActiveOffersRequestResponseItem,
  Negotiations,
  ShippingAddress,
} from 'types/store/GetActiveOffersState';
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

  // if (duration >= 5) {
  //   return 'Less than 48 hours left';
  // }

  // if (duration >= 2) {
  //   return 'Expires Soon';
  // }

  if (duration >= 5) {
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
  const isRedLabel = expiry === 'Expires Soon';

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

export const getShippingAddress = (shippingAddress: ShippingAddress) => {
  const selectedShippingAddressData = `${shippingAddress?.suburb} ${shippingAddress?.state} ${shippingAddress?.postcode}`;

  return selectedShippingAddressData;
};

export const getOfferByMarketRequest = (
  data: GetAllMarketRequestResponseItem,
  activeOffers?: GetActiveOffersRequestResponseItem[]
) => {
  const _offer = activeOffers?.find(
    (offer) => offer.marketRequest.id === data.id
  );

  return _offer;
};

const sortNegos = (negotiations: Negotiations[]) => {
  const negoSorter = sortBy(prop('created_at'));
  const sortedNegos = negoSorter(negotiations || []).reverse();

  return sortedNegos;
};

export const isPaymentRequired = (negotiations: Negotiations[]) => {
  const sortedNegos = sortNegos(negotiations);

  if (sortedNegos.length >= 2) {
    if (sortedNegos[0].price === sortedNegos[1].price) {
      return true;
    }
  }
};

export const isPaymentPending = (negotiations: Negotiations[]) => {
  const sortedNegos = sortNegos(negotiations);
  const hours = moment().diff(moment(sortedNegos[0]?.created_at), 'hours');
  const isPending = 24 > hours;

  return isPending;
};

export const isCounterOfferMade = (
  negotiations: Negotiations[],
  from: 'seller' | 'buyer'
) => {
  const sortedNegos = sortNegos(negotiations);
  let isCounterOfferMade = false;

  if (from === 'seller') {
    isCounterOfferMade = sortedNegos[0].type === 'NEW_OFFER';
  } else {
    isCounterOfferMade = sortedNegos[0].type === 'COUNTER_OFFER';
  }

  return isCounterOfferMade;
};

export const getStatusBadgeColor = (
  status: GetActiveOffersRequestResponseItem['status']
) => {
  if (status === 'OPEN') return theme.brand.alert;
  if (status === 'ACCEPTED') return theme.brand.success;
  if (status === 'DECLINED') return theme.brand.error;
  if (status === 'CLOSED') return theme.brand.error;
  return '';
};

export const isOfferMade = (
  data: GetAllMarketRequestResponseItem,
  activeOffers?: GetActiveOffersRequestResponseItem[]
) => {
  const { status } = getOfferByMarketRequest(data, activeOffers) || {};
  const isOfferMade = status === 'OPEN';

  return isOfferMade;
};

export const getStatus = (
  status: GetActiveOffersRequestResponseItem['status']
) => {
  if (status === 'OPEN') return 'NEGOTIATION';
  if (status === 'ACCEPTED') return 'ACCEPTED';
  if (status === 'DECLINED') return 'LOST';
  if (status === 'CLOSED') return 'DECLINED';
  return '';
};
