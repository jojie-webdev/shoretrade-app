import React, { useReducer, useEffect } from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import AddImage from 'components/module/AddImage';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { base64ToFile } from 'utils/File';
import { createUpdateReducer } from 'utils/Hooks';

import { AddPhotosProps } from './AddPhotos.props';
import { Container, PhotoTypeWrapper } from './AddPhotos.style';
import Radio from 'components/base/Radio';

const AddPhotos = ({
  isCustomType,
  listingFormData,
  editableListing,
  onUpdateImage,
  onSetProductPhotoType,
  photoTypeData,
  navBack,
}: AddPhotosProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
    // eslint-disable-next-line
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
        <Col md={12} className="add-col">
          <PhotoTypeWrapper>
            {photoTypeData.map((_type) => (
              <Radio
                key={_type.id}
                label={_type.label}
                checked={_type.isChecked}
                onClick={() => {
                  onSetProductPhotoType(_type.id);
                }}
              />
            ))}
          </PhotoTypeWrapper>
        </Col>
      </Row>

      {!isMobile && (
        <Row justify="start" nogutter>
          <Button
            variant={'outline'}
            text="Back"
            onClick={() => {
              navBack();
            }}
            className="back-btn"
          />
          <Button
            className="next-btn"
            text={isExisting ? 'Review' : 'Next'}
            onClick={() => onUpdateImage(images, existingImages)}
          />
        </Row>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          variant={'outline'}
          text="Back"
          onClick={() => {
            navBack();
          }}
          style={{ marginRight: 8 }}
        />
        <Button
          takeFullWidth
          text={isExisting ? 'Review' : 'Next'}
          onClick={() => onUpdateImage(images, existingImages)}
        />
      </MobileFooter>
    </Container>
  );
};

export default AddPhotos;
