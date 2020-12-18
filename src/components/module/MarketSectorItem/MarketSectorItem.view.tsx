import React from 'react';

import Radio from 'components/base/Radio';
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
import pathOr from 'ramda/es/pathOr';
import { useTheme } from 'utils/Theme';

import { MarketSectorItemProps } from './MarketSectorItem.props';
import {
  Container,
  CheckBoxContainer,
  TextContainer,
  Content,
  SectorLabel,
} from './MarketSectorItem.style';

const MarketSectorItem = (props: MarketSectorItemProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { variant, selected = false, onPress } = props;

  const variations = {
    HOTEL: {
      icon: BuyerHotel,
      label: 'Hotel',
    },
    RESTAURANT_BAR: {
      icon: BuyerRestaurantBar,
      label: 'Restaurant ~ Bar',
    },
    WHOLESALER: {
      icon: Wholesaler,
      label: 'Wholesaler',
    },
    RETAILER: {
      icon: Retailer,
      label: 'Retailer',
    },
    PROCESSOR: {
      icon: Processor,
      label: 'Processor',
    },
    WET_SHOP: {
      icon: Wetshop,
      label: 'Wet Shop',
    },
  };

  const sellerVariations = {
    WILD_CATCH_FISHING_COMPANY: {
      icon: WildCatchFishingCompany,
      label: 'Wild Catch Fishing Company',
    },
    AQUACULTURE_PRODUCER: {
      icon: AquacultureProducer,
      label: 'Aquaculture Producer',
    },
    WHOLESALER: {
      icon: Wholesaler,
      label: 'Wholesaler',
    },
    PROCESSOR: {
      icon: Processor,
      label: 'Processor',
    },
    RETAILER: {
      icon: Retailer,
      label: 'Retailer',
    },
  };

  const { label, icon: Icon } = pathOr(
    {
      icon: Wetshop,
      label: 'N/A',
    },
    [variant],
    isSeller ? sellerVariations : variations
  );

  return (
    <Container>
      <CheckBoxContainer>
        <Radio checked={selected} onClick={() => onPress()} />
      </CheckBoxContainer>
      <Content>
        <Icon />
        <TextContainer>
          <SectorLabel variant="label" color={isSeller ? 'noshade' : 'shade9'}>
            {label}
          </SectorLabel>
        </TextContainer>
      </Content>
    </Container>
  );
};

export default React.memo(MarketSectorItem);
