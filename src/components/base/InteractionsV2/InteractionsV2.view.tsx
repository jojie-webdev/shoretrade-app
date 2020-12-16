import React from 'react';

import Badge from 'components/base/Badge';
import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import { ChevronRight, DropdownArrow, Pen } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { CategoryPayload } from 'types/store/GetCategories';
import { useTheme } from 'utils/Theme';

import { InteractionsProps } from './InteractionsV2.props';
import {
  Container,
  Value,
  Label,
  DropdownFlipped,
  IconContainer,
  BadgeContainer,
  BadgeItemContainer,
} from './InteractionsV2.style';
const InteractionsV2 = (props: InteractionsProps): JSX.Element => {
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
    customFontSize,
    fullWidth,
    keepIcon,
    arrayValue,
  } = props;

  const RightComponent = rightComponent;

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
      <div className="left-content">
        {label ? (
          <Label variant="overline" color="shade7">
            {label}
          </Label>
        ) : null}

        {leftComponent ? (
          leftComponent
        ) : (
          <>
            {value ? (
              <Value>{value}</Value>
            ) : arrayValue ? (
              <BadgeContainer>
                {arrayValue &&
                  arrayValue.map((selection: CategoryPayload) => {
                    return (
                      <BadgeItemContainer key={selection.id}>
                        <Badge badgeColor={theme.grey.shade3}>
                          <Typography variant="overline" color="shade9">
                            {selection.name}
                          </Typography>
                        </Badge>
                      </BadgeItemContainer>
                    );
                  })}
              </BadgeContainer>
            ) : null}
          </>
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
              variant="overline"
              weight="bold"
              color="shade6"
              style={{ marginRight: '8px', fontSize: customFontSize }}
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

export default React.memo(InteractionsV2);
