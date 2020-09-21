import React from 'react';

// import { useTheme } from 'utils/Theme';
import Checkbox from 'components/base/Checkbox';
import {
  MarketSectorHotel,
  MarketSectorProcessor,
  MarketSectorRestaurantBar,
  MarketSectorRetailer,
  MarketSectorWetShop,
  MarketSectorWholesaler,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import pathOr from 'ramda/es/pathOr';

import { MarketSectorItemProps } from './MarketSectorItem.props';
import {
  Container,
  CheckBoxContainer,
  TextContainer,
  Content,
} from './MarketSectorItem.style';

const MarketSectorItem = (props: MarketSectorItemProps): JSX.Element => {
  // const theme = useTheme();

  const { variant, selected = false, onPress } = props;

  const variations = {
    Hotel: {
      icon: MarketSectorHotel,
      label: 'Hotel',
    },
    Restaurant: {
      icon: MarketSectorRestaurantBar,
      label: 'Restaurant ~ Bar',
    },
    Wholesaler: {
      icon: MarketSectorWholesaler,
      label: 'Wholesaler',
    },
    Retailer: {
      icon: MarketSectorRetailer,
      label: 'Retailer',
    },
    'Seafood Processor': {
      icon: MarketSectorProcessor,
      label: 'Processor',
    },
    'Wet Shop': {
      icon: MarketSectorWetShop,
      label: 'Wet Shop',
    },
  };

  const { label, icon: Icon } = pathOr(
    {
      icon: MarketSectorWetShop,
      label: 'N/A',
    },
    [variant],
    variations
  );

  return (
    <Container>
      <CheckBoxContainer>
        <Checkbox checked={selected} onClick={() => onPress()} />
      </CheckBoxContainer>
      <Content>
        <Icon />
        <TextContainer>
          <Typography color="shade8">{label}</Typography>
        </TextContainer>
      </Content>
    </Container>
  );
};

export default React.memo(MarketSectorItem);
