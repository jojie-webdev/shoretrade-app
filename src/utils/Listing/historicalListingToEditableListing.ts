import { EditableListingState } from 'types/store/EditableListingState';
import { HistoricalListingItem } from 'types/store/GetHistoricalListingsState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export const historicalListingToEditableListing = (
  data: HistoricalListingItem | null,
  formData: GetListingFormDataResponse
): EditableListingState => {
  return {
    states: data?.states.map((a) => a.id),
    isUngraded: data?.size_from === null || data?.size_from === undefined,
    sizeFrom: data?.size_from,
    sizeTo: data?.size_to,
    existingImages: data?.images
      ? data?.images.map(({ url, requirement_id }) => ({
          image: url,
          requirementId: requirement_id,
        }))
      : undefined,
    pricePerKilo: Number(data?.price_per_unit || 0),
    boxes: data?.boxes.map((a, i) => ({
      id: `new-${(new Date().getTime() + 1).toString()}`,
      ...a,
    })),
    minOrder: Number(data?.minimum_order || 0),
    sellInMultiplesOfMinOrder: data?.sell_in_multiples_of,
    origin: data?.origin || {
      countryCode: '',
      state: '',
      suburb: '',
    },
    isAquafuture: data?.is_aquafuture || false,
    addressId: data?.address_id || '',
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
    quality: data?.quality,
    currentStep: 9,
  };
};
