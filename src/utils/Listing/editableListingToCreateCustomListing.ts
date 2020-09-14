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
  catchDate: data?.catchDate ? data.catchDate.toISOString() : null,
  description: data?.description || '',
  origin: data?.origin || {
    suburb: '',
    state: '',
    countryCode: '',
  },
  ends: data?.ends ? data.ends.toISOString() : null,
  isAquafuture: data?.isAquafuture || false,
  addressId: data?.addressId || '',
});
