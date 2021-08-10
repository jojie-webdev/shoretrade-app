import Interactions from 'components/base/Interactions';
import styled from 'utils/styled';
import { BREAKPOINTS } from 'consts/breakpoints';

export const CategoryInteractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryInterAction = styled(Interactions)`
  margin-bottom: 12px;

  @media ${BREAKPOINTS['sm']} {
      border-radius: 12px;
    }
`;

export const EmptyContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 72px;
`;

export const TopAbsoContainer = styled.div`
  position: absolute;
  top: -10%;
  right: 0;
`;

export const TopGroupContainer = styled.div`
  position: absolute;
  top: 6%;
  right: 10%;
`;

export const BottomAbsoContainer = styled.div`
  position: absolute;
  bottom: -10%;
  right: -10%;
`;

export const BottomGroupContainer = styled.div`
  position: absolute;
  bottom: -2%;
  right: 0;
`;

export const LeftAbsoContainer = styled.div`
  position: absolute;
  bottom: -10%;
  left: -6%;
`;

export const LeftGroupContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
`;
