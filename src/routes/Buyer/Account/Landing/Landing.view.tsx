import React, { useRef, useState } from 'react';

import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner/Spinner.view';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import DefaultProfileImage from 'res/images/seller-profile-default.png';
import { parseImageUrl } from 'utils/parseImageURL';

import { LandingGeneratedProps } from './Landing.props';
import {
  Container,
  Header,
  NavInteraction,
  NoProfilePic,
} from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const {
    currentCompany,
    companyRelationship,
    companies,
    profilePicture,
    profileName,
    loadingUser,
    updateImage,
    updatingImage,
  } = props;

  const INTERACTIONS = [
    {
      value: 'Account Completion',
      path: BUYER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION,
    },
    { value: 'Balance & Payments', path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS },
    {
      value: 'Your Details',
      path: BUYER_ACCOUNT_ROUTES.DETAILS,
    },
    { value: 'Delivery Address', path: BUYER_ACCOUNT_ROUTES.ADDRESS },
    {
      value: "Products I'm Buying",
      path: BUYER_ACCOUNT_ROUTES.MARKET_INTERESTS,
    },
    { value: 'Linked Accounts', path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS },
    { value: 'Change Password', path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    { value: 'Help & Support', path: BUYER_ACCOUNT_ROUTES.HELP },
  ];

  const [hideBrokenProfileImage, setHideBrokenProfileImage] = useState(false);
  const imagePicker = useRef<HTMLInputElement | null>(null);

  if (loadingUser) {
    return <Loading />;
  }

  const handleOnClick = () => {
    // handle image
    if (imagePicker && imagePicker.current) {
      imagePicker.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // accept ony jpg and png
    const imageFiles = files.filter(
      ({ type }) => type === 'image/jpeg' || type === 'image/png'
    );

    if (imageFiles.length > 0) {
      updateImage(imageFiles[0]);
    }
  };

  const companyOptions = companies.map((company) => {
    return {
      value: company.id,
      label: company.name,
    };
  });

  return (
    <Container>
      <BoxContainer>
        <Header>
          <div className="left-content">
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
              <>
                {profilePicture !== '' ? (
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
            )}

            <div>
              <Typography variant="overline" color="shade6">
                {companyRelationship === 'ADMIN'
                  ? 'Owner'
                  : companyRelationship}
              </Typography>
              <Typography variant="title5" color="shade8">
                {profileName}
              </Typography>
              {isMobile && (
                <div style={{ width: 167, marginTop: 8 }}>
                  <Select
                    label=""
                    options={companyOptions}
                    value={currentCompany?.id}
                    size="small"
                    grey
                  />
                </div>
              )}
            </div>
          </div>

          {!isMobile && (
            <div>
              <Select
                label=""
                options={companyOptions}
                value={currentCompany?.id}
                size="small"
                grey
              />
            </div>
          )}
        </Header>

        {INTERACTIONS.map((link) => (
          <NavInteraction
            key={link.path}
            value={link.value}
            onClick={() => {
              history.push(link.path);
            }}
          />
        ))}
      </BoxContainer>
    </Container>
  );
};

export default LandingView;
