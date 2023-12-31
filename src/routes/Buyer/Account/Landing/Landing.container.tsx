import React, { useState, useEffect } from 'react';

import { PERMISSIONS } from 'consts/permissions';
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  cartActions,
  editableListingActions,
  updateUserActions,
  logoutActions,
  getAccountCompletionActions,
  getMarketInterestsActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import { isPermitted } from 'utils/isPermitted';

import { LandingGeneratedProps } from './Landing.props';
import LandingView from './Landing.view';

const Landing = (): JSX.Element => {
  const dispatch = useDispatch();
  const company = GetDefaultCompany();

  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const accountCompletion = useSelector(
    (store: Store) => store.getAccountCompletion.data?.data
  );
  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const companies = user?.companies || [];
  const companyRelationship = currentCompany?.relationship || '';
  const profilePicture = user?.profileImage || '';
  const profileName = `${user?.firstName || ''} ${user?.lastName || ''}`;

  const updatingImage =
    useSelector((state: Store) => state.updateUser.pending) || false;

  const marketSector = useSelector(
    (state: Store) => state.getMarketInterests.data?.data.sectorAlias
  );

  const updateImage = (image: File) => {
    dispatch(
      updateUserActions.request({
        logo: image,
        companyId: currentCompany?.id || '',
      })
    );
  };

  const logout = () => {
    dispatch(logoutActions.request());
    dispatch(editableListingActions.clear());
    dispatch(cartActions.clear());
    dispatch(authActions.clear());
  };

  const permission =
    !isPendingAccount &&
    isPermitted(user, PERMISSIONS.BUYER.VIEW_LINKED_ACCOUNTS);

  useEffect(() => {
    if (!loadingUser) {
      const c = companies || [];

      setCurrentCompany(c[0]);
    }
    // eslint-disable-next-line
  }, [loadingUser]);

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    if (currentCompany?.id) {
      dispatch(
        getAccountCompletionActions.request({
          companyId: currentCompany.id,
        })
      );
    }
    // eslint-disable-next-line
  }, [currentCompany]);

  const currentMarketSector = marketSector ? marketSector : 'none';
  const isApprovedCompany = companyPlan?.isApprovedCompany || false;

  const generatedProps: LandingGeneratedProps = {
    credit: currentCompany?.credit,
    currentCompany,
    companyRelationship,
    companies,
    profilePicture,
    profileName,
    loadingUser,
    updatingImage,
    updateImage,
    logout,
    permission,
    accountCompletion,
    companyPlan,
    currentMarketSector,
    isApprovedCompany,
  };
  return <LandingView {...generatedProps} />;
};

export default Landing;
