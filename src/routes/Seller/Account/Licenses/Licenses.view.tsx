import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { FileCheck, Subtract } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add/Add.view';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import placeholder from 'res/images/license-placeholder.svg';
import { LicensesGeneratedProps } from 'routes/Seller/Account/Licenses/Licenses.props';
import {
  Container,
  DeleteBadge,
  DeleteText,
} from 'routes/Seller/Account/Licenses/Licenses.style';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

const LicensesView = ({
  licenseFile,
  licenseName,
  setLicenseName,
  ...props
}: LicensesGeneratedProps) => {
  const theme = useTheme();
  const [error, setError] = useState('');

  const validate = (callback?: () => void) => {
    if (!licenseFile) {
      setError('Please add a license file');
    } else if (licenseFile && licenseName.length === 0) {
      setError('Please add a license name');
    } else if (callback) {
      callback();
    } else {
      setError('');
    }
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Fishing Licenses' },
          ]}
        />
      </div>

      <Row>
        <Col md={12} xl={6}>
          <Row>
            <Col md={12} xl={8} className="add-col">
              <Typography
                variant="overline"
                color="shade6"
                className="license-file-text"
              >
                License File
              </Typography>

              <Add
                onClickFile={props.setLicenseFile}
                title="Add a File"
                Svg={FileCheck}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} xl={8}>
              <TextField
                label="License Name"
                value={licenseName}
                onChangeText={setLicenseName}
                error={error}
                onBlur={() => validate()}
              />
            </Col>
          </Row>

          <Row justify="start" className="btn-save-row">
            <Col>
              <Button
                text="Save"
                onClick={() => validate(props.onSave)}
                loading={props.isUpdating}
              />
            </Col>
          </Row>
        </Col>

        <Col md={12} xl={6}>
          <Row>
            {props.licenses.map((l) => (
              <Col key={l.id} md={12} className="preview-col">
                <Typography variant="overline" color="shade6">
                  License
                </Typography>
                <div className="license-details">
                  <div>
                    <img
                      style={{ width: 116 }}
                      src={parseImageUrl(l.url, placeholder)}
                      onClick={() => window.open(l.url, '_blank')}
                    />
                  </div>
                  <div>
                    <Typography variant="label" color="noshade">
                      {l.name}
                    </Typography>
                    <DeleteBadge onClick={() => props.onPressDelete(l.id)}>
                      <Subtract
                        innerFill={theme.brand.error}
                        fill={theme.grey.noshade}
                      />
                      <DeleteText color="shade2" variant="label">
                        Delete
                      </DeleteText>
                    </DeleteBadge>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LicensesView;
