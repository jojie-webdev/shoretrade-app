import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { GetListingsBySalesChannelResponseItem } from 'types/store/GetListingsBySalesChannelState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ItemProp } from './Selling.props';

export const listingToItem = (
  data: GetListingsBySalesChannelResponseItem
): Omit<ItemProp, 'onClick' | 'onRemove' | 'onClickEdit'> => {
  const soldWeight = (data?.original_weight || 0) - (data?.remaining_weight || 0);
  const sales = soldWeight * Number(data?.price_per_kilo || 0);

  return {
    id: data.listing_id,
    uri: data.images && data.images[0] ? data.images[0].url : data.default_photo,
    title: data.type_name,
    price: toPrice(data?.price_per_kilo || 0, false),
    tags: data?.specifications.map((specification) => ({
      label: specification.name,
    })),
    size: sizeToString(data.metric_label || '', data.size_from, data.size_to),
    listedOn: moment(data.created_at).toDate(),
    expiresIn:
      data.end_date && !data.catch_recurrence
        ? moment(data.end_date).toDate()
        : undefined,
    timeLeft: data.end_date ? moment(data.end_date).toNow(true) : undefined,
    remaining: Number(data.remaining_weight).toFixed(2),
    unit: formatMeasurementUnit(data.measurement_unit),
    originalWeight: Number(data.original_weight).toFixed(2),
    sales: toPrice(sales),
    data,
  };
};
