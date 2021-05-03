import React, { useReducer, useEffect } from 'react';

import Button from 'components/base/Button';
import { Camera, Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddImage from 'components/module/AddImage';
import { Row, Col } from 'react-grid-system';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { base64ToFile } from 'utils/File';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { Step4Props } from './Step4.props';
import { Container, DeleteBadge } from './Step4.style';

function Step5({
  isCustomType,
  listingFormData,
  editableListing,
  onUpdateImage,
}: Step4Props) {
  const theme = useTheme();

  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

  const photoRequirements =
    (isCustomType
      ? categoryData?.photoRequirements
      : listingFormData?.photoRequirements) || [];

  const initialExistingImages = (editableListing?.existingImages || []).reduce<
    Record<string, string>
  >(
    (accumulator, current) => ({
      ...accumulator,
      [current.requirementId]: current.image || '',
    }),
    {}
  );

  // const initialImages = (editableListing?.images || []).reduce<
  //   Record<string, File | null>
  // >(
  //   (accumulator, current) => ({
  //     ...accumulator,
  //     [current.requirementId]: current.image,
  //   }),
  //   {}
  // );

  const [existingImages, setExistingImages] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    initialExistingImages
  );

  const [images, setImages] = useReducer(
    createUpdateReducer<Record<string, File | null>>(),
    {}
  );

  const isExisting = (editableListing?.currentListingId || '').length > 0;

  useEffect(() => {
    if (editableListing.images) {
      Promise.all(
        editableListing.images.map((imgData) =>
          base64ToFile(
            imgData.image.data,
            imgData.image.name,
            imgData.image.type
          )
        )
      ).then((imageFiles) => {
        const initialImages = (editableListing?.images || []).reduce<
          Record<string, File | null>
        >(
          (accumulator, current, index) => ({
            ...accumulator,
            [current.requirementId]: imageFiles[index],
          }),
          {}
        );
        setImages(initialImages);
      });
    }
  }, [editableListing.images]);

  return (
    <Container>
      <Row className="preview-row">
        {photoRequirements.map((requirement) => (
          <Col key={requirement.id} md={6} className="add-col">
            <Typography color="shade2" variant="label" className="text">
              {requirement.title}
            </Typography>
            <AddImage
              image={images[requirement.id] || existingImages[requirement.id]}
              onSelectImage={(data) => {
                setImages({ [requirement.id]: data });
              }}
              onRemoveImage={() => {
                if (existingImages[requirement.id]) {
                  setExistingImages({ [requirement.id]: '' });
                } else {
                  setImages({ [requirement.id]: null });
                }
              }}
            />
          </Col>
        ))}
      </Row>

      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button
          text={isExisting ? 'Review' : 'Next'}
          onClick={() => onUpdateImage(images, existingImages)}
        />
      </Row>
    </Container>
  );
}

export default Step5;
