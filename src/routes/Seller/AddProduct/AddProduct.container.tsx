import React, { useState } from 'react';

import { AddProductGeneratedProps } from './AddProduct.props';
import AddProductView from './AddProduct.view';

const AddProduct = (): JSX.Element => {
  const [currentPage, setCurrentpage] = useState<number>(1);

  function onChangeCurrentPage(newPage: number) {
    if (newPage >= 1 && newPage <= 8) {
      setCurrentpage(newPage);
    }
  }

  const generatedProps: AddProductGeneratedProps = {
    currentPage,
    onChangeCurrentPage,
  };

  return <AddProductView {...generatedProps} />;
};

export default AddProduct;
