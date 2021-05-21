import Interactions from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div``;

export const ListContainer = styled.div`
  margin: 24px auto;
`;

export const ListItemInteraction = styled(Interactions)`
  margin-top: 12px;

  .right-content-text {
    padding-top: 2px;
    font-size: ${pxToRem(15)};

    @media ${BREAKPOINTS['sm']} {
      font-size: 12px;
    }
  }
`;
