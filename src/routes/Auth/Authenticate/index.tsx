import React, { useEffect } from 'react';

import { MAIN_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUser } from 'services/auth';
import { verifyActions } from 'store/actions';
import { Store } from 'types/store/Store';

const Authenticate = () => {
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const isAuthenticated =
    (useSelector((state: Store) => state.auth.token) || '').length > 0;

  useEffect(() => {
    if (!isAuthenticated && token) {
      getUser(token)
        .then(({ data }) => {
          if (data.status === 200 && data.message === 'User found') {
            dispatch(verifyActions.success(data));
          } else {
            history.push(MAIN_ROUTES.LOGIN);
          }
        })
        .catch((e) => {
          history.push(MAIN_ROUTES.LOGIN);
        });
    }
    // eslint-disable-next-line
  }, [token, isAuthenticated]);

  return <div />;
};

export default Authenticate;
