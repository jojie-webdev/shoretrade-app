import React, { useReducer } from 'react';

// import { useTheme } from 'utils/Theme';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import LocationSearch from 'components/module/LocationSearch/LocationSearch.view';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { createUpdateReducer } from 'utils/Hooks';

import { SellerAddressFormProps } from './SellerAddressForm.props';
import { Container } from './SellerAddressForm.style';
import { isValid } from './SellerAddressForm.validation';

const SellerAddressForm = (props: SellerAddressFormProps): JSX.Element => {
  const {
    companyId,
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
    onDeleteAddress,
    isDelete,
    toggleisDelete,
  } = props;

  let successContent = '';
  let routeHeader = '';

  if (type === 'CREATE') {
    routeHeader = 'Create Address';
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
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Shipping Addresses',
              link: `${SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS}${qs.stringify(
                { companyId },
                { addQueryPrefix: true }
              )}`,
            },
            { label: routeHeader },
          ]}
        />
      </div>

      <Row className="textfield-row">
        <Col className="textfield-col" md={12} xl={4}>
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
              disabled: type === 'EDIT',
            }}
          />
        </Col>
        <Col className="textfield-col" md={12} xl={4}>
          <TextField
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
          <Typography variant="label" color="noshade">
            Set as default address
          </Typography>
        </Col>
      </Row>

      <Row nogutter>
        <Button text="Submit" onClick={validate} loading={pending} />
        {type === 'EDIT' ? (
          <Button
            className="delete-btn"
            text="Delete"
            onClick={onDeleteAddress}
            loading={pending}
          />
        ) : null}
      </Row>
    </Container>
  );
};

export default SellerAddressForm;
