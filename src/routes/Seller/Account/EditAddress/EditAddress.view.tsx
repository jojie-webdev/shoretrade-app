import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LoadingView from 'components/module/Loading';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';

import { EditAddressGeneratedProps } from './EditAddress.props';
import { Container } from './EditAddress.style';
import { isValid } from './EditAddress.validation';

const EditAddressView = (props: EditAddressGeneratedProps) => {
  // const theme = useTheme();
  const { address, isDefault, pending, onClickSave, toggleIsDefault } = props;

  const formikProps = {
    initialValues: {
      address: address?.address || '',
      unitNumber: address?.unitNumber || '',
    },
    validate: isValid,
    onSubmit: onClickSave,
  };

  if (!address) {
    return <LoadingView></LoadingView>;
  }

  return (
    <Container>
      <InnerRouteHeader title="Edit Adresses" />

      <Formik {...formikProps}>
        <Form>
          <Row className="textfield-row">
            <Col>
              <FormikTextField label="Address" name="address" />
            </Col>
            <Col>
              <TextField label="Unit number (optional)" name="unitNumber" />
            </Col>
          </Row>

          <Row className="checkbox-row">
            <Col className="checkbox-col">
              <div className="checkbox-container">
                <Checkbox
                  checked={isDefault || false}
                  onClick={toggleIsDefault}
                />
              </div>
              <Typography variant="label" color="noshade">
                Set as default address
              </Typography>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button text="Submit" type="submit" loading={pending} />
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};

export default EditAddressView;
