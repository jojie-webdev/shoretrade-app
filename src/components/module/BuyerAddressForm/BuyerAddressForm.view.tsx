import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import DropdownLocation from 'components/module/DropdownLocation';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import { BuyerAddressFormProps } from './BuyerAddressForm.props';
import { Container, StyledAlert } from './BuyerAddressForm.style';

const BuyerAddressForm = (props: BuyerAddressFormProps): JSX.Element => {
  const {
    address,
    isDefault,
    pending,
    onClickSave,
    toggleIsDefault,
    setAddress,
    unitNumber,
    setUnitNumber,
    isSuccess,
    type,
  } = props;

  let successContent = '';
  let routeHeader = '';

  if (type === 'CREATE') {
    routeHeader = 'Add Address';
    successContent = 'Address has successfully been created!';
  } else if (type === 'EDIT') {
    routeHeader = 'Edit Address';
    successContent = 'Your account details have successfully been updated!';
  }

  return (
    <Container>
      {isSuccess && (
        <StyledAlert
          content={successContent}
          variant="success"
          alignText="center"
          fullWidth
        />
      )}

      <InnerRouteHeader title={routeHeader} />

      <Row nogutter className="textfield-row">
        <Col md={12}>
          <DropdownLocation
            value={address?.address || ''}
            label="Address"
            onSelect={setAddress}
          />
        </Col>
        <Col md={12} style={{ marginTop: 24 }}>
          <TextField
            className="address"
            label="Unit number (optional)"
            name="unitNumber"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
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

      <Row nogutter>
        <Button text="Submit" onClick={onClickSave} loading={pending} />
      </Row>
    </Container>
  );
};

export default BuyerAddressForm;
