import React from 'react';

import { Search as SearchSVG, CloseFilled } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { SearchV2Props } from './SearchV2.props';
import { InputContainer } from './SearchV2.style';
const SearchV2 = (props: SearchV2Props): JSX.Element => {
  const theme = useTheme();
  const { value, resetValue, rounded, className, style, ...inputProps } = props;

  return (
    <InputContainer style={style} className={className} rounded={rounded}>
      <SearchSVG
        height={16}
        width={16}
        fill={theme.appType === 'buyer' ? undefined : theme.grey.shade7}
      />
      <input type="text" {...inputProps} value={value} />
      {resetValue && (
        <div onClick={resetValue} className="close-svg-container">
          <CloseFilled
            fill={value.length === 0 ? theme.grey.shade3 : theme.grey.shade6}
            height={20}
            width={20}
          />
        </div>
      )}
    </InputContainer>
  );
};

export default React.memo(SearchV2);
