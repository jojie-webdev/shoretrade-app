import React, { useRef, useState } from 'react';

// import { useTheme } from 'utils/Theme';

import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import DefaultProfileImage from 'res/images/seller-profile-default.png';

import { AccountLandingGeneratedProps } from './Landing.props';
import {
  Container,
  NavInteraction,
  Header,
  DropdownContainer,
} from './Landing.style';

const AccountLandingView = (props: AccountLandingGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();

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
      value: 'Fisherman / Assistants',
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

  if (loadingUser) {
    return <Loading />;
  }

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
            <img
              src={
                hideBrokenProfileImage
                  ? DefaultProfileImage
                  : profilePicture || DefaultProfileImage
              }
              alt="profile picture"
              onError={() => {
                setHideBrokenProfileImage(true);
              }}
              onClick={() => {
                handleOnClick();
              }}
            />
          )}

          <div>
            <Typography variant="overline" color="noshade">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>
            <Typography variant="title5" color="noshade">
              {profileName}
            </Typography>
          </div>
        </div>

        <div className="right-content">
          <DropdownContainer>
            <Select
              label=""
              options={companyOptions}
              value={currentCompany?.id}
              size="small"
              dark={true}
            />
          </DropdownContainer>
          {/* <AccountSelect options={['one', 'two', 'three']} /> */}
        </div>
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
