import moment from 'moment';
import { EditableListingState } from 'types/store/EditableListingState';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export const editableListingToEditSelectedListing = (
  data: GetAllListingsResponseItem | null,
  formData: GetListingFormDataResponse
): EditableListingState => {
  return {
    company: data?.coopName,
    employee: data?.sellerId || '',
    states: data?.stateIds || [],
    isUngraded: data?.sizeFrom === null,
    sizeFrom: data?.sizeFrom,
    sizeTo: data?.sizeTo,
    existingImages: data?.images
      .map((image, index) => ({
        image,
        requirementId: formData.photoRequirements[index].id,
      }))
      // removes images that came from default gallery
      .filter(
        (image) =>
          // for common types
          !image.image.includes('type-default') &&
          // for custom types
          !image.image.includes('No-Image-Placeholder')
      ),
    pricePerKilo: Number(data?.pricePerKilo || 0),
    boxes: data?.boxes,
    minOrder: Number(data?.minimumOrder || 0),
    sellInMultiplesOfMinOrder: data?.sellInMultiplesOf,
    catchDate: data?.catchDate
      ? moment(data?.catchDate, 'YYYY-MM-DD').toDate()
      : undefined,
    catchRecurrence: data?.catchRecurrence || undefined,
    description: data?.description || '',
    origin: data?.origin || {
      countryCode: '',
      state: '',
      suburb: '',
    },
    ends: data?.ends ? moment(data?.ends).toDate() : undefined,
    isAquafuture: data?.isAquafuture || false,
    addressId: data?.addressId || '',
    ...(data?.packaging
      ? {
          packaging: {
            ...(data.packaging.type !== 'CUSTOM' && data.packaging.id
              ? {
                  id: data.packaging.id,
                }
              : {
                  custom: {
                    width: data.packaging.width || 0,
                    height: data.packaging.height || 0,
                    length: data.packaging.length || 0,
                    airlineApproved: data.packaging.airline_approved || false,
                  },
                }),
          },
        }
      : {}),
    currentStep: 9,
    isAlreadyCreated: true,
    quality: data?.quality || null,
  };
};
