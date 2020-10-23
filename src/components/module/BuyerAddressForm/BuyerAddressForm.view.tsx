import React, { useReducer } from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LocationSearch from 'components/module/LocationSearch';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { createUpdateReducer } from 'utils/Hooks';

import { BuyerAddressFormProps } from './BuyerAddressForm.props';
import { Container, StyledAlert } from './BuyerAddressForm.style';
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
    isSuccess,
    type,
    isDelete,
    toggleisDelete,
  } = props;

  let successContent = '';
  let routeHeader = '';

  if (type === 'CREATE') {
    routeHeader = 'Add Address';
    successContent = 'Address has successfully been created!';
  } else if (type === 'EDIT' && !isDelete) {
    routeHeader = 'Edit Address';
    successContent = 'Your account details have successfully been updated!';
  } else if (type === 'EDIT' && isDelete) {
    routeHeader = 'Edit Address';
    successContent = 'Your address has been deleted!';
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
      <InnerRouteHeader title={routeHeader} />

      <FixedWidthContainer>
        <Row nogutter className="textfield-row">
          <Col md={12}>
            <LocationSearch
              onSelect={(location) => {
                if (location) {
                  setAddress(location);
                }
              }}
              textFieldProps={{
                value: address?.address || '',
                label: 'Address',
                error: pathOr('', ['address', '0'], errors),
                disabled: type === 'EDIT' ? true : false,
              }}
            />
          </Col>
          <Col md={12} style={{ marginTop: 24 }}>
            <TextField
              className="address"
              label="Unit number (optional)"
              name="unitNumber"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              error={pathOr('', ['unitNumber', '0'], errors)}
              disabled={type === 'EDIT' ? true : false}
            />
          </Col>
        </Row>
      </FixedWidthContainer>

      <Row nogutter className="checkbox-row">
        <Col className="checkbox-col">
          <div className="checkbox-container">
            <Checkbox checked={isDefault || false} onClick={toggleIsDefault} />
          </div>
          <Typography variant="label">Set as default address</Typography>
        </Col>
      </Row>

      <Row nogutter>
        <Button text="Submit" onClick={validate} loading={pending} />
        {type === 'EDIT' ? (
          <Button
            className="delete-btn"
            text="Delete"
            onClick={() => {
              if (toggleisDelete) {
                toggleisDelete();
              }
              if (onDeleteAddress) {
                onDeleteAddress();
              }
            }}
            loading={pending}
          />
        ) : null}
      </Row>
    </Container>
  );
};

export default BuyerAddressForm;
