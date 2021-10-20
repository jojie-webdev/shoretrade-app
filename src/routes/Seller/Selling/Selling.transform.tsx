import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ItemProp } from './Selling.props';

export const listingToItem = (
  data: GetAllListingsResponseItem
): Omit<ItemProp, 'onClick' | 'onRemove' | 'onClickEdit'> => {
  const soldWeight = (data?.originalWeight || 0) - (data?.remaining || 0);
  const sales = soldWeight * Number(data?.pricePerKilo || 0);

  return {
    uri: pathOr(undefined, ['images', '0'], data),
    title: data.type,
    price: toPrice(data?.pricePerKilo || 0, false),
    tags: data?.specifications.map((specification) => ({
      label: specification,
    })),
    size: sizeToString(data.typeMetric, data.sizeFrom, data.sizeTo),
    listedOn: moment(data.createdAt).toDate(),
    expiresIn:
      data.ends && !data.catchRecurrence
        ? moment(data.ends).toDate()
        : undefined,
    remaining: Number(data.remaining).toFixed(2),
    unit: formatMeasurementUnit(data.measurementUnit),
    originalWeight: Number(data.originalWeight).toFixed(2),
    sales: toPrice(sales),
    data,
  };
};
