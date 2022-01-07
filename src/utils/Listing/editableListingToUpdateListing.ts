import moment from 'moment';
import { EditableListingState } from 'types/store/EditableListingState';
import { UpdateListingRequestData } from 'types/store/UpdateListingState';

export const editableListingToUpdateListing = (
  data: EditableListingState,
  images: Record<string, string>,
  companyId: string
): UpdateListingRequestData => ({
  companyId,
  listingId: data.currentListingId || '',
  images: Object.keys(images).map((id) => ({
    requirementId: id,
    url: images[id],
  })),
  price: data?.pricePerKilo || 0,
  catchDate: data?.catchDate ? moment(data.catchDate).toISOString() : null,
  catchRecurrence: data?.catchRecurrence || null,
  description: data?.description || '',
  origin: data?.origin || {
    suburb: '',
    state: '',
    countryCode: '',
  },
  boxes: (data?.boxes || []).map((b) => ({
    ...b,
    id: b.fixed ? b.id : `new-${b.id}`,
  })),
  minOrder: data.minOrder || 0,
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
