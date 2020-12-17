import React, { useRef } from 'react';

import { Camera } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { AddProps } from './Add.props';
import { Container } from './Add.style';

const Add = (props: AddProps): JSX.Element => {
  const theme = useTheme();

  const { title, onClick, Svg, onClickImage, onClickFile } = props;

  const enableImagePicker = onClickImage !== undefined;
  const enableFilePicker = onClickFile !== undefined;
  const imagePicker = useRef<HTMLInputElement | null>(null);
  const filePicker = useRef<HTMLInputElement | null>(null);

  const handleOnClick = () => {
    if (enableImagePicker) {
      // handle image
      if (imagePicker && imagePicker.current) {
        imagePicker.current.click();
      }
    } else if (enableFilePicker) {
      // handle file
      if (filePicker && filePicker.current) {
        filePicker.current.click();
      }
    } else if (onClick !== undefined) {
      onClick();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // accept ony jpg and png
    const imageFiles = files.filter(
      ({ type }) => type === 'image/jpeg' || type === 'image/png'
    );

    // only return first index
    if (onClickImage !== undefined) {
      onClickImage(imageFiles.length > 0 ? imageFiles[0] : null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // accept ony images/docs/pdf
    const documentFiles = files.filter(
      ({ type }) =>
        type === 'image/jpeg' ||
        type === 'image/png' ||
        type === 'application/pdf' ||
        type === 'application/msword'
    );

    // only return first index
    if (onClickFile !== undefined) {
      onClickFile(documentFiles.length > 0 ? documentFiles[0] : null);
    }
  };

  return (
    <>
      {enableImagePicker && (
        <input
          ref={imagePicker}
          type="file"
          hidden
          name="image"
          onChange={handleImageChange}
        />
      )}
      {enableFilePicker && (
        <input
          ref={filePicker}
          type="file"
          hidden
          name="file"
          onChange={handleFileChange}
        />
      )}
      <Container onClick={handleOnClick}>
        <div className="content">
          <div className="svg-container">
            <Svg fill={theme.brand.primary} />
          </div>

          <Typography color="primary" variant="label">
            {title}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Add);
