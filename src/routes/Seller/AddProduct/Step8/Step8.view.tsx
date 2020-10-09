import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import moment from 'moment';
import unnest from 'ramda/es/unnest';
import { Row, Col } from 'react-grid-system';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { Step8Props } from './Step8.props';
import { Container } from './Step8.style';

function Step8({
  isCustomType,
  editableListing,
  listingFormData,
  saveListing,
  onChangeCurrentPage,
  preview,
}: Step8Props) {
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
  const listingEnds = moment(editableListing?.ends || null).format(
    'HH:mm ddd DD MMM yyyy'
  );

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
            type={isExisting ? 'none' : 'edit'}
            onClick={() => {
              if (!isExisting) {
                onChangeCurrentPage(6);
              }
            }}
          />
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
            label="Catch details"
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
      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button
          style={{ marginRight: 16, width: 200 }}
          text="Preview"
          variant="outline"
          onClick={() => preview()}
        />
        <Button
          style={{ width: 200 }}
          text={isExisting ? 'Update' : 'Add'}
          onClick={() => saveListing()}
        />
      </Row>
    </Container>
  );
}

export default Step8;
