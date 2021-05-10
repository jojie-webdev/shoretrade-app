import { BREAKPOINTS } from 'consts/breakpoints';
import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { InfoFilled } from '../SVG';
import { SVGProps } from '../SVG/SVG.props';
import { SegmentedControlsV2Props } from './SegmentedControlsV2.props';
import { Container, ControlButton } from './SegmentedControlsV2.style';
const SegmentedControlsV2 = (props: SegmentedControlsV2Props): JSX.Element => {
  // const theme = useTheme();

  const { options, selectedOption, onClickControl, tooltips, children } = props;
  const Icon: React.FC<SVGProps> = InfoFilled;
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <div className='controls'>
        {options.map((option) => {
          const currentTooltip = tooltips?.find((t) => t.option === option);
          const value = currentTooltip ? currentTooltip.value : '';

          return (
            <ControlButton key={option} active={option === selectedOption} onClick={() => onClickControl(option)}>
              {option}
              {value && (
                <div className='tooltip'>
                  <Icon width={20} height={20} fill={option === selectedOption ? theme.grey.noshade : theme.brand.info} />
                  <span className='tooltip-text'>{value}</span>
                </div>
              )}
            </ControlButton>
          );
        })}
      </div>
      <div className='search-row'>{children}</div>
    </Container>
  );
};

export default React.memo(SegmentedControlsV2);
