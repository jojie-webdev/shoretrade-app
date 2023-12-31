import React from 'react';

import Badge from 'components/base/Badge';
import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import { ChevronRight, DropdownArrow, Pen } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { SpecialColors } from 'utils/SFMTheme';
import { useTheme } from 'utils/Theme';

import { InteractionsProps } from './Interactions.props';
import {
  Container,
  Value,
  Label,
  DropdownFlipped,
  IconContainer,
  PlusContainer,
} from './Interactions.style';

const Interactions = (props: InteractionsProps): JSX.Element => {
  const theme = useTheme();
  const {
    type = 'next',
    value,
    badge,
    pressed,
    label,
    onClick,
    leftComponent,
    rightComponent,
    bottomComponent,
    iconAlignment = 'center',
    iconColor,
    children,
    resultCount,
    fullWidth,
    keepIcon,
    fontColor,
    customIcon,
    showEmptyIndicator,
    disabled,
  } = props;

  const getIcon = () => {
    if (customIcon) return customIcon;

    if (type === 'none') return <div style={{ padding: '0px 5px' }} />;

    if (type === 'accordion') {
      const Dropdown = () => (
        <DropdownArrow
          fill={
            iconColor || theme.isSFM ? SpecialColors.blue : theme.grey.shade8
          }
        />
      );

      return pressed ? (
        <DropdownFlipped>
          <Dropdown />
        </DropdownFlipped>
      ) : (
        <Dropdown />
      );
    }

    if (type === 'plus') {
      return (
        <PlusContainer>
          <p>{pressed ? '-' : '+'}</p>
        </PlusContainer>
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

    return (
      <ChevronRight
        width={8}
        height={12}
        fill={theme.isSFM ? theme.grey.shade7 : theme.brand.primary}
      />
    );
  };

  const renderLeftContent = () => (
    <div className="left-content" style={{ paddingRight: '16px' }}>
      {leftComponent ? (
        leftComponent
      ) : (
        <>
          {value ? (
            <>
              <Value fontColor={fontColor}>{value}</Value>{' '}
              {badge ? (
                <Badge
                  fontSize="14px"
                  badgeColor="#DFE9F5"
                  fontColor="#30347E"
                  fontWeight="600"
                >
                  {badge}
                </Badge>
              ) : null}
            </>
          ) : showEmptyIndicator ? (
            <Value fontColor={theme.brand.alert}>Not Entered</Value>
          ) : null}
        </>
      )}
      {children}
    </div>
  );

  const renderRightContent = () =>
    rightComponent && !keepIcon ? (
      rightComponent
    ) : (
      <div className="right-content">
        {keepIcon && rightComponent}
        {disabled ? null : (
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
        )}
      </div>
    );

  if (type === 'radio') {
    return (
      <Container className="interactions" {...props} onClick={onClick}>
        {label ? (
          <Label variant="overline" color="shade5">
            {label}
          </Label>
        ) : null}
        <>
          <div
            className="left-content left-radio"
            style={
              fullWidth ? { flex: 1 } : { width: '100%', paddingRight: '16px' }
            }
          >
            {keepIcon && rightComponent}
            <IconContainer iconAlignment={iconAlignment}>
              {getIcon()}
              <>
                {value ? (
                  <Value style={{ paddingLeft: '16px' }} fontColor={fontColor}>
                    {value}
                  </Value>
                ) : null}
              </>
            </IconContainer>
            <div style={{ paddingLeft: '16px' }}>{children}</div>
          </div>
          <div>{rightComponent}</div>
        </>
      </Container>
    );
  }

  return (
    <Container
      className="interactions"
      {...props}
      onClick={disabled ? undefined : onClick}
    >
      {label ? (
        <Label variant="overline" color="shade5">
          {label}
        </Label>
      ) : null}

      {bottomComponent ? (
        <>
          <div className="top-content">
            {renderLeftContent()}
            {renderRightContent()}
          </div>
          <div className="bottom-content">{bottomComponent}</div>
        </>
      ) : (
        <>
          {renderLeftContent()}
          {renderRightContent()}
        </>
      )}
    </Container>
  );
};

export default React.memo(Interactions);
