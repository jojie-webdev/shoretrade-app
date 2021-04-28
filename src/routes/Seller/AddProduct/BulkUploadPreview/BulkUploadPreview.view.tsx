import React, { useRef, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import Select from 'components/base/Select/Select.view';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { placeholderImage, SELLER_ROUTES } from 'consts';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import getTimeDiff from 'utils/Date/getTimeDiff';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { BulkUploadPreviewGeneratedProps } from './BulkUploadPreview.props';
import { Container, ErrorButton } from './BulkUploadPreview.style';
import {
  getTotalWeight,
  showListingCount,
} from './BulkUploadPreview.transform';

const COLUMNS = [
  'PHOTOS',
  'TYPE',
  'ORIGIN',
  'BOXES',
  'STOCK',
  'PRICE',
  'CATCH DATE',
  'VALID UNTIL',
];

const Error = (props: { onClick?: () => void }) => {
  return (
    <ErrorButton
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <InfoFilled width={20} height={20} />
    </ErrorButton>
  );
};

const BulkUploadPreviewView = ({
  data,
  onEdit,
  ...props
}: BulkUploadPreviewGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);
  const [shippingAddress, setShippingAddress] = useState('');

  const count = showListingCount(data);
  const invalidListing = count[0] > 0;
  const hasListing = count[1] > 0;

  const canSubmit = !invalidListing && shippingAddress.length > 0;

  return (
    <Container>
      <Row
        nogutter
        className="re-upload-container"
        align="center"
        justify="between"
      >
        <Col>
          <Typography variant="label" color="noshade">
            {invalidListing ? (
              <>
                Spreadsheet has {count[0]} invalid listing
                {count[0] === 1 ? '' : 's'}.
                <br />
                Check your file and reupload.
              </>
            ) : (
              <>
                {count[1]} Listing{count[1] === 1 ? '' : 's'} Detected
              </>
            )}
          </Typography>
        </Col>

        <Col className="input-container" xs="content">
          <input
            id="csvUpload"
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.currentTarget.files) {
                props.onUploadCSV(e.currentTarget.files[0]);
              }
            }}
          />
          <Button
            text="Re-upload csv"
            loading={props.isUploadingCSV}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
          />
        </Col>
      </Row>

      <>
        <div className="listings-row">
          <div className="header">
            {COLUMNS.map((c) => (
              <Typography key={c} variant="overlineSmall" color="shade6">
                {c}
              </Typography>
            ))}
          </div>

          {data.map((d, index) => {
            return (
              <div key={index} className="listings-data-row">
                <div className="column-item">
                  <img src={placeholderImage} />
                </div>

                <div className="column-item">
                  <Typography variant="caption" color="noshade">
                    {d.typeDisplayText || <Error />}
                  </Typography>
                  <Typography variant="small" color="shade7">
                    {d.specifications.length > 0 &&
                    d.specifications.every((a) => a.length > 0) ? (
                      d.specificationsDisplayText.join(' | ')
                    ) : (
                      <Error
                        onClick={() => {
                          onEdit(index, 3, d);
                        }}
                      />
                    )}
                  </Typography>

                  <Typography variant="small" color="shade7">
                    {d.isUngraded || d.sizeFrom ? (
                      sizeToString(d.metric as string, d.sizeFrom, d.sizeTo)
                    ) : (
                      <Error
                        onClick={() => {
                          onEdit(index, 4, d);
                        }}
                      />
                    )}
                  </Typography>
                </div>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.origin.suburb && d.origin.state ? (
                    `${d.origin.suburb}, ${d.origin.state}`
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 7, d);
                      }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.boxes.length > 0 &&
                  d.boxes.every((a) => a.quantity && a.weight) ? (
                    <>
                      {d.boxes.map((b, bIndex) => (
                        <span key={bIndex}>
                          {b.weight} {d.measurementUnit} x{b.quantity} <br />
                        </span>
                      ))}
                    </>
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 6, d);
                      }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.boxes.length > 0 &&
                  d.boxes.every((a) => a.quantity && a.weight) ? (
                    `${getTotalWeight(d.boxes)} ${d.measurementUnit}`
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 6, d);
                      }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.pricePerKilo ? (
                    `${toPrice(d.pricePerKilo)} / ${d.measurementUnit}`
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 7, d);
                      }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.catchDate ? (
                    `${moment(d.catchDate).format('ddd D MMM ')}`
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 7, d);
                      }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="noshade"
                  className="column-item"
                >
                  {d.ends ? (
                    `${getTimeDiff(moment(d.ends).toDate())}`
                  ) : (
                    <Error
                      onClick={() => {
                        onEdit(index, 7, d);
                      }}
                    />
                  )}
                </Typography>
              </div>
            );
          })}
        </div>

        {props.errorMessage.length > 0 && (
          <Alert
            content={props.errorMessage}
            variant="error"
            alignText="center"
            fullWidth
            style={{
              marginBottom: 24,
            }}
          />
        )}

        <Row>
          <Col md={12} xl={5}>
            <Select
              value={shippingAddress}
              onChange={(option) => {
                setShippingAddress(option.value);
              }}
              options={props.shippingAddressOptions}
              label="Shipping Address"
            />
          </Col>
        </Row>

        <Row nogutter className="btns-row">
          <Button
            text="Cancel"
            variant="outline"
            onClick={() => history.replace(SELLER_ROUTES.ADD_PRODUCT)}
            style={{ width: 88 }}
          />
          <Button
            text="List products"
            loading={props.isSubmitting}
            disabled={!canSubmit}
            onClick={() => props.onSubmit(shippingAddress)}
          />
        </Row>
      </>
    </Container>
  );
};

export default BulkUploadPreviewView;
