import { CardProps } from 'components/module/CategoryCards/Landing/Card.props';
import { PreviewProps } from 'components/module/CategoryCards/Preview/Preview.props';
import { SellerCardProps } from 'components/module/SellerCard/SellerCard.props';
import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { UpdateAddressMeta } from 'types/store/UpdateAddressState';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { placeDataToAddAddressMeta } from '../Account/AddAddress/AddAddress.transform';
import { CategoryResults, SellerResults } from './Home.props';

export function addressToPlaceData(data: GetAddressesResponseItem): PlaceData {
  const street = data.streetNumber
    ? `${data.streetNumber} ${data.streetName}`
    : data.streetName;
  return {
    address: `${street}, ${data.suburb}, ${data.state}, ${data.countryCode}`,
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: '',
    level: data.level,
    streetNumber: data.streetNumber,
    route: data.streetName,
    locality: data.suburb,
    administrativeAreaLevel1: data.state,
    postcode: data.postcode,
    countryCode: data.countryCode,
  };
}

export function placeDataToUpdateAddressMeta(
  data: PlaceData,
  unitNumber: string,
  companyId: string,
  isDefault: boolean,
  addressId: string
): UpdateAddressMeta {
  return {
    ...placeDataToAddAddressMeta(data, unitNumber, companyId, isDefault),
    addressId,
  };
}

export function recentlyAddedToPreviewProps(
  data: GetBuyerHomepageResponseListingItem,
  isPendingAccount: boolean,
  canNegotiate?: boolean
): PreviewProps {
  return {
    id: data.id,
    images: data.images,
    type: data.type,
    price: toPrice(data.price),
    remaining: data.remaining.toFixed(2),
    coop: data.coop,
    minimumOrder: data.minimumOrder,
    origin: data.origin,
    shippingFrom: data.shippingFrom,
    weight: sizeToString(data.size.unit, data.size.from, data.size.to),
    isAquafuture: data.isAquafuture,
    unit: data.measurementUnit,
    state: data.state,
    hiddenPrice: isPendingAccount,
    hiddenVendor: isPendingAccount,
    catchRecurrence: data.catchRecurrence,
    isIkeJime: data.isIkeJime,
    isIceSlurry: data.isIceSlurry,
    quality: data.quality,
    templateDeliveryDate: data.templateDeliveryDate,
    isForSaleRepPhoto: data.isForSaleRepPhoto,
    isSFMCrate: data.packaging?.type === 'SFM',
    canNegotiate,
  };
}

export function categoriesToCardProps(data: CategoryResults): CardProps {
  return {
    sortIndex: data.sortIndex,
    id: data.id,
    image: data.thumbnail,
    label: data.name,
  };
}

export function favouritesToPreviewProps(
  data: GetBuyerHomepageResponseListingItem
): PreviewProps {
  return {
    id: data.id,
    images: data.images,
    type: data.type,
    price: toPrice(data.price),
    remaining: data.remaining.toFixed(2),
    coop: data.coop,
    minimumOrder: data.minimumOrder,
    origin: data.origin,
    shippingFrom: data.shippingFrom,
    weight: sizeToString(data.size.unit, data.size.from, data.size.to),
    isAquafuture: data.isAquafuture,
    unit: data.measurementUnit,
    state: data.state,
    catchRecurrence: data.catchRecurrence,
    isIkeJime: data.isIkeJime,
    isIceSlurry: data.isIceSlurry,
    quality: data.quality,
    templateDeliveryDate: data.templateDeliveryDate,
    isForSaleRepPhoto: data.isForSaleRepPhoto,
    isSFMCrate: data.packaging?.type === 'SFM',
    allowNegotiations: data.allowNegotiations,
    auctionDate: data.auctionDate,
  };
}

export function favouriteSellersToSellerCardProps(
  data: SellerResults
): SellerCardProps {
  return {
    companyName: data.companyName,
    companyImage: data.companyImage,
  };
}
