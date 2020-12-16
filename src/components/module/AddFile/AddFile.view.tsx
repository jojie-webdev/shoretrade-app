import React from 'react';

import { FileCheck, Subtract } from 'components/base/SVG';
import Add from 'components/module/Add';
import isEmpty from 'ramda/es/isEmpty';
import { useTheme } from 'utils/Theme';

import { AddFileProps } from './AddFile.props';
import {
  PreviewContainer,
  PreviewImage,
  DeleteBadge,
  DeleteText,
} from './AddFile.style';

const AddFile = (props: AddFileProps): JSX.Element => {
  const theme = useTheme();
  const { file, onSelectFile, onRemoveFile } = props;

  if (file !== null && file !== undefined && !isEmpty(file)) {
    return (
      <PreviewContainer>
        {/* 
        // TODO: Show File Icon
        <PreviewImage
          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          alt="Product Preview"
        /> */}
        <DeleteBadge onClick={() => onRemoveFile()}>
          <Subtract innerFill={theme.brand.error} fill={theme.grey.noshade} />
          <DeleteText color="shade2" variant="label">
            Delete
          </DeleteText>
        </DeleteBadge>
      </PreviewContainer>
    );
  }
  return <Add onClickFile={onSelectFile} title="Add a File" Svg={FileCheck} />;
};

export default React.memo(AddFile);
