import React, { useRef, useState } from 'react';

import { Camera } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { AddProps } from './Add.props';
import { Container } from './Add.style';

const Add = (props: AddProps): JSX.Element => {
  const theme = useTheme();
  const [invalid, setInvalid] = useState(false);

  const {
    title,
    onClick,
    Svg,
    onClickImage,
    onClickFile,
    customTitle,
    imageTypeWhiteList = ['image/jpeg', 'image/png'],
    documentTypeWhiteList = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
    ],
    inputProps = {},
    error = false,
  } = props;

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

  const invalidText = () => {
    if (enableImagePicker) {
      return 'Please enter a valid image file (i.e. jpg, png)';
    } else if (enableFilePicker) {
      return 'Please enter a valid image or document file (i.e. jpg, png, pdf)';
    }
    return 'Please enter a valid file format';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    let invalid = false;

    files.forEach((f) => {
      if (!imageTypeWhiteList.includes(f.type)) {
        invalid = true;
        return;
      }
    });

    setInvalid(invalid);

    // do not proceed
    if (invalid) {
      return;
    }

    // only return first index
    if (onClickImage !== undefined) {
      onClickImage(files.length > 0 ? files[0] : null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let invalid = false;
    files.forEach((f) => {
      if (!documentTypeWhiteList.includes(f.type)) {
        invalid = true;
        return;
      }
    });

    setInvalid(invalid);

    // do not proceed
    if (invalid) {
      return;
    }

    // only return first index
    if (onClickFile !== undefined) {
      onClickFile(files.length > 0 ? files[0] : null);
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
          {...inputProps}
        />
      )}
      {enableFilePicker && (
        <input
          ref={filePicker}
          type="file"
          hidden
          name="file"
          onChange={handleFileChange}
          {...inputProps}
        />
      )}
      <Container
        error={error || invalid}
        onClick={handleOnClick}
        className="add-container"
        noSvg={!Svg}
      >
        <div className="content">
          {Svg && (
            <div className="svg-container">
              <Svg fill={theme.brand.primary} />
            </div>
          )}

          {title && (
            <Typography color="primary" variant="label">
              {title}
            </Typography>
          )}
          {customTitle}
        </div>
      </Container>
      {invalid && (
        <Typography color="error" variant="label">
          {invalidText()}
        </Typography>
      )}
    </>
  );
};

export default React.memo(Add);
