import moment from 'moment';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ListingProps } from './ListingDetails.props';

export const listingToListingProps = (
  data: GetAllListingsResponseItem | null
): ListingProps => {
  const soldWeight = (data?.originalWeight || 0) - (data?.remaining || 0);
  const sales = soldWeight * Number(data?.pricePerKilo || 0);

  return {
    carousel: {
      items: (data?.images || []).map((image) => ({
        uri: image,
        tags: data?.isAquafuture ? [{ label: 'Aquafuture' }] : [],
      })),
    },
    sales: {
      sales: toPrice(sales),
      soldWeight: soldWeight.toFixed(2),
      totalWeight: (data?.originalWeight || 0).toFixed(2),
      unit: formatMeasurementUnit(data?.measurementUnit),
    },
    productDetails: {
      title: data?.type || '',
      tags: data?.specifications
        ? data?.specifications.map((specification) => ({
            label: specification,
          }))
        : [],
      size: sizeToString(data?.typeMetric || '', data?.sizeFrom, data?.sizeTo),
      location: `${data?.origin.suburb}, ${data?.origin.state}, ${data?.origin.countryCode}`,
      vendor: {
        uri: data?.coopImage,
        name: data?.coopName,
        rating: data?.rating,
      },
      avgBoxSize: data?.average.toFixed(2) || '',
    },
    orderDetails: {
      price: toPrice(data?.pricePerKilo || 0, false),
      minOrder: data?.minimumOrder || '',
      remaining: (data?.remaining || 0).toFixed(2),
      unit: formatMeasurementUnit(data?.measurementUnit),
      validUntil: moment(data?.ends).toDate(),
      catchDate: moment(data?.catchDate).toDate(),
    },
    boxDetails: {
      boxes: data?.boxes,
      unit: formatMeasurementUnit(data?.measurementUnit),
    },
  };
};
