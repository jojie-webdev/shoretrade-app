import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import DropdownLocation from 'components/module/DropdownLocation';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import { SellerAddressFormProps } from './SellerAddressForm.props';
import { Container, StyledAlert } from './SellerAddressForm.style';

const SellerAddressForm = (props: SellerAddressFormProps): JSX.Element => {
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
    routeHeader = 'Create Address';
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

      <Row className="textfield-row">
        <Col md={12}>
          <DropdownLocation
            value={address?.address || ''}
            label="Address"
            onSelect={setAddress}
          />
        </Col>
        <Col md={12} style={{ marginTop: 24 }}>
          <TextField
            label="Unit number (optional)"
            name="unitNumber"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="checkbox-row">
        <Col className="checkbox-col">
          <div className="checkbox-container">
            <Checkbox checked={isDefault || false} onClick={toggleIsDefault} />
          </div>
          <Typography variant="label" color="noshade">
            Set as default address
          </Typography>
        </Col>
      </Row>

      <Row nogutter>
        <Col>
          <Button text="Submit" onClick={onClickSave} loading={pending} />
        </Col>
      </Row>
    </Container>
  );
};

export default SellerAddressForm;
