import React from 'react';

import { useHistory } from 'react-router';

import { MobileHeaderPublicProps } from './MobileHeader.props';
import MobileHeaderView from './MobileHeader.view';

const MobileHeader = (props: MobileHeaderPublicProps): JSX.Element => {
  const history = useHistory();

  const onBack = () => {
    if (props.onBackOverride) props.onBackOverride();
    else history.goBack();
  };

  const generatedProps = {
    onBack,
    ...props,
  };
  return <MobileHeaderView {...generatedProps} />;
};

export default MobileHeader;
