import React from 'react';

import {
  CheckFilled,
  ExclamationFilled,
  InfoFilled,
  QuestionFilled,
} from 'components/base/SVG';
import { SVGProps } from 'components/base/SVG/SVG.props';
import Typography from 'components/base/Typography';
import ReactTooltip from 'react-tooltip';
import { useTheme } from 'utils/Theme';
import { v1 } from 'uuid';

import { IconTooltipProps } from './IconTooltip.props';
import { Container, StyledContent } from './IconTooltip.style';

const IconTooltip = (props: IconTooltipProps): JSX.Element => {
  const theme = useTheme();
  const {
    variant,
    content,
    iconSize = 18,
    placement = 'bottom',
    placementOffset,
    iconFill,
    label,
    labelColor,
  } = props;
  let Icon: React.FC<SVGProps> = InfoFilled;
  let IconFill = '';

  const tooltipId = v1();

  if (variant === 'info') {
    Icon = InfoFilled;
    IconFill = iconFill || theme.brand.info;
  } else if (variant === 'alert') {
    Icon = QuestionFilled;
    IconFill = iconFill || theme.brand.alert;
  } else if (variant === 'warning') {
    Icon = ExclamationFilled;
    IconFill = iconFill || theme.brand.warning;
  } else if (variant === 'error') {
    Icon = ExclamationFilled;
    IconFill = iconFill || theme.brand.error;
  } else if (variant === 'success') {
    Icon = CheckFilled;
    IconFill = iconFill || theme.brand.success;
  }

  return (
    <Container className="tooltip-container">
      <div
        className="icon-label-wrapper"
        data-tip
        data-for={tooltipId}
        data-background-color={theme.grey.shade10}
        data-effect="solid"
        data-place={placement}
        data-offset={placementOffset}
      >
        {IconFill && (
          <Icon width={iconSize} height={iconSize} fill={IconFill} />
        )}
        {label && (
          <Typography variant="label" color={labelColor || 'noshade'}>
            {label}
          </Typography>
        )}
      </div>
      <ReactTooltip aria-haspopup="true" id={tooltipId}>
        {typeof content === 'string' ? (
          <StyledContent align="center" color="noshade">
            {content}
          </StyledContent>
        ) : (
          <div className="tooltip-content-container">{content}</div>
        )}
      </ReactTooltip>
    </Container>
  );
};

export default React.memo(IconTooltip);
