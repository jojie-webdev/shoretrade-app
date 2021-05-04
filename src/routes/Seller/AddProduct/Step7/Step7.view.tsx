import React from 'react';

import Accordion from 'components/base/Accordion';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import moment from 'moment-timezone';
import unnest from 'ramda/es/unnest';
import { Row, Col } from 'react-grid-system';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { BoxDetails } from '../Step5/Step5.view';
import { BoxItemProps, Step7Props } from './Step7.props';
import {
  Container,
  ButtonRow,
  BoxItemContainer,
  StyledTextField,
} from './Step7.style';

function Step8({
  isCustomType,
  editableListing,
  listingFormData,
  saveListing,
  onChangeCurrentPage,
  preview,
  boxesDetails,
  measurementUnit,
}: Step7Props) {
  const theme = useTheme();
  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

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
  const size = sizeToString(
    (isCustomType
      ? editableListing?.customTypeData?.metric.name
      : listingFormData?.metric.name) || '',
    editableListing?.sizeFrom || '',
    editableListing?.sizeTo || ''
  );
  const boxes = (editableListing?.boxes || []).length.toString();
  const images = (
    (editableListing?.images || []).length +
    (editableListing?.existingImages || []).length
  ).toString();
  const catchDate = moment(editableListing?.catchDate || null).format(
    'ddd DD MMM yyyy'
  );

  const listingEndDate = moment(editableListing?.ends || null).format(
    'ddd DD MMM yyyy'
  );

  // Note: only time should be treated as AEST
  const listingEndTime = moment(editableListing?.ends || null)
    .tz('Australia/Brisbane')
    .format('HH:mm');

  const listingEnds = `${listingEndTime} ${listingEndDate}`;

  const price = editableListing?.pricePerKilo || 0;

  const notes = editableListing?.description || '';
  return (
    <Container>
      <Row>
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
            value={specifications.join(', ')}
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
            label="Boxes"
            value={boxes}
            type="edit"
            onClick={() => {
              onChangeCurrentPage(6);
            }}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Accordion title="Boxes Detail" iconColor={theme.brand.primary}>
            <Typography variant="label" color="shade9">
              {boxesDetails.map((b, i) => (
                <BoxDetails
                  fixed={true}
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
            onClick={() => onChangeCurrentPage(7)}
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
        <Col md={12} className="interaction-col">
          <Interactions
            label="Catch Date"
            value={catchDate}
            type="edit"
            onClick={() => onChangeCurrentPage(7)}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Listing valid until"
            value={listingEnds}
            type="edit"
            onClick={() => onChangeCurrentPage(7)}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Notes"
            value={notes}
            type="edit"
            onClick={() => onChangeCurrentPage(7)}
          />
        </Col>
      </Row>
      <ButtonRow
        justify="start"
        style={{
          padding: '0 15px 0 15px',
          marginTop: 40,
          marginLeft: 0,
        }}
      >
        <Button
          text="Preview"
          variant="outline"
          onClick={() => preview()}
          className="button"
        />
        <Button
          text={isExisting ? 'Update Listing' : 'Add Listing'}
          onClick={() => saveListing()}
          className="button"
        />
      </ButtonRow>
    </Container>
  );
}

export default Step8;
