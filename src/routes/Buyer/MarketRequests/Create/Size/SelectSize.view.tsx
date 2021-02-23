import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { CreateStepProps } from '../Create.props';

const SelectSizeView = (props: CreateStepProps) => {
  const { step, stepCountComponent } = props;
  const history = useHistory();

  return <>{stepCountComponent}</>;
};

export default SelectSizeView;
