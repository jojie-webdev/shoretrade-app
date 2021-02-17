import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { AccountDeliveryGeneratedProps } from './Address.props';
import { Container, AddressBadge, InteractionCol } from './Address.style';

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

    <Typography>{streetNumber}</Typography>
    <Typography>{street}</Typography>
    <Typography>{countryCode}</Typography>
  </div>
);

const AddressView = (props: AccountDeliveryGeneratedProps) => {
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
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              { label: 'Delivery Addresses' },
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
                  onClick={() => goToEditAddress(address.id)}
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

        <Row className="btn-add-address">
          <Col>
            <Button text="Add a new address" onClick={goToAddAddress} />
          </Col>
        </Row>
      </BoxContainer>
    </Container>
  );
};

export default AddressView;
