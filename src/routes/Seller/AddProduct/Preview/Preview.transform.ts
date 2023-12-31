import moment from 'moment';
import unnest from 'ramda/es/unnest';
import { EditableListingState } from 'types/store/EditableListingState';
import { CategoryData } from 'types/store/GetCustomFormDataState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ListingProps } from '../../Selling/ListingDetails/ListingDetails.props';

export const editableListingToListingProps = (
  editableListing: Partial<EditableListingState>,
  listingFormData: GetListingFormDataResponse | null,
  categoryData?: CategoryData,
  sellerImage?: string,
  companyAddress?: Partial<{
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  }>
): ListingProps => {
  const isCustomType = editableListing?.isCustomType || false;
  const totalWeight = (editableListing?.boxes || []).reduce(
    (accumulator, current) => {
      const subTotalWeight = current.weight * current.quantity;
      return accumulator + subTotalWeight;
    },
    0
  );

  const soldWeight = (editableListing?.boxes || []).reduce(
    (accumulator, current) => {
      const subTotalWeight = current.weight * (current.sold || 0);
      return accumulator + subTotalWeight;
    },
    0
  );
  const stateOptions =
    (isCustomType ? categoryData?.states : listingFormData?.stateOptions) || [];
  const specifications = (editableListing?.states || []).map(
    (specificationId, i) => {
      // order of editableListings.states might be modified by BE
      // search for possible matches regardless of the group
      const options = unnest(stateOptions);
      return (
        options.find(
          (option) => option.categoryStateOptionId === specificationId
        )?.state.name || ''
      );
    }
  );

  const additionalInfos = [];
  if (editableListing.isIkeJime)
    additionalInfos[additionalInfos.length] = 'Ike Jime';

  if (editableListing.isIceSlurry)
    additionalInfos[additionalInfos.length] = 'Ice Slurry';

  if (editableListing.quality)
    additionalInfos[additionalInfos.length] = editableListing.quality;

  const defaultImageUri =
    (isCustomType
      ? categoryData?.defaultPhoto
      : listingFormData?.defaultPhoto) || '';
  const customImages = [
    ...(editableListing?.images || []),
    ...(editableListing.existingImages || []),
  ].map((image) => ({
    uri: typeof image.image === 'string' ? image.image : undefined,
    data: typeof image.image === 'string' ? undefined : image.image,
    tags: editableListing?.isAquafuture ? [{ label: 'Aquafuture' }] : [],
  }));

  const measurementUnit = formatMeasurementUnit(
    isCustomType
      ? categoryData?.measurementUnit
      : listingFormData?.measurementUnit
  );

  return {
    carousel: {
      items:
        customImages.length > 0
          ? customImages
          : [
              {
                uri: defaultImageUri,
                tags: editableListing?.isAquafuture
                  ? [{ label: 'Aquafuture' }]
                  : [],
              },
            ],
    },
    sales: {
      sales: toPrice(soldWeight * (editableListing?.pricePerKilo || 0)),
      soldWeight: soldWeight.toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      unit: measurementUnit,
    },
    productDetails: {
      title:
        (isCustomType
          ? editableListing?.customTypeData?.name
          : listingFormData?.type.name) || '',
      tags: additionalInfos
        .map((info) => ({
          label: info,
          type: 'blue',
        }))
        .concat(
          specifications.map((specification) => ({
            label: specification,
            type: 'plain',
          }))
        ),
      size: sizeToString(
        listingFormData?.metric.name || '',
        editableListing?.sizeFrom || '',
        editableListing?.sizeTo || ''
      ),
      location: `${companyAddress?.suburb || ''}, ${
        companyAddress?.state || ''
      }, ${companyAddress?.countryCode}, ${companyAddress?.postcode}`,
      vendor: {
        uri: sellerImage,
        name: editableListing.company,
        rating: '0.0',
      },
      avgBoxSize: (0).toFixed(2),
      description: editableListing?.description,
    },
    orderDetails: {
      price: toPrice(editableListing?.pricePerKilo || 0, false),
      minOrder: editableListing?.minOrder?.toFixed(2) || '',
      remaining: totalWeight.toFixed(2),
      unit: measurementUnit,
      validUntil: editableListing.ends
        ? moment(editableListing?.ends).toNow(true)
        : undefined,
      catchDate: editableListing?.catchDate
        ? moment(editableListing?.catchDate).toDate()
        : undefined,
      catchRecurrence: editableListing?.catchRecurrence || undefined,
      templateDeliveryDate: editableListing?.templateDeliveryDate || null,
    },
    boxDetails: {
      boxes: editableListing?.boxes || [],
      unit: measurementUnit,
    },
  };
};
