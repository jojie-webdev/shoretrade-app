import { EditableListingState } from 'types/store/EditableListingState';
import { CreateListingRequestData } from 'types/store/CreateListingState';

export const editableListingToCreateListing = (
  data: EditableListingState,
  images: { url: string; requirementId: string }[],
): CreateListingRequestData => ({
  employee: data?.employee || '',
  type: data?.type || '',
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
