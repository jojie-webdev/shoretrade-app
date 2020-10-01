import React from 'react';

import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import { ChevronRight, DropdownArrow, Pen } from 'components/base/SVG';
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
    children,
  } = props;

  const getIcon = () => {
    if (type === 'accordion') {
      const Dropdown = () => <DropdownArrow fill={theme.grey.shade8} />;

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

      <div className="left-content">
        {leftComponent ? (
          leftComponent
        ) : (
          <>{value ? <Value>{value}</Value> : null}</>
        )}
        {children}
      </div>

      {rightComponent ? (
        rightComponent
      ) : (
        <IconContainer
          className="interactions-right"
          iconAlignment={iconAlignment}
        >
          {getIcon()}
        </IconContainer>
      )}
    </Container>
  );
};

export default React.memo(Interactions);
