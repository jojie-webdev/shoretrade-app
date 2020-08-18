import React, { useState } from 'react';

import { DashboardLandingGeneratedProps } from './Landing.props';
import DashboardView from './Landing.view';

const Dashboard = (): JSX.Element => {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const toggleModal = () => setIsCalendarModalOpen(!isCalendarModalOpen);

  const generatedProps: DashboardLandingGeneratedProps = {
    // generated props here
    isCalendarModalOpen,
    toggleModal,
  };
  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
