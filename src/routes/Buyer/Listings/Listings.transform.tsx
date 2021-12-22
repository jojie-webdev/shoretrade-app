import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import { GetAllBuyerListingResponseItem } from 'types/store/GetAllBuyerListingsState';

import { AllListingTableItem } from './Listings.props';

export const listingsToTableListings = (
  data: GetAllBuyerListingResponseItem[]
): AllListingTableItem[] => {
  return data.map((listing) => {
    const additionalInfos = ADDITIONAL_INFOS.map((info) => {
      if (listing[info.snakeKey as keyof GetAllBuyerListingResponseItem]) {
        return info.display;
      } else return '';
    }).filter((info) => info !== '');

    const specifications = additionalInfos
      .map((info) => ({
        value: info,
        type: 'blue',
      }))
      .concat([
        {
          value: listing.quality || '',
          type: 'blue',
        },
      ])
      .concat(
        listing.specifications.split(',').map((spec) => ({
          value: spec,
          type: 'plain',
        }))
      );

    return {
      id: listing.id,
      name: listing.name,
      category: listing.category,
      specifications: specifications.filter((spec) => spec.value !== ''),
      metric: listing.metric,
      sizeFrom: listing.size_from,
      sizeTo: listing.size_to,
      price: listing.price,
      unit: listing.unit,
      origin: listing.origin,
      endDate: listing.end_date,
      catchDate: listing.catch_date,
      createdAt: listing.created_at,
      catchRecurrence: listing.catch_recurrence,
      remainingWeight: listing.remaining_weight,
      totalWeight: listing.total_weight,
      salesChannel: listing.sales_channel,
      isIkeJime: listing.is_ike_jime,
      isIceSlurry: listing.is_ice_slurry,
      clickable: listing.sales_channel !== 'AUCTION',
      auctionDate: listing.auction_date,
      quality: listing.quality,
    };
  });
};
