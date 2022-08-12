import React from 'react';

import Typography from 'components/base/Typography';
import MobileHeader from 'components/module/MobileHeader/MobileHeader.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/SFMTheme';

import { CratesManagementGeneratedProps } from './CratesManagement.props';
import { Container, Count, Leased } from './CratesManagement.style';

const CratesManagementView = (
  props: CratesManagementGeneratedProps
): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      {isMobile && <MobileHeader>Crates Management</MobileHeader>}

      <Leased>
        <Typography
          variant={isMobile ? 'overlineSmall' : 'overline'}
          color={theme.isSFM ? 'secondary' : 'shade6'}
          weight="700"
        >
          Crates leased
        </Typography>
        <Count variant={isMobile ? 'title4' : 'title2'} color="shade6">
          {props.leased}
        </Count>
      </Leased>
      {/* <ButtonContainer>
        <Button text="Return" variant="outline" />
        <Button text="Add More" style={{ marginLeft: 16 }} />
      </ButtonContainer> */}
    </Container>
  );
};

export default CratesManagementView;
