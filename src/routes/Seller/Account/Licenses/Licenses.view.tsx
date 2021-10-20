import React from 'react';

import Alert from 'components/base/Alert';
import AnimationPlayer from 'components/base/AnimationPlayer';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { Close, Prawn, Pen, TrashCan } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { PreviewFile } from 'components/module/AddFile/AddFile.style';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES, placeholderImage } from 'consts';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { AnimatedCrab } from 'res/images/animated/crab';
import {
  LicensesGeneratedProps,
  LicenseOption,
} from 'routes/Seller/Account/Licenses/Licenses.props';
import {
  Container,
  EmptyContainer,
  Image,
  LicenseDetailsText,
  IconsContainer,
} from 'routes/Seller/Account/Licenses/Licenses.style';
import { useTheme } from 'utils/Theme';

export const LicenseDetails = (props: LicenseOption) => {
  const { label, image, pending, expiredAt } = props;
  const theme = useTheme();
  return (
    <>
      {image ? (
        <PreviewFile
          style={{ margin: 0, marginRight: 16 }}
          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
        />
      ) : (
        <Image src={placeholderImage} />
      )}
      <LicenseDetailsText>
        {pending && (
          <Badge
            className="badge"
            badgeColor={theme.brand.warning}
            style={{ marginBottom: 4 }}
          >
            <Typography color="shade4" variant="overline">
              Pending Approval
            </Typography>
          </Badge>
        )}
        <Typography variant="body" color="noshade">
          {label}
        </Typography>
        {!pending && (
          <Typography variant="caption" color="shade6">
            Expires {expiredAt ? moment(expiredAt).format('dd MMMM YYYY') : ''}
          </Typography>
        )}
      </LicenseDetailsText>
    </>
  );
};

const LicensesView = ({
  onClickAddLicense,
  onClickEditLicense,
  loading,
  showSuccess,
  setShowSuccess,
  onDeleteLicense,
  ...props
}: LicensesGeneratedProps) => {
  const theme = useTheme();

  if (loading) {
    return <Loading />;
  }

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

      {props.licenses.length === 0 ? (
        <Row>
          <Col md={12} xl={12}>
            <EmptyContainer>
              {/* <Prawn /> */}
              <AnimationPlayer
                src={AnimatedCrab}
                style={{ width: '250px', height: '240px' }}
              />
              <Typography
                variant="title5"
                weight="700"
                color="noshade"
                style={{ fontFamily: 'Media Sans', maxWidth: '300px' }}
              >
                You have no licenses uploaded yet
              </Typography>
              <Typography
                variant="body"
                color="shade6"
                style={{ marginTop: '24px', marginBottom: '24px' }}
              >
                Start by uploading your fishing license
              </Typography>
              <Button text="Upload License" onClick={onClickAddLicense} />
            </EmptyContainer>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12} xl={12}>
            <Row>
              {showSuccess && (
                <Alert
                  header="License Successfully Uploaded"
                  content="Your License is under approval process. It may takes 1-2 days to be approved"
                  variant="success"
                  fullWidth
                  style={{ marginBottom: 24 }}
                  iconRight={
                    <div onClick={() => setShowSuccess(false)}>
                      <Close height={12} width={12} fill={theme.grey.shade7} />
                    </div>
                  }
                />
              )}
              <Typography
                variant="overline"
                color="shade6"
                style={{ marginBottom: 4 }}
              >
                My Licenses
              </Typography>
              {props.licenses.map((l) => (
                <Interactions
                  key={l.id}
                  type="edit"
                  padding="12px"
                  marginBottom="8px"
                  customIcon={
                    <IconsContainer>
                      <div
                        onClick={() => {
                          onClickEditLicense(l.id);
                        }}
                      >
                        <Pen />
                      </div>
                      <div onClick={() => onDeleteLicense(l.id)}>
                        <TrashCan width={20} height={20} />
                      </div>
                    </IconsContainer>
                  }
                >
                  <LicenseDetails
                    value={l.id}
                    label={l.name}
                    image={l.url}
                    pending={l.approved === 'PENDING'}
                    expiredAt={l.expired_at}
                  />
                </Interactions>
              ))}
              <Button
                text="Upload License"
                onClick={onClickAddLicense}
                style={{ marginTop: '16px' }}
              />
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LicensesView;
