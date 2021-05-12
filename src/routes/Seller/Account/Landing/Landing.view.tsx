import React, { useRef, useState } from 'react';

import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import qs from 'qs';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import DefaultProfileImage from 'res/images/seller-profile-default.png';
import { parseImageUrl } from 'utils/parseImageURL';

import { AccountLandingGeneratedProps } from './Landing.props';
import {
  Container,
  NavInteraction,
  Header,
  NoProfilePic,
} from './Landing.style';

const AccountLandingView = (props: AccountLandingGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const {
    companies,
    currentCompany,
    profilePicture,
    loadingUser,
    profileName,
    companyRelationship,
    updateImage,
    updatingImage,
  } = props;

  const INTERACTIONS = [
    {
      value: 'Account Completion',
      path: `${SELLER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Your Details',
      path: `${SELLER_ACCOUNT_ROUTES.YOUR_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Shipping Addresses',
      path: `${SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    { value: 'Change Password', path: SELLER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    {
      value: 'Fishing Licenses',
      path: `${SELLER_ACCOUNT_ROUTES.LICENSES}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: "Products I'm Selling",
      path: `${SELLER_ACCOUNT_ROUTES.MARKET_INTERESTS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Fisherman / Assistant',
      path: `${SELLER_ACCOUNT_ROUTES.ASSISTANTS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Bank Details',
      path: `${SELLER_ACCOUNT_ROUTES.BANK_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    { value: 'Help & Support', path: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT },
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
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>
            <Typography variant="title5" color="noshade">
              {profileName}
            </Typography>

            {isMobile && (
              <div style={{ width: 167, marginTop: 8 }}>
                <Select
                  label=""
                  options={companyOptions}
                  value={currentCompany?.id}
                  size="small"
                  dark={true}
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
              dark={true}
            />
          </div>
        )}
      </Header>

      {INTERACTIONS.map((interaction) => (
        <NavInteraction
          key={interaction.path}
          value={interaction.value}
          onClick={() => history.push(interaction.path)}
        />
      ))}
    </Container>
  );
};

export default AccountLandingView;
