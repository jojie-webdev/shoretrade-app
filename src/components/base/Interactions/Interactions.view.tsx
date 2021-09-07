import React from 'react';

import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import { ChevronRight, DropdownArrow, Pen } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { InteractionsProps } from './Interactions.props';
import {
  Container,
  Value,
  Label,
  DropdownFlipped,
  IconContainer,
} from './Interactions.style';

const Interactions = (props: InteractionsProps): JSX.Element => {
  const theme = useTheme();
  const {
    type = 'next',
    value,
    pressed,
    label,
    onClick,
    leftComponent,
    rightComponent,
    iconAlignment = 'center',
    iconColor,
    children,
    resultCount,
    fullWidth,
    keepIcon,
    fontColor,
  } = props;

  const getIcon = () => {
    if (type === 'none') return <></>;

    if (type === 'accordion') {
      const Dropdown = () => (
        <DropdownArrow fill={iconColor || theme.grey.shade8} />
      );

      return pressed ? (
        <DropdownFlipped>
          <Dropdown />
        </DropdownFlipped>
      ) : (
        <Dropdown />
      );
    }

    if (type === 'edit') {
      return <Pen />;
    }

    if (type === 'radio') {
      return pressed ? <Radio checked /> : <Radio />;
    }

    if (type === 'checkbox') {
      return pressed ? <Checkbox checked /> : <Checkbox />;
    }

    return <ChevronRight width={8} height={12} />;
  };

  return (
    <Container className="interactions" {...props} onClick={onClick}>
      {label ? (
        <Label variant="overline" color="shade5">
          {label}
        </Label>
      ) : null}

      <div
        className="left-content"
        style={fullWidth ? { flex: 1 } : { width: '100%' }}
      >
        {leftComponent ? (
          leftComponent
        ) : (
          <>{value ? <Value fontColor={fontColor}>{value}</Value> : null}</>
        )}
        {children}
      </div>

      {rightComponent && !keepIcon ? (
        rightComponent
      ) : (
        <div className="right-content">
          {keepIcon && rightComponent}
          <IconContainer
            className="interactions-right"
            iconAlignment={iconAlignment}
          >
            <Typography
              className="right-content-text"
              variant="overline"
              weight="bold"
              color="shade6"
              style={{ marginRight: '8px' }}
            >
              {resultCount}
            </Typography>
            {getIcon()}
          </IconContainer>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Interactions);
