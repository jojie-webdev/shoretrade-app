import React from 'react';

// import { useTheme } from 'utils/Theme';
import Loading from 'components/module/Loading';
import SellerAssistantForm from 'components/module/SellerAssistantForm';

import { EditAssistantGeneratedProps } from './EditAssistant.props';
import { Container } from './EditAssistant.style';

const EditAssistantView = (props: EditAssistantGeneratedProps) => {
  const { pending, ...sellerFormProps } = props;

  // const theme = useTheme();

  if (pending) {
    return <Loading />;
  }

  return <SellerAssistantForm {...sellerFormProps} />;
};

export default EditAssistantView;
