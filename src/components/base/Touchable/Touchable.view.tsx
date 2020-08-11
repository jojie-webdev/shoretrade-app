import React from 'react';

// import { useTheme } from 'utils/Theme';
import { TouchableProps } from './Touchable.props';
import { TouchableBase } from './Touchable.style';

const Touchable = (props: TouchableProps): JSX.Element => {
  // const theme = useTheme();
  const { children, onPress, width, height, circle, dark, className } = props;
  return (
    <TouchableBase
      onClick={onPress}
      width={width}
      height={height}
      circle={circle}
      dark={dark}
      className={className}
    >
      {children}
    </TouchableBase>
  );
};

export default React.memo(Touchable);
