import React from 'react';

import { Search as SearchSVG, CloseFilled } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { SearchProps } from './Search.props';
import { InputContainer } from './Search.style';
const Search = (props: SearchProps): JSX.Element => {
  const theme = useTheme();
  const {
    value,
    resetValue,
    rounded,
    className,
    style,
    darkMode,
    ...inputProps
  } = props;

  return (
    <InputContainer
      style={style}
      className={className}
      rounded={rounded}
      darkMode={darkMode}
      title={inputProps.placeholder}
    >
      <div>
        <SearchSVG height={16} width={16} fill={theme.grey.shade7} />
      </div>
      <input
        className="search__input"
        type="text"
        {...inputProps}
        value={value}
      />
      {resetValue && value && (
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

export default React.memo(Search);
