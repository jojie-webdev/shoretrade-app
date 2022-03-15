import React, { useEffect } from 'react';

import 'react-dropdown/style.css';

import { DropdownArrow } from 'components/base/SVG';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { SelectProps } from './Select.props';
import {
  Container,
  Label,
  PREFIX,
  ArrowContainer,
  StyledDropdown,
  Error,
} from './Select.style';

const Select = ({
  label,
  error,
  border,
  background,
  marginTop,
  borderRadius,
  arrowIcon,
  isMulti,
  customMenu,
  customOpenMenu,
  labelTooltip,
  ...props
}: SelectProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    const divElem = document.getElementById(`${label}-dropdown`);
    divElem?.addEventListener(
      isMobile ? 'touchstart' : 'click',
      () => customOpenMenu && customOpenMenu()
    );
  }, []);

  return (
    <Container label={label} marginTop={marginTop}>
      {label ? (
        <Label variant="overline" color="shade6">
          {label}
          {labelTooltip}
        </Label>
      ) : null}
      <div id={`${label}-dropdown`}>
        <StyledDropdown
          border={border}
          borderRadius={borderRadius}
          background={background}
          marginTop={marginTop}
          hiddenMenu={isMulti}
          {...props}
          unbordered={props.unbordered}
          controlClassName={
            props.size === 'small'
              ? `${PREFIX}ContainerThin`
              : `${PREFIX}Container`
          }
          placeholderClassName={`${PREFIX}Placeholder`}
          menuClassName={`${PREFIX}Menu`}
          arrowClosed={
            <ArrowContainer size={props.size}>
              {arrowIcon ? (
                arrowIcon
              ) : (
                <DropdownArrow
                  // fill={props.disabled ? theme.grey.shade6 : theme.brand.primary}
                  fill={
                    props.disabled
                      ? theme.grey.shade6
                      : theme.appType === 'buyer'
                      ? theme.brand.primary
                      : theme.grey.shade7
                  }
                />
              )}
            </ArrowContainer>
          }
          arrowOpen={
            <ArrowContainer size={props.size} flipped>
              {arrowIcon ? (
                arrowIcon
              ) : (
                <DropdownArrow
                  fill={
                    theme.appType === 'buyer'
                      ? theme.brand.primary
                      : theme.grey.shade7
                  }
                />
              )}
            </ArrowContainer>
          }
        />
      </div>
      {customMenu}

      {(error || '').length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </Container>
  );
};

export default React.memo(Select);
