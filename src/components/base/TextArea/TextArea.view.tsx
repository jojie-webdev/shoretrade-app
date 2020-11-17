import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';

import { TextAreaProps } from './TextArea.props';
import { Container, Field } from './TextArea.style';

const TextArea = (props: TextAreaProps): JSX.Element => {
  // const theme = useTheme();
  const {
    label,
    value,
    onChange,
    onChangeText,
    autoHeight,
    height,
    ...textAreaProps
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(event);
    onChangeText && onChangeText(event.target.value);
  };

  return (
    <Container>
      {(label || '').length > 0 && (
        <Typography variant={'overline'} color={'shade6'}>
          {label}
        </Typography>
      )}
      <Field
        {...textAreaProps}
        value={value}
        onChange={handleChange}
        height={
          autoHeight
            ? ((value || '').split('\n').length - 1) * 24 + 48
            : props.height
        }
      ></Field>
    </Container>
  );
};

export default React.memo(TextArea);
