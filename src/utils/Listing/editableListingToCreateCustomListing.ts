import moment from 'moment';
import { CreateCustomListingRequestData } from 'types/store/CreateCustomListingState';
import { EditableListingState } from 'types/store/EditableListingState';

export const editableListingToCreateCustomListing = (
  data: EditableListingState,
  images: { url: string; requirementId: string }[]
): CreateCustomListingRequestData => ({
  employee: data?.employee || '',
  type: data?.customTypeData?.name || '',
  category: data?.customTypeData?.categoryId || '',
  metric: data?.customTypeData?.metric.id || '',
  states: data?.states || [],
  isUngraded: data?.isUngraded || false,
  sizeFrom: data?.sizeFrom || null,
  sizeTo: data?.sizeTo || null,
  images,
  pricePerKilo: data?.pricePerKilo || 0,
  boxes: (data?.boxes || []).map((b) => ({ ...b, id: `new-${b.id}` })),
  minOrder: data?.minOrder || 0,
  sellInMultiplesOfMinOrder: data?.sellInMultiplesOfMinOrder || false,
  catchDate: data?.catchDate ? moment(data.catchDate).toISOString() : null,
  description: data?.description || '',
  origin: data?.origin || {
    suburb: '',
    state: '',
    countryCode: '',
  },
  ends: data?.ends ? moment(data.ends).toISOString() : null,
  isAquafuture: data?.isAquafuture || false,
  addressId: data?.addressId || '',
  packaging: {
    ...(data?.packaging?.id
      ? {
          id: data.packaging.id,
        }
      : {}),
    ...(data?.packaging?.custom
      ? {
          custom: {
            width: data.packaging.custom.width,
            height: data.packaging.custom.height,
            length: data.packaging.custom.length,
            airlineApproved: data.packaging.custom.airlineApproved || false,
          },
        }
      : {}),
  },
});
