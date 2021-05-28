import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isIOS } from 'react-device-detect';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import {
  Container,
  AddressBadge,
  InteractionCol,
} from './ShippingAddresses.style';

const AddressText = (
  title: string,
  color: string,
  streetNumber: string,
  street: string,
  countryCode: string
) => (
  <div>
    {title && (
      <AddressBadge color={color}>
        <Typography variant="overlineSmall" color="shade9" className="label">
          {title}
        </Typography>
      </AddressBadge>
    )}

    <Typography color="noshade">{streetNumber}</Typography>
    <Typography color="noshade">{street}</Typography>
    <Typography color="noshade">{countryCode}</Typography>
  </div>
);

const ShippingAddressesView = (props: ShippingAddressesGeneratedProps) => {
  const {
    pending,
    addresses,
    onClickAddress,
    onClickAddAddress,
    notificationMessage,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (pending) {
    return <Loading />;
  }

  return (
    <Container isIOS={isIOS}>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Shipping Addresses' },
          ]}
        />
      </div>

      {notificationMessage ? (
        <Alert
          content={notificationMessage}
          variant="success"
          alignText="center"
          fullWidth
          style={{ marginBottom: 16 }}
        />
      ) : null}

      <Alert
        variant="infoAlert"
        fullWidth
        content="New and updated addresses require approval before they can be used.
          This process should take less than 24 hours."
        style={{
          marginBottom: 16,
        }}
      />

      <Row>
        {addresses.map((address) => {
          let title = '';
          let color = theme.grey.shade3;

          if (address.default) {
            title = 'Default Address';
            color = theme.grey.shade3;
          }

          if (address.approved !== 'APPROVED') {
            title = 'Approval Pending';
            color = theme.brand.alert;
          }

          const streetNumber = address.unitNumber
            ? `${address.unitNumber}/${address.streetNumber}`
            : address.streetNumber;

          const street = streetNumber
            ? `${streetNumber} ${address.streetName}\n`
            : address.streetName;

          const addressString = `${address.suburb}, ${address.state}, ${address.postcode}`;

          return (
            <InteractionCol md={12} key={address.id}>
              <Interactions
                onClick={() => onClickAddress(address.id)}
                leftComponent={AddressText(
                  title,
                  color,
                  street,
                  addressString,
                  address.countryCode
                )}
                iconAlignment="flex-start"
                padding="16px 24px"
              />
            </InteractionCol>
          );
        })}
      </Row>

      {!isMobile && (
        <Row className="btn-add-address">
          <Col>
            <Button text="Add a new address" onClick={onClickAddAddress} />
          </Col>
        </Row>
      )}

      <MobileFooter>
        <Button
          text="Add a new address"
          takeFullWidth
          onClick={onClickAddAddress}
        />
      </MobileFooter>
    </Container>
  );
};

export default ShippingAddressesView;
