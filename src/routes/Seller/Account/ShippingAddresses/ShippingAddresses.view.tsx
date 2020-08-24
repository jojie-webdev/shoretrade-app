import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import {
  Wrapper,
  AddressTextContainer,
  InteractionCol,
  SmallAlertContainer,
} from './ShippingAddresses.style';

const AddressText = (
  title: string,
  color: keyof Theme['brand'] | keyof Theme['grey']
) => (
  <AddressTextContainer>
    <Typography variant="overline" color={color} className="label">
      {title}
    </Typography>

    <Typography color="noshade">1 Infinite Loop</Typography>
    <Typography color="noshade">Cupertino, CA, 95014</Typography>
    <Typography color="noshade">USA</Typography>
  </AddressTextContainer>
);

const ShippingAddressesView = (props: ShippingAddressesGeneratedProps) => {
  const { pending } = props;

  const theme = useTheme();
  const history = useHistory();

  if (pending) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <InnerRouteHeader title="Shipping Addresses" />

      <SmallAlertContainer>
        <div className="icon-container">
          <InfoFilled fill={theme.brand.alert} height={16} width={16} />
        </div>
        <Typography color="alert" variant="caption">
          New and updated addresses require approval before they can be used.
          This process should take less than 24 hours.
        </Typography>
      </SmallAlertContainer>

      <Row className="address-row">
        <InteractionCol md={12}>
          <Interactions
            onClick={() => history.push(SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS)}
            leftComponent={AddressText('Default Address', 'shade6')}
            iconAlignment="flex-start"
          />
        </InteractionCol>
        <InteractionCol md={12}>
          <Interactions
            onClick={() => history.push(SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS)}
            leftComponent={AddressText('Approval Pending', 'alert')}
            iconAlignment="flex-start"
          />
        </InteractionCol>
      </Row>

      <Row>
        <Col>
          <Button text="Add a new address" />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ShippingAddressesView;
