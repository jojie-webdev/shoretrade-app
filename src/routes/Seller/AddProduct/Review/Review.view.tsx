import React, { useEffect, useState } from 'react';

import Accordion from 'components/base/Accordion';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment-timezone';
import unnest from 'ramda/es/unnest';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { BoxDetails } from '../AddBoxes/AddBoxes.view';
import { ReviewProps } from './Review.props';
import { Container, ButtonRow } from './Review.style';

const Review = ({
  isCustomType,
  pendingSave,
  editableListing,
  listingFormData,
  saveListing,
  onChangeCurrentPage,
  preview,
  boxesDetails,
  measurementUnit,
  isBulkUpload,
}: ReviewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [packing, setPackaging] = useState('');

  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );
  const availableCrates = useSelector(
    (state: Store) => state.getAvailableCrates.data?.data
  );
  const sfm = availableCrates?.sfm || [{ id: '' }];
  const polystyrene = availableCrates?.polystyrene || [];

  const historicalListings =
    useSelector(
      (state: Store) => state.getHistoricalListings?.data?.data.listings || []
    ) || [];

  const currentHistoricalListingId =
    editableListing.currentHistoricalListingId || '';

  const currentHistoricalListingData = currentHistoricalListingId
    ? historicalListings.find((a) => a.id === currentHistoricalListingId)
    : undefined;

  const isMissingDate =
    !editableListing.currentHistoricalListingId &&
    !(editableListing.ends && editableListing.catchDate);

  const isExisting = (editableListing?.currentListingId || '').length > 0;

  const title =
    (isCustomType
      ? editableListing?.customTypeData?.name
      : listingFormData?.type.name) || '';
  const stateOptions =
    (isCustomType ? categoryData?.states : listingFormData?.stateOptions) || [];

  const specifications = (editableListing?.states || []).map(
    (specificationId) => {
      // order of editableListings.states might be modified by BE
      // search for possible matches regardless of the group
      const options = unnest(stateOptions);
      return (
        options.find(
          (option) => option.categoryStateOptionId === specificationId
        )?.state.name || ''
      );
    }
  );

  const additionalInfos = [];
  if (editableListing.isIkeJime)
    additionalInfos[additionalInfos.length] = 'Ike Jime';

  if (editableListing.isIceSlurry)
    additionalInfos[additionalInfos.length] = 'Ice Slurry';

  if (editableListing.quality)
    additionalInfos[additionalInfos.length] = editableListing.quality;

  const size = sizeToString(
    (isCustomType
      ? editableListing?.customTypeData?.metric.name
      : listingFormData?.metric.name) || '',
    editableListing?.sizeFrom || '',
    editableListing?.sizeTo || ''
  );

  const boxes = editableListing?.boxes
    ? (editableListing?.boxes || []).length.toString()
    : '';

  const images = (
    (editableListing?.images || []).length +
    (editableListing?.existingImages || []).length
  ).toString();

  const catchDate = editableListing?.catchDate
    ? moment(editableListing.catchDate).format('ddd DD MMM yyyy')
    : '';

  const catchRecurrence = editableListing?.catchRecurrence || '';

  const listingEndDate = editableListing?.ends
    ? moment(editableListing.ends)
        .tz('Australia/Brisbane')
        .format('ddd DD MMM yyyy')
    : '';

  const listingEndTime = editableListing?.ends
    ? moment(editableListing.ends).tz('Australia/Brisbane').format('HH:mm')
    : '';

  const listingEnds =
    listingEndDate && listingEndTime
      ? `${listingEndTime} ${listingEndDate}`
      : '';

  const price = editableListing?.pricePerKilo || 0;

  const notes = editableListing?.description || '';

  useEffect(() => {
    if (availableCrates) {
      const isCustom = editableListing.packaging?.custom;
      if (isCustom) {
        setPackaging('My Own Packaging');
        return;
      }

      const isSfm = sfm[0].id === editableListing.packaging?.id;
      if (isSfm) {
        setPackaging('SFM Crates');
        return;
      }

      const isPoly = polystyrene.find(
        (p) => p.id === editableListing.packaging?.id
      );
      if (isPoly) {
        setPackaging('Polystyrene');
        return;
      }
    }
    // eslint-disable-next-line
  }, [availableCrates]);

  const [showValidationError, setShowValidationError] = useState(false);

  const isValidData = (() => {
    // TODO: add more checks if needed
    if ((currentHistoricalListingData || false) && isMissingDate) {
      return false;
    }
    return true;
  })();

  useEffect(() => {
    // only recheck if previously true
    setShowValidationError((currentValue) =>
      currentValue ? !isValidData : false
    );
    // eslint-disable-next-line
  }, [editableListing]);

  return (
    <Container>
      <Row>
        {currentHistoricalListingData && isMissingDate && (
          <Col md={12} className="interaction-col">
            <Alert
              fullWidth
              variant="alert"
              header="Please complete the outstanding fields"
              content="Confirm the box weights and enter the catch and expiry dates for this listing."
            />
          </Col>
        )}
        <Col md={12} className="interaction-col">
          <Interactions
            label="Type"
            value={title}
            type={isExisting ? 'none' : 'edit'}
            onClick={() => {
              if (!isExisting) {
                onChangeCurrentPage(2);
              }
            }}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Specifications"
            value={specifications.concat(additionalInfos).join(', ')}
            type={isExisting ? 'none' : 'edit'}
            onClick={() => {
              if (!isExisting) {
                onChangeCurrentPage(3);
              }
            }}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Size"
            value={size}
            type={isExisting ? 'none' : 'edit'}
            onClick={() => {
              if (!isExisting) {
                onChangeCurrentPage(4);
              }
            }}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Packaging"
            value={packing}
            type={isBulkUpload ? 'none' : 'edit'}
            onClick={() => {
              !isBulkUpload && onChangeCurrentPage(6);
            }}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Boxes"
            value={boxes}
            type="edit"
            onClick={() => {
              onChangeCurrentPage(7);
            }}
            showEmptyIndicator
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Accordion title="Boxes Detail" iconColor={theme.brand.primary}>
            <Typography variant="label" color="shade9">
              {boxesDetails.map((b, i) => (
                <BoxDetails
                  key={b.id}
                  id={b.id}
                  weight={b.weight}
                  unit={measurementUnit}
                  quantity={b.quantity}
                  count={b.count}
                />
              ))}
            </Typography>
          </Accordion>
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Price"
            value={toPrice(price)}
            type="edit"
            onClick={() => onChangeCurrentPage(8)}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Photos"
            value={images}
            type="edit"
            onClick={() => onChangeCurrentPage(5)}
          />
        </Col>
        {!catchRecurrence ? (
          <>
            <Col md={12} className="interaction-col">
              <Interactions
                label="Catch Date"
                value={catchDate}
                type="edit"
                showEmptyIndicator
                onClick={() => onChangeCurrentPage(8)}
              />
            </Col>
            <Col md={12} className="interaction-col">
              <Interactions
                label="Listing valid until (AEST)"
                value={listingEnds}
                type="edit"
                showEmptyIndicator
                onClick={() => onChangeCurrentPage(8)}
              />
            </Col>
          </>
        ) : (
          <Col md={12} className="interaction-col">
            <Interactions
              label="Catch Date"
              value={catchRecurrence}
              type="edit"
              showEmptyIndicator
              onClick={() => onChangeCurrentPage(8)}
            />
          </Col>
        )}

        <Col md={12} className="interaction-col ">
          <div className="text-area">
            <Interactions
              label="Notes"
              value={notes}
              type="edit"
              onClick={() => onChangeCurrentPage(8)}
            />
          </div>
        </Col>
      </Row>

      {showValidationError && (
        <Col md={12} className="interaction-col">
          <Alert
            fullWidth
            variant="error"
            content={'Please complete the required fields to continue.'}
          />
        </Col>
      )}

      {!isMobile && (
        <ButtonRow
          nogutter
          justify="start"
          style={{
            marginTop: 40,
          }}
        >
          <Button
            text="Preview"
            variant="outline"
            disabled={pendingSave}
            onClick={() => {
              if (!isValidData) {
                setShowValidationError(true);
              } else {
                setShowValidationError(false);
                preview();
              }
            }}
            className="button"
          />
          <Button
            text={isExisting ? 'Update Listing' : 'Add Listing'}
            loading={pendingSave}
            onClick={() => {
              if (!isValidData) {
                setShowValidationError(true);
              } else {
                setShowValidationError(false);
                saveListing();
              }
            }}
            className="button"
          />
        </ButtonRow>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          text="Preview"
          variant="outline"
          disabled={pendingSave}
          onClick={() => {
            if (!isValidData) {
              setShowValidationError(true);
            } else {
              setShowValidationError(false);
              preview();
            }
          }}
          style={{ marginRight: 8 }}
        />
        <Button
          takeFullWidth
          text={isExisting ? 'Update Listing' : 'Add Listing'}
          loading={pendingSave}
          onClick={() => {
            if (!isValidData) {
              setShowValidationError(true);
            } else {
              setShowValidationError(false);
              saveListing();
            }
          }}
        />
      </MobileFooter>
    </Container>
  );
};

export default Review;
