import moment from 'moment';
import { isEmpty, prop, sortBy } from 'ramda';
import { Offer } from 'types/store/GetActiveOffersState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { formatRunningDateDifference } from 'utils/MarketRequest';

import { Result } from './Landing.props';

export const getMarketRequestLandingData = (data: any): Result[] => {
  if (!data) return [];

  const buildExpiryData = (item: GetMarketRequestResponseItem) => {
    const createdAtPlusDays = moment(item.createdAt).add(7, 'd').format();

    const hoursLeft = moment
      .duration(moment(createdAtPlusDays).diff(moment()))
      .asHours();

    if (hoursLeft <= 24 && hoursLeft > 0) {
      return hoursLeft.toFixed() + ' Hours';
    }

    if (hoursLeft <= 0) {
      return 'Expired';
    }

    const expiry = moment(item.createdAt).add(7, 'd').isBefore()
      ? 'Expired'
      : formatRunningDateDifference(
          moment(item.createdAt).add(7, 'd').format(),
          'day'
        );

    return expiry;
  };

  const marketRequest = data.map((item: GetMarketRequestResponseItem) => ({
    ...item,
    expiry: buildExpiryData(item),
    offers: item?.offers,
  }));

  return marketRequest;
};

export const getNegoRequestLandingData = (
  data: GetAllNegoRequestResponseItem[] | undefined
) => {
  // if (!data) return [];

  const buildExpiryData = (item: GetAllNegoRequestResponseItem) => {
    const createdAtPlusDays = moment(item.created_at).add(7, 'd').format();

    const hoursLeft = moment
      .duration(moment(createdAtPlusDays).diff(moment()))
      .asHours();

    if (hoursLeft <= 24 && hoursLeft > 0) {
      return hoursLeft.toFixed() + ' Hours';
    }

    if (hoursLeft <= 0) {
      return 'Expired';
    }

    const isFresh = !isEmpty(
      item.specifications.find((spec) => spec.name.toLowerCase() === 'fresh')
    );

    const isPreauction = item.is_pre_auction || item.auction_date;

    const expiry = moment(item.created_at).add(2, 'd').isBefore()
      ? 'Expired'
      : formatRunningDateDifference(
          moment(item.created_at).add(2, 'd').format(),
          'day'
        );

    return expiry;
  };

  const negoRequest = data?.map((item: GetAllNegoRequestResponseItem) => ({
    ...item,
    expiry: buildExpiryData(item),
  }));

  return negoRequest as
    | (GetAllNegoRequestResponseItem & { expiry: any })[]
    | undefined;
};

export const hasNewOffer = (offers: Offer[]) => {
  if (!offers) {
    return false;
  }

  const areAllOffersAccepted = () => {
    if (!offers) {
      return false;
    }

    const oneOfOfferNotAccepted = offers.find(
      (offer) => offer.status !== 'ACCEPTED'
    );

    return !oneOfOfferNotAccepted;
  };

  const checkHasLastestOfferWithoutNego = () => {
    const offerSorter = sortBy(prop('created_at'));
    const sortedOffers = offerSorter(offers).reverse();
    const newestOffer = sortedOffers[0];

    if (sortedOffers.length > 0) {
      if (
        !newestOffer?.negotiations ||
        newestOffer?.negotiations?.length === 0
      ) {
        return true;
      }

      return false;
    }

    return false;
  };

  const checkLastestNego = () => {
    const offer = offers.find((offer) => {
      if (offer?.negotiations) {
        const negoSorter = sortBy(prop('created_at'));
        const sortedNegos = negoSorter(offer?.negotiations).reverse();

        return sortedNegos[0]?.type === 'NEW_OFFER';
      }
      return false;
    });
    const hasOffer = offer?.id;

    return hasOffer;
  };

  if (areAllOffersAccepted()) {
    return false;
  }

  if (checkHasLastestOfferWithoutNego()) {
    return true;
  } else {
    return checkLastestNego();
  }
};

export const excludeLostNegotiation = (nego: GetAllNegoRequestResponseItem) => {
  if (
    nego.display_status === 'Declined' ||
    nego.display_status === 'Payment Missed' ||
    nego.display_status === 'Lost'
  ) {
    if (nego.negotiation_offer) {
      return !moment(nego.negotiation_offer.updated_at).add(3, 'h').isBefore();
    }
    return !moment(nego.updated_at).add(3, 'h').isBefore();
  }
  return nego.display_status !== 'Finalised';
};
