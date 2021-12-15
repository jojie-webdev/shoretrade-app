import Interaction from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const ItemRow = styled(Row)``;

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 8px;
  padding: 16px 24px;

  .content {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;

    .left-content {
      display: flex;
      align-items: center;
      width: 292px;
      justify-content: space-between;
      padding-right: 32px;

      @media ${BREAKPOINTS['sm']} {
        width: 240px;
      }

      .order-count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 28px;
        background-color: ${({ theme }) => theme.grey.shade8};

        p {
          font-size: 11px;
        }
      }
    }

    .left-content-extended {
      width: 350px;

      @media ${BREAKPOINTS['sm']} {
        width: 240px;
      }
    }

    .center-text {
      margin: 0 4px;
      display: flex;

      p:not(:first-child) {
        margin-left: 4px;
      }
    }

    .title-text {
      font-size: ${pxToRem(16)};
    }
  }
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.25s ease-in-out;
  transform-origin: top;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
`;
