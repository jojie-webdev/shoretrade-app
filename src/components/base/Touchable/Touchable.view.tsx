import React from 'react';

// import { useTheme } from 'utils/Theme';
import { TouchableProps } from './Touchable.props';
import { TouchableBase } from './Touchable.style';

const Touchable = (props: TouchableProps): JSX.Element => {
  // const theme = useTheme();
  const {
    children,
    onPress,
    width,
    height,
    circle,
    dark,
    className,
    justifyContent,
  } = props;
  return (
    <TouchableBase
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (onPress) {
          onPress();
        }
      }}
      width={width}
      height={height}
      circle={circle}
      dark={dark}
      className={className}
      justifyContent={justifyContent}
    >
      {children}
    </TouchableBase>
  );
};

export default React.memo(Touchable);
