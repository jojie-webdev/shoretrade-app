import moment from 'moment';
import { CreateBulkListingRequestData } from 'types/store/CreateBulkListingState';
import { UploadBulkState } from 'types/store/UploadBulkState';

export const bulkListingToCreateListing = (
  data: UploadBulkState,
  shippingAddress: string
): CreateBulkListingRequestData => ({
  employee: data?.employeeId || '',
  type: data?.type || '',
  states: data?.specifications || [],
  isUngraded: data?.isUngraded || false,
  sizeFrom: data?.sizeFrom || null,
  sizeTo: data?.sizeTo || null,
  images: [],
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
  addressId: shippingAddress,
  isPreAuctionSale: data?.isPreAuctionSale || false,
  isAuctionSale: data?.isAuctionSale || false,
  auctionDate: data?.auctionDate
    ? moment(data.auctionDate).toISOString()
    : null,
  quality: data?.quality || null,
  isIkeJime: data?.isIkeJime || false,
  isIceSlurry: data?.isIceSlurry || false,
  packaging: data?.packaging || null,
  catchRecurrence: data?.catchRecurrence || null,
});
