import moment from 'moment';
import { GetListingByIdData } from 'types/store/GetListingByIdState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ListingProps } from './ListingDetails.props';

export const listingToListingProps = (
  data: GetListingByIdData | null
): ListingProps => {
  const soldWeight =
    (data?.original_weight || 0) - (data?.remaining_weight || 0);
  const sales = soldWeight * Number(data?.price_per_kilo || 0);

  const additionalInfos = [];
  if (data?.is_ike_jime) additionalInfos[additionalInfos.length] = 'Ike Jime';

  if (data?.is_ice_slurry)
    additionalInfos[additionalInfos.length] = 'Ice Slurry';

  if (data?.quality) additionalInfos[additionalInfos.length] = data.quality;

  return {
    carousel: {
      items:
        data?.images && data.images.length > 0
          ? data.images.map((image) => ({
              uri: image.url,
              tags: data?.is_aquafuture ? [{ label: 'Aquafuture' }] : [],
            }))
          : [
              {
                uri: data?.default_photo,
                tags: data?.is_aquafuture ? [{ label: 'Aquafuture' }] : [],
              },
            ],
    },
    sales: {
      sales: toPrice(sales),
      soldWeight: soldWeight.toFixed(2),
      totalWeight: (data?.original_weight || 0).toFixed(2),
      unit: formatMeasurementUnit(data?.measurement_unit),
    },
    productDetails: {
      title: data?.type_name || '',
      tags: additionalInfos
        .map((info) => ({
          label: info,
          type: 'blue',
        }))
        .concat(
          data?.specifications.map((specification) => ({
            label: specification.name,
            type: 'plain',
          })) || []
        ),
      size: sizeToString(
        data?.metric_label || '',
        data?.size_from,
        data?.size_to
      ),
      location: `${data?.origin.suburb}, ${data?.origin.state}, ${data?.origin.countryCode}`,
      listingAddress: `${data?.address_suburb}, ${data?.address_state}, ${data?.address_country_code}, ${data?.address_postcode}`,
      vendor: {
        uri: data?.coop_image,
        name: data?.coop_name,
        rating: data?.rating,
      },
      avgBoxSize: (data?.average || 0).toFixed(2),
      packaging: data?.packaging?.label,
      description: data?.description,
    },
    orderDetails: {
      price: toPrice(data?.price_per_kilo || 0, false),
      minOrder: data?.minimum_order || '',
      remaining: (data?.remaining_weight || 0).toFixed(2),
      unit: formatMeasurementUnit(data?.measurement_unit),
      validUntil: data?.end_date
        ? moment(data.end_date).toNow(true)
        : undefined,
      catchDate: data?.catch_date
        ? moment(data.catch_date).toDate()
        : undefined,
      catchRecurrence: data?.catch_recurrence || undefined,
      templateDeliveryDate: data?.template_delivery_date || null,
    },
    boxDetails: {
      boxes: data?.boxes,
      unit: formatMeasurementUnit(data?.measurement_unit),
    },
  };
};
