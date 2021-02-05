import React from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import {
  Wrapper,
  AddressTextContainer,
  InteractionCol,
  Notification,
} from './ShippingAddresses.style';

const AddressText = (
  title: string,
  color: keyof Theme['brand'] | keyof Theme['grey'],
  streetNumber: string,
  street: string,
  countryCode: string
) => (
  <AddressTextContainer>
    <Typography variant="overline" color={color} className="label">
      {title}
    </Typography>

    <Typography color="noshade">{streetNumber}</Typography>
    <Typography color="noshade">{street}</Typography>
    <Typography color="noshade">{countryCode}</Typography>
  </AddressTextContainer>
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

  if (pending) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <InnerRouteHeader title="Shipping Addresses" />
      {notificationMessage ? (
        <Notification
          content={notificationMessage}
          variant="success"
          alignText="center"
          fullWidth
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
        <Col>
          <Button text="Add a new address" onClick={onClickAddAddress} />
        </Col>
      </Row>

      <Row className="address-row">
        {addresses.map((address) => {
          let title = '';
          let color: keyof Theme['brand'] | keyof Theme['grey'] = 'shade6';

          if (address.default) {
            title = 'Default Address';
            color = 'shade6';
          }

          if (address.approved !== 'APPROVED') {
            title = 'Approval Pending';
            color = 'alert';
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
              />
            </InteractionCol>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export default ShippingAddressesView;
