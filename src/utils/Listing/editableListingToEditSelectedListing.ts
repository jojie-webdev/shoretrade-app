import moment from 'moment';
import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';
import { GetListingsBySalesChannelResponseItem } from 'types/store/GetListingsBySalesChannelState';

export const editableListingToEditSelectedListing = (
  data: GetListingsBySalesChannelResponseItem | null,
  formData: GetListingFormDataResponse
): EditableListingState => {
  return {
    company: data?.coop_name,
    employee: data?.seller_id || '',
    states: data?.state_ids || [],
    isUngraded: data?.size_from === null,
    sizeFrom: data?.size_from,
    sizeTo: data?.size_to,
    existingImages: data?.images
      ? data.images
          .map((image, index) => ({
            image: image.url,
            requirementId: image.requirement_id,
          }))
          .filter(
            // removes images that came from default gallery
            (image) =>
              // for common types
              !image.image.includes('type-default') &&
              // for custom types
              !image.image.includes('No-Image-Placeholder')
          )
      : [],
    pricePerKilo: Number(data?.price_per_kilo || 0),
    boxes: data?.boxes,
    minOrder: Number(data?.minimum_order || 0),
    sellInMultiplesOfMinOrder: data?.sell_in_multiples_of,
    catchDate: data?.catch_date
      ? moment(data?.catch_date, 'YYYY-MM-DD').toDate()
      : undefined,
    catchRecurrence: data?.catch_recurrence || undefined,
    description: data?.description || '',
    origin: data?.origin || {
      countryCode: '',
      state: '',
      suburb: '',
    },
    ends: data?.end_date ? moment(data?.end_date).toDate() : undefined,
    isAquafuture: data?.is_aquafuture || false,
    isAuctionSale: data?.is_auction_sale || false,
    isPreAuctionSale: data?.is_pre_auction_sale || false,
    auctionDate: data?.auction_date ? new Date(data?.auction_date) : null,
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
    currentStep: 9,
    isAlreadyCreated: true,
    quality: data?.quality || null,
    isIkeJime: data?.is_ike_jime || false,
    isIceSlurry: data?.is_ice_slurry || false,
    templateDeliveryDate: data?.template_delivery_date || null,
    isForSaleRepPhoto: data?.is_for_sale_rep_photo || false,
    isActualPhoto: data?.is_actual_photo || false,
    restrictToState: data?.restrict_to_state || false,
  };
};
