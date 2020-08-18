import React, { useState } from 'react';

import { DashboardGeneratedProps } from './Dashboard.props';
import DashboardView from './Dashboard.view';

const Dashboard = (): JSX.Element => {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const toggleModal = () => setIsCalendarModalOpen(!isCalendarModalOpen);

  const generatedProps: DashboardGeneratedProps = {
    // generated props here
    isCalendarModalOpen,
    toggleModal,
  };
  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
