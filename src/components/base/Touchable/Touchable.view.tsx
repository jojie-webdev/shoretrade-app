import React from 'react';

// import { useTheme } from 'utils/Theme';
import { TouchableProps } from './Touchable.props';
import { TouchableBase } from './Touchable.style';

const Touchable = (props: TouchableProps): JSX.Element => {
  // const theme = useTheme();
  const { children, onPress } = props;
  return <TouchableBase onClick={onPress}>{children}</TouchableBase>;
};

export default React.memo(Touchable);
