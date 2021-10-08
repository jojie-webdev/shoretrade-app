import Typography from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  width: 100%;
  align-items: flex-start !important;
  display: flex;

  #status-badge {
    margin: 0px;

    @media (min-width: 993px) {
      margin: auto;
    }
  }
`;

export const StatusBadgeText = styled(Typography)`
  font-size: ${pxToRem(9)};
  text-align: center;
  white-space: break-spaces;
`;

export const NoActionsYetBadgesContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1480px) {
    flex-flow: column !important;
  }

  @media (max-width: 991px) {
    display: -webkit-inline-box !important;
  }
`;
