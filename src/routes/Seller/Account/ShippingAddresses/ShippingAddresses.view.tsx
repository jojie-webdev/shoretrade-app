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
import { COMPANY_RELATIONSHIPS } from 'consts/companyRelationships';
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
    errorMessage,
    companyRelationship,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Shipping Addresses' },
          ]}
        />
      </div>

      {(notificationMessage || '').length > 0 ? (
        <Alert
          content={notificationMessage}
          variant="success"
          alignText="center"
          fullWidth
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {(errorMessage || '').length > 0 ? (
        <Alert
          content={errorMessage}
          variant="error"
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
                disabled={
                  companyRelationship === COMPANY_RELATIONSHIPS.FISHERMAN
                }
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

      {companyRelationship === COMPANY_RELATIONSHIPS.FISHERMAN && (
        <Alert
          variant="infoAlert"
          fullWidth
          content="Only the Primary Account Holder can add new addresses."
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
        />
      )}

      {!isMobile && (
        <Row className="btn-add-address">
          <Col>
            <Button
              text="Add a new address"
              onClick={onClickAddAddress}
              disabled={companyRelationship === COMPANY_RELATIONSHIPS.FISHERMAN}
            />
          </Col>
        </Row>
      )}

      <MobileFooter>
        <Button
          disabled={companyRelationship === COMPANY_RELATIONSHIPS.FISHERMAN}
          text="Add a new addresssss"
          takeFullWidth
          onClick={onClickAddAddress}
        />
      </MobileFooter>
    </Container>
  );
};

export default ShippingAddressesView;
