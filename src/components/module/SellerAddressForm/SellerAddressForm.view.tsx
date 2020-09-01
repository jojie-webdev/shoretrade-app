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
  } = props;

  return (
    <Container>
      {isSuccess && (
        <StyledAlert
          content="Your account details have successfully been updated!"
          variant="success"
          alignText="center"
          fullWidth
        />
      )}

      <InnerRouteHeader title="Edit Adresses" />

      <Row className="textfield-row">
        <Col>
          <DropdownLocation
            value={address.address}
            label="Address"
            onSelect={setAddress}
          />
        </Col>
        <Col>
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

      <Row>
        <Col>
          <Button text="Submit" onClick={onClickSave} loading={pending} />
        </Col>
      </Row>
    </Container>
  );
};

export default SellerAddressForm;
