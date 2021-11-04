import React, { useRef, useState } from 'react';

import Spinner from 'components/base/Spinner';
import { Pen, PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import DefaultProfileImage from 'res/images/seller-profile-default.png';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { AccountPictureProps } from './AccountPicture.props';
import {
  Container,
  ImageContainer,
  NoProfilePic,
} from './AccountPicture.style';

const AccountPicture = (props: AccountPictureProps): JSX.Element => {
  const theme = useTheme();

  const { profilePicture, updateImage, updatingImage } = props;

  const [imageError, setImageError] = useState(false);
  const [hideBrokenProfileImage, setHideBrokenProfileImage] = useState(false);
  const imagePicker = useRef<HTMLInputElement | null>(null);

  const handleOnClick = () => {
    // handle image
    if (imagePicker && imagePicker.current) {
      imagePicker.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    let invalid = false;
    console.log(files);

    files.forEach((f) => {
      if (!['image/jpeg', 'image/png'].includes(f.type)) {
        invalid = true;
        return;
      }
    });


    setImageError(invalid);

    // do not proceed
    if (invalid) {
      return;
    }

    if (files.length > 0) {
      updateImage(files[0]);
    }
  };

  return (
    <Container>
      <input
        ref={imagePicker}
        type="file"
        hidden
        name="profileImage"
        onChange={handleFileChange}
      />
      {updatingImage ? (
        <div className="loading-indicator">
          <Spinner />
        </div>
      ) : (
        <ImageContainer>
          <>
            {profilePicture !== '' ? (
              <>
                <img
                  src={
                    hideBrokenProfileImage
                      ? DefaultProfileImage
                      : parseImageUrl(profilePicture) || DefaultProfileImage
                  }
                  alt="profile picture"
                  onError={() => {
                    setHideBrokenProfileImage(true);
                  }}
                  onClick={() => {
                    handleOnClick();
                  }}
                />
              </>
            ) : (
              <NoProfilePic
                onClick={() => {
                  handleOnClick();
                }}
              >
                <PlaceholderProfile width={96} height={96} />
              </NoProfilePic>
            )}
          </>
          <div
            className="pen"
            onClick={() => {
              handleOnClick();
            }}
          >
            <Pen fill={theme.brand.primary} />
          </div>
        </ImageContainer>
      )}
      <div className="error-container">
        {imageError && (
          <Typography className="text" color="error" variant="label">
            Please enter a valid image file (i.e. jpg, png)
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default React.memo(AccountPicture);
