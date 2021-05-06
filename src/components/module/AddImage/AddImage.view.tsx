// @ts-nocheck
import React from 'react';

import { Camera, Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import isEmpty from 'ramda/es/isEmpty';
import { useTheme } from 'utils/Theme';

import { AddImageProps } from './AddImage.props';
import {
  PreviewContainer,
  PreviewImage,
  DeleteBadge,
  DeleteText,
  FileDetailsContainer,
} from './AddImage.style';

const bytesToSize = (bytes) => {
  const sizes = ['Kb', 'Mb', 'Gb', 'Tb'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const AddImage = (props: AddImageProps): JSX.Element => {
  const theme = useTheme();
  const { image, onSelectImage, onRemoveImage } = props;
  console.log({ image });
  if (image !== null && image !== undefined && !isEmpty(image)) {
    return (
      <PreviewContainer>
        <div className="left-content">
          <PreviewImage
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt="Product Preview"
          />
          <FileDetailsContainer>
            {image.name && (
              <>
                <Typography variant="caption" color="noshade">
                  {image.name}
                </Typography>

                <div className="format-size">
                  <Typography
                    variant="small"
                    color="shade7"
                    className="filesize-text"
                  >
                    {bytesToSize(image.size)}
                  </Typography>
                  <Typography variant="small" color="shade7">
                    {image.type.toUpperCase().replace('IMAGE/', '')} Format
                  </Typography>
                </div>
              </>
            )}
          </FileDetailsContainer>
        </div>

        <DeleteBadge onClick={() => onRemoveImage()}>
          <Subtract innerFill={theme.grey.shade9} fill={theme.grey.error} />
        </DeleteBadge>
      </PreviewContainer>
    );
  }
  return <Add onClickImage={onSelectImage} title="Add a Photo" Svg={Camera} />;
};

export default React.memo(AddImage);
