import React from 'react';

// import { useTheme } from 'utils/Theme';

import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';

import { AddProductGeneratedProps } from './AddProduct.props';
import { Container } from './AddProduct.style';
import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';
import Step5 from './Step5/Step5';
import Step6 from './Step6/Step6';
import Step7 from './Step7/Step7';
import Step8 from './Step8/Step8';

const AddProductView = (props: AddProductGeneratedProps) => {
  // const theme = useTheme();

  const { currentPage, onChangeCurrentPage } = props;

  const currentStep = () => {
    switch (currentPage) {
      case 1:
        return <Step1 onClickNext={() => onChangeCurrentPage(2)} />;
      case 2:
        return <Step2 onClickNext={() => onChangeCurrentPage(3)} />;
      case 3:
        return <Step3 onClickNext={() => onChangeCurrentPage(4)} />;
      case 4:
        return <Step4 onClickNext={() => onChangeCurrentPage(5)} />;
      case 5:
        return <Step5 onClickNext={() => onChangeCurrentPage(6)} />;
      case 6:
        return <Step6 onClickNext={() => onChangeCurrentPage(7)} />;
      case 7:
        return <Step7 onClickNext={() => onChangeCurrentPage(8)} />;
      case 8:
        return <Step8 onClickNext={() => console.log('Submitted!')} />;

      default:
        return <Step1 onClickNext={() => onChangeCurrentPage(2)} />;
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="overline" color="shade6">
          Step {currentPage} / 8
        </Typography>
        <InnerRouteHeader
          title="Product Type"
          onClickBack={() => onChangeCurrentPage(currentPage - 1)}
          showIcon={currentPage !== 1}
        />
      </div>
      {currentStep()}
    </Container>
  );
};

export default AddProductView;
