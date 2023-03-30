import moment from 'moment';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export const transformGetListingBoxes = (listingBoxes: {
  token: string;
  boxes: {
    count: number | null;
    id: string;
    quantity: number | null;
    weight: number;
  }[][];
  shipping: [];
}) => {
  const modifiedBoxes = listingBoxes.boxes.map((groupedBoxes) =>
    groupedBoxes.map((box) => {
      return {
        id: box.id,
        count: box.count || 0,
        weight: box.weight,
        quantity: box.quantity || 0,
      };
    })
  );

  const modifiedListingBoxes = { ...listingBoxes, boxes: modifiedBoxes };
  return modifiedListingBoxes;
};

export const getNegotiationTimeframe = (
  negotiation: GetNegotiationByIdRequestResponseItem | undefined
) => {
  if (!negotiation) return '';

  const freshNegotiation = negotiation.specifications.some(
    (specification) => specification.name.toLowerCase() === 'fresh'
  );
  const preauctionNegotiation = negotiation.is_pre_auction;
  const specialNegotiation = freshNegotiation || preauctionNegotiation;

  const remainingTime = moment.duration({
    hours: specialNegotiation ? 3 : 24,
  });

  const now = moment();
  const endTime = negotiation.negotiation_offer
    ? moment(negotiation.negotiation_offer.updated_at)
    : moment(negotiation.updated_at).add(remainingTime);

  const hoursRemaining = endTime.diff(now, 'hours');

  if (hoursRemaining <= 0) {
    return 'expired';
  } else {
    return `${hoursRemaining} hours`;
  }
};
