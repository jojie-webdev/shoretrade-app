import React from 'react';

// import { useTheme } from 'utils/Theme';

import { AddProductGeneratedProps } from './AddProduct.props';
import { Container } from './AddProduct.style';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const AddProductView = (props: AddProductGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      {/* <Step1 /> */}
      {/* <Step2 /> */}
      {/* <Step3 /> */}
      {/* <Step4 /> */}
      {/* <Step5 /> */}
      <Step6 />
    </Container>
  );
};

export default AddProductView;
