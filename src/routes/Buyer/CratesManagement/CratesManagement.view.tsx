import React from 'react';

import { Sync } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileHeader from 'components/module/MobileHeader/MobileHeader.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/SFMTheme';

import { CratesManagementGeneratedProps } from './CratesManagement.props';
import {
  Container,
  Count,
  ShoretradeLeased,
  SFMLeased,
  CratesContainer,
  CratesLeased,
  Text,
  ToolTip,
  IconContainer,
} from './CratesManagement.style';

const CratesManagementView = (
  props: CratesManagementGeneratedProps
): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const {
    leased,
    smallCrate,
    liddedCrate,
    largeCrate,
    handleCratesLeasedClick,
    isGettingCrates,
  } = props;

  const Cards = (props: { crateType: string }) => {
    let crateValue = '0';

    switch (props.crateType) {
      case 'Small':
        crateValue = smallCrate;
        break;
      case 'Lidded':
        crateValue = liddedCrate;
        break;
      default:
        crateValue = largeCrate;
    }

    return (
      <CratesContainer width={isMobile ? '100%' : ''}>
        <Text>SFM {props.crateType} Crate</Text>
        <Typography
          variant="copy"
          color="secondary"
          weight="700"
          style={{ marginRight: 10 }}
        >
          {crateValue}
        </Typography>
      </CratesContainer>
    );
  };

  const SFM = () => (
    <SFMLeased>
      <CratesLeased onClick={handleCratesLeasedClick}>
        <Text>Crates Leased</Text>
        <div style={{ marginRight: 5 }} />
        <IconContainer
          isRefreshing={isGettingCrates || false}
          data-tip
          data-for="update-crate-balance"
          onClick={(e) => {
            handleCratesLeasedClick();
            e.stopPropagation();
          }}
        >
          <Sync width={13} height={13} fill={theme.brand.primary} />
        </IconContainer>
        <ToolTip
          id="update-crate-balance"
          effect="solid"
          backgroundColor={theme.grey.noshade}
          place="top"
          offset={{ right: 70 }}
        >
          <Typography color="shade9" variant="caption">
            {'Update your crate balance'.split(' ').join('\xa0')}
          </Typography>
        </ToolTip>
      </CratesLeased>
      <div style={{ marginBottom: 15 }} />
      <Cards crateType="Small" />
      <div style={{ marginBottom: 15 }} />
      <Cards crateType="Lidded" />
      <div style={{ marginBottom: 15 }} />
      <Cards crateType="Large" />
    </SFMLeased>
  );

  const ShoreTrade = () => (
    <ShoretradeLeased>
      <Typography
        variant={isMobile ? 'overlineSmall' : 'overline'}
        color={theme.isSFM ? 'secondary' : 'shade6'}
        weight="700"
      >
        Crates leased
      </Typography>
      <Count variant={isMobile ? 'title4' : 'title2'} color="shade6">
        {leased}
      </Count>
    </ShoretradeLeased>
  );

  return (
    <Container>
      {isMobile && <MobileHeader>Crates Management</MobileHeader>}
      {theme.isSFM ? <SFM /> : <ShoreTrade />}
      {/* <ButtonContainer>
        <Button text="Return" variant="outline" />
        <Button text="Add More" style={{ marginLeft: 16 }} />
      </ButtonContainer> */}
    </Container>
  );
};

export default CratesManagementView;
