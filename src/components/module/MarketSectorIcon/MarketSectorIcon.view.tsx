import React from 'react';

import {
  AquacultureProducer,
  BuyerHotel,
  BuyerRestaurantBar,
  Processor,
  Retailer,
  Wetshop,
  Wholesaler,
  WildCatchFishingCompany,
} from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { MarketSectorIconProps } from './MarketSectorIcon.props';
import { Container } from './MarketSectorIcon.style';

const MarketSectorIcon = (props: MarketSectorIconProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { variant } = props;

  const variations: Record<string, JSX.Element> = {
    HOTEL: <BuyerHotel {...props} />,
    RESTAURANT_BAR: <BuyerRestaurantBar />,
    WHOLESALER: <Wholesaler {...props} />,
    PROCESSOR: <Processor {...props} />,
    RETAILER: <Retailer {...props} />,
    WET_SHOP: <Wetshop {...props} />,
  };

  const sellerVariations: Record<string, JSX.Element> = {
    WILD_CATCH_FISHING_COMPANY: <WildCatchFishingCompany {...props} />,
    AQUACULTURE_PRODUCER: <AquacultureProducer {...props} />,
    WHOLESALER: <Wholesaler {...props} />,
    PROCESSOR: <Processor {...props} />,
    RETAILER: <Retailer {...props} />,
  };

  return isSeller ? sellerVariations[variant] : variations[variant];
};

export default React.memo(MarketSectorIcon);
