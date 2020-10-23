import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import { AccountDeliveryGeneratedProps } from './Address.props';
import {
  Container,
  AddressTextContainer,
  InteractionCol,
  Notification,
} from './Address.style';

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

    <Typography>{streetNumber}</Typography>
    <Typography>{street}</Typography>
    <Typography>{countryCode}</Typography>
  </AddressTextContainer>
);
const AccountDeliveryView = (props: AccountDeliveryGeneratedProps) => {
  const {
    pending,
    addresses,
    goToEditAddress,
    goToAddAddress,
    notificationMessage,
  } = props;
  const theme = useTheme();
  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Delivery Addresses" />

      {notificationMessage ? (
        <Notification
          content={notificationMessage}
          variant="success"
          alignText="center"
          fullWidth
        />
      ) : null}
      <Row className="btn-add-address">
        <Col>
          <Button text="Add a new address" onClick={goToAddAddress} />
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
                onClick={() => goToEditAddress(address.id)}
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
    </Container>
  );
};

export default AccountDeliveryView;
