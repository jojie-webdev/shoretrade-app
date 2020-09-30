import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { LandingGeneratedProps } from './Landing.props';
import LandingView from './Landing.view';

const Landing = (): JSX.Element => {
  const dispatch = useDispatch();

  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const companies = user?.companies || [];
  const companyRelationship = currentCompany?.relationship || '';
  const profilePicture = user?.profileImage || '';
  const profileName = `${user?.firstName || ''} ${user?.lastName || ''}`;

  const generatedProps: LandingGeneratedProps = {
    credit: currentCompany?.credit,
    currentCompany,
    companyRelationship,
    companies,
    profilePicture,
    profileName,
    loadingUser,
  };
  return <LandingView {...generatedProps} />;
};

export default Landing;
