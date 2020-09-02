import React from 'react';

// import { useTheme } from 'utils/Theme';
import { CategoriesPreviewGeneratedProps } from './Preview.props';
import { PreviewContainer } from './Preview.style';

const CategoriesPreviewView = (props: CategoriesPreviewGeneratedProps) => {
  // const theme = useTheme();
  return (
    <PreviewContainer>
      <h1>CategoriesPreview Screen</h1>
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
