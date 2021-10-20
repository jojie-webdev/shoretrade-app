import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import AddFile from 'components/module/AddFile/AddFile.view';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { AddLicenseGeneratedProps } from 'routes/Seller/Account/AddLicense/AddLicense.props';
import {
  Container,
  TipsContainer,
} from 'routes/Seller/Account/Licenses/Licenses.style';

const AddLicenseView = ({
  licenseFile,
  licenseFileBack,
  licenseFileName,
  licenseName,
  setLicenseName,
  hasLicenseBack,
  setHasLicenseBack,
  expirationDate,
  setExpirationDate,
  onClickAddLicense,
  onPressDelete,
  isEdit,
  states,
  stateId,
  setStateId,
  companyId,
  ...props
}: AddLicenseGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');
  const [dateError, setDateError] = useState('');
  const [stateError, setStateError] = useState('');
  const getStateOptions = () =>
    states.map((s) => ({ value: s.id, label: s.name }));

  const validate = (callback?: () => void) => {
    if (!licenseFile) {
      setFileError('Please add a license file');
      setError('');
      setDateError('');
      setStateError('');
    } else if (licenseFile && licenseName.length === 0) {
      setError('Please add a license name');
      setFileError('');
      setDateError('');
      setStateError('');
    } else if (!expirationDate) {
      setDateError('Please add the expiration date');
      setError('');
      setFileError('');
      setStateError('');
    } else if (!stateId) {
      setStateError('Please add a state');
      setError('');
      setFileError('');
      setDateError('');
    } else if (callback) {
      callback();
    } else {
      setError('');
      setFileError('');
      setDateError('');
      setStateError('');
    }
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Fishing Licenses',
              link: `${SELLER_ACCOUNT_ROUTES.LICENSES}?companyId=${companyId}`,
            },
            { label: isEdit ? 'Edit License' : 'Add License' },
          ]}
        />
      </div>

      <Row>
        <Col md={12} xl={7}>
          <Row>
            <Col md={12} xl={10} className="add-col">
              <Typography
                variant="overline"
                color="shade6"
                className="license-file-text"
              >
                License (Front)
              </Typography>

              <AddFile
                onSelectFile={props.setLicenseFile}
                file={licenseFile}
                fileName={licenseFileName}
                onRemoveFile={() => props.setLicenseFile(null)}
                error={fileError}
              />
            </Col>
          </Row>
          {hasLicenseBack && (
            <Row>
              <Col md={12} xl={10} className="add-col">
                <Typography
                  variant="overline"
                  color="shade6"
                  className="license-file-text"
                >
                  License (Back)
                </Typography>

                <AddFile
                  onSelectFile={props.setLicenseFileBack}
                  file={licenseFileBack}
                  fileName={licenseFileName}
                  onRemoveFile={() => props.setLicenseFileBack(null)}
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col md={12} xl={10} className="add-col">
              <Checkbox
                checked={hasLicenseBack}
                onClick={() => setHasLicenseBack((v) => !v)}
                label="License Back"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={10} className="add-col">
              <TextField
                label="License Name"
                value={licenseName}
                onChangeText={setLicenseName}
                error={error}
                onBlur={() => validate()}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={10} className="add-col">
              <DatePickerDropdown
                placeholder="17/01/2025"
                label="Expiration Date"
                date={expirationDate ? moment(expirationDate) : null}
                onDateChange={(d) => setExpirationDate(d?.toDate() || null)}
                showCalendarIcon
                error={dateError}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={10} className="add-col">
              <Select
                label="State"
                options={getStateOptions()}
                value={stateId}
                onChange={(v) => setStateId(v.value)}
                error={stateError}
              />
            </Col>
          </Row>

          <Row justify="start" className="btn-save-row">
            {!isMobile && (
              <Col>
                <Button
                  text="Save"
                  onClick={() => validate(props.onSave)}
                  loading={props.isUpdating}
                />
                {isEdit && (
                  <Button
                    text="Delete"
                    onClick={() => onPressDelete && onPressDelete()}
                    loading={props.isUpdating}
                    variant="outline"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </Col>
            )}
          </Row>
        </Col>
        <Col md={12} xl={5}>
          <Row>
            <TipsContainer>
              <Typography variant="body" weight="bold">
                Why you need to upload your Fishing License
              </Typography>
              <Typography variant="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam, ullamcorper pellentesque elementum sit augue ornare
                consectetur velit. Nam suspendisse nascetur pellentesque quis
                in. Eu maecenas luctus faucibus pulvinar ultricies luctus ut
                nisl.
              </Typography>
              <Typography variant="body" weight="bold">
                Upload Tips
              </Typography>
              <Typography variant="body">
                Make sure the license informations are legible. The approval
                process may take 1-2 business days.
              </Typography>
            </TipsContainer>
          </Row>
        </Col>
      </Row>

      <MobileFooter>
        <Button
          text="Save"
          takeFullWidth
          onClick={() => validate(props.onSave)}
          loading={props.isUpdating}
        />
        {isEdit && (
          <Button
            text="Delete"
            takeFullWidth
            onClick={() => onPressDelete && onPressDelete()}
            loading={props.isUpdating}
            variant="outline"
          />
        )}
      </MobileFooter>
    </Container>
  );
};

export default AddLicenseView;
