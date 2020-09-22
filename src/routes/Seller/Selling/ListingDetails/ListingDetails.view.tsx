import React from 'react';

import { FileCheck, ChevronRight, Scale } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { API } from 'consts';
import { useTheme } from 'utils/Theme';

import { ListingDetailsProps } from './ListingDetails.props';
import { Wrapper } from './ListingDetails.style';

const ListingDetailsView = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const { listing } = props;

  return <Wrapper></Wrapper>;
};

export default ListingDetailsView;
