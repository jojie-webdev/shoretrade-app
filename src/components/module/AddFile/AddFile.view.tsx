// @ts-nocheck
import React, { useCallback } from 'react';

import { Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import isEmpty from 'ramda/es/isEmpty';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'utils/Theme';

import { AddFileProps } from './AddFile.props';
import {
  PreviewContainer,
  PreviewFile,
  DeleteBadge,
  FileDetailsContainer,
  UploadLink,
  UploadTitle,
  Error,
} from './AddFile.style';

const bytesToSize = (bytes) => {
  const sizes = ['Kb', 'Mb', 'Gb', 'Tb'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const AddFile = (props: AddFileProps): JSX.Element => {
  const { file, onSelectFile, onRemoveFile, fileName, error } = props;
  const theme = useTheme();
  const onDrop = useCallback((files) => {
    onSelectFile(files.length > 0 ? files[0] : null);
    // eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const renderTitle = () => (
    <UploadTitle>
      <Typography color="shade6" variant="label">
        Drag & Drop files here.
      </Typography>
      <Typography color="shade6" variant="label">
        Or <UploadLink>upload a file</UploadLink> from your computer.
      </Typography>
    </UploadTitle>
  );

  if (file !== null && file !== undefined && !isEmpty(file)) {
    return (
      <PreviewContainer>
        <div className="left-content">
          <PreviewFile
            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
            alt="Product Preview"
          />
          <FileDetailsContainer>
            {file.name && (
              <>
                <Typography variant="caption" color="noshade">
                  {file.name}
                </Typography>

                <div className="format-size">
                  <Typography
                    variant="small"
                    color="shade7"
                    className="filesize-text"
                  >
                    {bytesToSize(file.size)}
                  </Typography>
                  <Typography variant="small" color="shade7">
                    {file.type.toUpperCase().replace('IMAGE/', '')} Format
                  </Typography>
                </div>
              </>
            )}
            {fileName && (
              <Typography variant="caption" color="noshade">
                {fileName}
              </Typography>
            )}
          </FileDetailsContainer>
        </div>

        <DeleteBadge onClick={() => onRemoveFile()}>
          <Subtract innerFill={theme.grey.shade9} fill={theme.brand.error} />
        </DeleteBadge>
      </PreviewContainer>
    );
  }
  return (
    <div {...getRootProps()}>
      <Add
        onClickFile={onSelectFile}
        customTitle={renderTitle()}
        inputProps={getInputProps()}
        error={!!error}
      />
      {error && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </div>
  );
};

export default React.memo(AddFile);
