import React from 'react';

import Button from 'components/base/Button';
import ProgressBar from 'components/base/ProgressBar';
import { TrashCan } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { MarketRequestDetailPillProps } from './MarketRequestDetailPill.props';
import {
  Container,
  DeleteButtonContainer,
  RequestDetailsMobileContainer,
} from './MarketRequestDetailPill.style';

const MarketRequestDetailPill = (
  props: MarketRequestDetailPillProps
): JSX.Element => {
  const theme = useTheme();
  const {
    expiry,
    imgUrl,
    countAcceptedWeight,
    weight,
    measurementUnit,
    onClickDelete,
  } = props;

  const calculatePercentage = () => {
    const percentage = (100 * countAcceptedWeight) / (weight?.to || 0) || 0;

    return percentage;
  };

  return (
    <Container>
      <RequestDetailsMobileContainer>
        <div className="thumbnail-container">
          <img src={parseImageUrl(imgUrl || '')} />
        </div>

        <div style={{ width: '100%', margin: 'auto' }}>
          <Typography
            variant="copy"
            weight="400"
            color="shade9"
            style={{ fontFamily: 'Basis Grotesque Pro', marginBottom: '3px' }}
          >
            {countAcceptedWeight}
            <span style={{ color: theme.grey.shade5 }}>
              /{weight?.to} {measurementUnit.toLowerCase()}
            </span>
          </Typography>

          <div style={{ paddingRight: '16px' }}>
            <ProgressBar progress={calculatePercentage()} />
          </div>

          <Typography
            margin="12px 0px 0px 0px"
            color="shade6"
            variant="caption"
            weight="400"
          >
            {expiry}
          </Typography>
        </div>

        <DeleteButtonContainer>
          <Button
            iconPosition="before"
            icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
            onClick={onClickDelete}
            variant="primary"
            size="sm"
            className="delete-button"
          />
        </DeleteButtonContainer>
      </RequestDetailsMobileContainer>
    </Container>
  );
};

export default React.memo(MarketRequestDetailPill);
