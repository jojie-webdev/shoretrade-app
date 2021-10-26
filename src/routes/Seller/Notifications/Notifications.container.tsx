import React, { useEffect, useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import { SELLER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteNotificationActions,
  readNotificationActions,
} from 'store/actions';
import { NotificationType, NotifName, NotifTitle } from 'types/store/GetNotificationsState';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import { notifURLMapper } from 'utils/Notification';

import NotificationsView from './Notifications.view';

const Notifications = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );

  const user = useSelector((state: Store) => state.getUser.data?.data.user);

  // Mark:- Variables
  const companies = user?.companies || [];

  const getNotifications = useSelector(
    (state: Store) => state.getNotifications
  );

  useEffect(() => {
    if (!loadingUser) {
      const c = companies || [];

      setCurrentCompany(c[0]);
    }
  }, [loadingUser]);

  const tabItems: TabItem[] = [
    {
      key: 0,
      title: 'All',
    },
    {
      key: 1,
      title: 'Unread',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabItems[0].key);
  const notifsData = getNotifications.data?.data?.notifications || [];
  const totalUnreadNotifs = getNotifications?.data?.data.unread || 0;
  const totalNotifs = getNotifications.data?.data?.total || 0;

  const handleMarkasRead = (notificationId: string) => {
    dispatch(readNotificationActions.request({ id: notificationId }));
  };

  const handleOnDelete = (notificationId: string) => {
    dispatch(deleteNotificationActions.request({ id: notificationId }));
  };

  const handleSelectTab = (key: number) => {
    history.push(`${SELLER_ROUTES.NOTIFICATIONS}?tab=${tabItems[key].title}`);
    setActiveTab(key);
  };

  const handleNotifOnClick = (
    resource: NotificationType,
    appType: 'seller' | 'buyer',
    name?: NotifName,
    title?: NotifTitle | string,
  ) => {
    const url = notifURLMapper(resource, appType, name, title);
    if (url != '') {
      history.push(url);
    }
  };

  const generatedProps = {
    tabItems,
    activeTab,
    currentCompany,
    handleSelectTab,
    notifsData,
    totalUnreadNotifs,
    totalNotifs,
    handleMarkasRead,
    handleOnDelete,
    handleNotifOnClick,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
