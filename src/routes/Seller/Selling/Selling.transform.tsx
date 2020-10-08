import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ItemProp } from './Selling.props';

export const listingToItem = (data: GetAllListingsResponseItem): ItemProp => {
  return {
    uri: pathOr(undefined, ['images', '0'], data),
    title: data.type,
    price: toPrice(data?.pricePerKilo || 0, false),
    tags: data?.specifications.map((specification) => ({
      label: specification,
    })),
    size: sizeToString(data.typeMetric, data.sizeFrom, data.sizeTo),
    listedOn: moment(data.createdAt).toDate(),
    expiresIn: moment(data.ends).toDate(),
    remaining: Number(data.remaining).toFixed(2),
    unit: formatMeasurementUnit(data.measurementUnit),
    originalWeight: Number(data.originalWeight).toFixed(2),
    data,
  };
};
