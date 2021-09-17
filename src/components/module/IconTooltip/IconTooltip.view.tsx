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

import { IconTooltipProps } from './IconTooltip.props';
import { Container, StyledContent } from './IconTooltip.style';

const IconTooltip = (props: IconTooltipProps): JSX.Element => {
  const theme = useTheme();
  const { variant, content } = props;
  let Icon: React.FC<SVGProps> = InfoFilled;
  let IconFill = '';

  if (variant === 'info') {
    Icon = InfoFilled;
    IconFill = theme.brand.info;
  } else if (variant === 'alert') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (variant === 'warning') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.warning;
  } else if (variant === 'error') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.error;
  } else if (variant === 'success') {
    Icon = CheckFilled;
    IconFill = theme.brand.success;
  }

  return (
    <Container>
      <div
        data-tip
        data-for="tooltip"
        data-background-color={theme.grey.shade10}
        data-effect="solid"
        data-place="bottom"
      >
        <Icon width={18} height={18} fill={IconFill} />
      </div>
      <ReactTooltip aria-haspopup="true" id="tooltip">
        <StyledContent align="center" color="noshade">
          {content}
        </StyledContent>
      </ReactTooltip>
    </Container>
  );
};

export default React.memo(IconTooltip);
