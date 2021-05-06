import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import unnest from 'ramda/es/unnest';
import { EditableListingState } from 'types/store/EditableListingState';
import { CategoryData } from 'types/store/GetCustomFormDataState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';
import { UserCompany } from 'types/store/GetUserState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ListingProps } from '../../Selling/ListingDetails/ListingDetails.props';

export const editableListingToListingProps = (
  editableListing: Partial<EditableListingState>,
  listingFormData: GetListingFormDataResponse | null,
  categoryData?: CategoryData,
  sellerImage?: string
): ListingProps => {
  const isCustomType = editableListing?.isCustomType || false;
  const totalWeight = (editableListing?.boxes || []).reduce(
    (accumulator, current) => {
      const subTotalWeight = current.weight * current.quantity;
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
      sales: toPrice(0),
      soldWeight: (0).toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      unit: measurementUnit,
    },
    productDetails: {
      title:
        (isCustomType
          ? editableListing?.customTypeData?.name
          : listingFormData?.type.name) || '',
      tags: specifications.map((specification) => ({
        label: specification,
      })),
      size: sizeToString(
        listingFormData?.metric.name || '',
        editableListing?.sizeFrom || '',
        editableListing?.sizeTo || ''
      ),
      location: `${editableListing?.origin?.suburb || ''}, ${
        editableListing?.origin?.state || ''
      }, ${editableListing?.origin?.countryCode}`,
      vendor: {
        uri: sellerImage,
        name: editableListing.company,
        rating: '0.0',
      },
      avgBoxSize: (0).toFixed(2),
    },
    orderDetails: {
      price: toPrice(editableListing?.pricePerKilo || 0, false),
      minOrder: editableListing?.minOrder?.toFixed(2) || '',
      remaining: totalWeight.toFixed(2),
      unit: measurementUnit,
      validUntil: moment(editableListing?.ends).toDate(),
      catchDate: moment(editableListing?.catchDate).toDate(),
    },
    boxDetails: {
      boxes: editableListing?.boxes || [],
      unit: measurementUnit,
    },
  };
};
