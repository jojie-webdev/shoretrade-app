import React, { useReducer, useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Close } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import LocationSearch from 'components/module/LocationSearch';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { identifyIsAUOrNZAddress } from 'utils/Address/identifyIsAUOrNZAddress';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { BuyerAddressFormProps } from './BuyerAddressForm.props';
import { AnchorWrapper, Container } from './BuyerAddressForm.style';
import { isValid } from './BuyerAddressForm.validation';

const BuyerAddressForm = (props: BuyerAddressFormProps): JSX.Element => {
  const {
    address,
    isDefault,
    pending,
    onClickSave,
    onDeleteAddress,
    toggleIsDefault,
    setAddress,
    unitNumber,
    setUnitNumber,
    type,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const [
    toggleSFMAddressRestriction,
    setToggleSFMAddressRestriction,
  ] = useState(false);
  const [
    toggleNonSFMAddressRestriction,
    setToggleNonSFMAddressRestriction,
  ] = useState(false);
  const theme = useTheme();

  let routeHeader = '';

  if (type === 'CREATE') {
    routeHeader = 'Add Address';
  } else if (type === 'EDIT') {
    routeHeader = 'Edit Address';
  }

  const [errors, setErrors] = useReducer(
    createUpdateReducer<Record<string, string[]>>(),
    {}
  );
  const validate = () => {
    const addressError = isValid({
      address: address?.address || '',
      unitNumber,
    });
    const isEmptyError = Object.keys(addressError).every(
      (k) => addressError[k].length === 0
    );
    setErrors(addressError);
    if (isEmptyError) {
      onClickSave();
    }
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Delivery Addresses',
              link: BUYER_ACCOUNT_ROUTES.ADDRESS,
            },
            { label: routeHeader },
          ]}
        />
      </div>

      {!theme.isSFM &&
      toggleSFMAddressRestriction &&
      identifyIsAUOrNZAddress(address?.address || '') ? (
        <Alert
          content={
            <Typography variant="caption">
              Please enter a valid international address. For Australia and New
              Zealand, please register at{' '}
              <span>
                <a
                  href="https://www.sfmblue.com.au"
                  style={{ color: '#09131D', textDecoration: 'underline' }}
                >
                  www.sfmblue.com.au
                </a>
              </span>
            </Typography>
          }
          variant="error"
          alignText="center"
          fullWidth
          iconRight={
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setToggleSFMAddressRestriction(false)}
            >
              <Close />
            </div>
          }
          style={{
            marginTop: 16,
          }}
        />
      ) : null}

      {theme.isSFM &&
      toggleNonSFMAddressRestriction &&
      !identifyIsAUOrNZAddress(address?.address || '') ? (
        <Alert
          content={
            <Typography color="shade9" variant="caption">
              Please enter an Australian or New Zealand address. For
              international addresses, please register at{' '}
              <span>
                <AnchorWrapper href="https://www.shoretrade.com">
                  www.shoretrade.com
                </AnchorWrapper>
              </span>
            </Typography>
          }
          variant="error"
          alignText="center"
          fullWidth
          iconRight={
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setToggleNonSFMAddressRestriction(false)}
            >
              <Close fill={theme.grey.shade9} />
            </div>
          }
          style={{
            marginTop: 16,
          }}
        />
      ) : null}

      <Row className="textfield-row">
        <Col className="textfield-col" md={12} xl={4}>
          <LocationSearch
            onSelect={(location) => {
              if (location) {
                if (theme.isSFM) {
                  setToggleNonSFMAddressRestriction(true);
                } else {
                  setToggleSFMAddressRestriction(true);
                }

                setAddress(location);
              }
            }}
            textFieldProps={{
              value: address?.address || '',
              label: 'Address',
              error: pathOr('', ['address', '0'], errors),
              disabled: type === 'EDIT',
            }}
          />
        </Col>
        <Col className="textfield-col" md={12} xl={4}>
          <TextField
            className="address"
            label="Unit number (optional)"
            name="unitNumber"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            error={pathOr('', ['unitNumber', '0'], errors)}
          />
        </Col>
      </Row>

      <Row nogutter className="checkbox-row">
        <Col className="checkbox-col">
          <div className="checkbox-container">
            <Checkbox checked={isDefault || false} onClick={toggleIsDefault} />
          </div>
          <Typography variant="label">Set as default address</Typography>
        </Col>
      </Row>

      {!isMobile && (
        <Row nogutter>
          <Button
            text="Submit"
            onClick={validate}
            loading={pending}
            disabled={
              theme.isSFM
                ? !identifyIsAUOrNZAddress(address?.address || '')
                : identifyIsAUOrNZAddress(address?.address || '')
            }
          />
          {type === 'EDIT' && (
            <Button
              className="delete-btn"
              text="Delete"
              onClick={onDeleteAddress}
              loading={pending}
            />
          )}
        </Row>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          text="Submit"
          onClick={validate}
          loading={pending}
          disabled={
            theme.isSFM
              ? !identifyIsAUOrNZAddress(address?.address || '')
              : identifyIsAUOrNZAddress(address?.address || '')
          }
        />
        {type === 'EDIT' && (
          <Button
            takeFullWidth
            className="delete-btn"
            text="Delete"
            onClick={onDeleteAddress}
            loading={pending}
          />
        )}
      </MobileFooter>
    </Container>
  );
};

export default BuyerAddressForm;
