import React from 'react';

import { Camera, Subtract } from 'components/base/SVG';
import Add from 'components/module/Add';
import isEmpty from 'ramda/es/isEmpty';
import { useTheme } from 'utils/Theme';

import { AddImageProps } from './AddImage.props';
import {
  PreviewContainer,
  PreviewImage,
  DeleteBadge,
  DeleteText,
} from './AddImage.style';

const AddImage = (props: AddImageProps): JSX.Element => {
  const theme = useTheme();
  const { image, onSelectImage, onRemoveImage } = props;

  if (image !== null && image !== undefined && !isEmpty(image)) {
    return (
      <PreviewContainer>
        <PreviewImage
          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          alt="Product Preview"
        />
        <DeleteBadge onClick={() => onRemoveImage()}>
          <Subtract innerFill={theme.brand.error} fill={theme.grey.noshade} />
          <DeleteText color="shade2" variant="label">
            Delete
          </DeleteText>
        </DeleteBadge>
      </PreviewContainer>
    );
  }
  return <Add onClickImage={onSelectImage} title="Add a Photo" Svg={Camera} />;
};

export default React.memo(AddImage);
