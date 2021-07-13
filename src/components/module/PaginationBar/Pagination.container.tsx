import React from 'react';

import { PaginationProps } from './Pagination.props';
import Pagination from './Pagination.view';

const PaginationContainer = (props: PaginationProps) => {
  return <Pagination {...props} />;
};

export default PaginationContainer;
