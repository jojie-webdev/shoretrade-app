import moment from 'moment';
import { CreateListingRequestData } from 'types/store/CreateListingState';
import { EditableListingState } from 'types/store/EditableListingState';

export const editableListingToCreateListing = (
  data: EditableListingState,
  images: { url: string; requirementId: string }[]
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
  catchDate: data?.catchDate ? moment(data.catchDate).toISOString() : null,
  catchRecurrence: data?.catchRecurrence || null,
  description: data?.description || '',
  origin: data?.origin || {
    suburb: '',
    state: '',
    countryCode: '',
  },
  ends: data?.ends ? moment(data.ends).toISOString() : null,
  auctionDate: data?.auctionDate
    ? moment(data.auctionDate).toISOString()
    : null,
  isAquafuture: data?.isAquafuture || false,
  isPreAuctionSale: data?.isPreAuctionSale || false,
  isAuctionSale: data?.isAuctionSale || false,
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
  quality: data?.quality || null,
  isIkeJime: data?.isIkeJime || false,
  isIceSlurry: data?.isIceSlurry || false,
  templateDeliveryDate: data?.templateDeliveryDate || null,
});
