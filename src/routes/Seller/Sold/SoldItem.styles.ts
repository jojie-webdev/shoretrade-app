import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const StyledInteraction = styled(Interaction)<{
  pressed?: boolean;
  columnedRightContent?: boolean;
}>`
  margin-bottom: ${({ pressed }) => (pressed ? '0' : '8px')};
  padding: 16px 24px;

  @media ${BREAKPOINTS.sm} {
    padding: 16px;

    > .left-content {
      padding-right: 0 !important;
    }

    > .right-content {
      align-items: flex-start;
    }
  }

  ${({ pressed }) => {
    if (pressed) {
      return `
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `;
    }
  }}

  > .left-content {
    flex: 1;
  }

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

      .label {
        display: flex;
        align-items: center;
      }

      @media (max-width: 1440px) {
        width: 200px;
      }

      @media ${BREAKPOINTS.sm} {
        flex-direction: column;
        align-items: flex-start;
      }

      .order-count {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 8px;
        background-color: ${({ theme }) => theme.grey.shade8};
        border-radius: 8px;

        @media ${BREAKPOINTS['sm']} {
          margin-top: 8px;
          margin-bottom: 8px;
        }
      }
    }

    .left-content-extended {
      width: 316px;

      @media ${BREAKPOINTS['sm']} {
        width: 240px;
      }
    }

    .right-content {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 210px;
      flex-direction: ${({ columnedRightContent }) =>
        columnedRightContent ? 'column' : 'row'};

      @media ${BREAKPOINTS.genericTablet} {
        width: 195px;
      }

      @media (max-width: 1237px) {
        justify-content: flex-start;
        margin-left: 8px;
      }

      @media ${BREAKPOINTS.sm} {
        margin-left: 0;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;

      button {
        border-radius: 8px;

        &:not(:first-of-type) {
          margin-left: 8px;
        }

        @media ${BREAKPOINTS.sm} {
          flex: 1;
          margin-top: 8px;
        }
      }

      .ship-order {
        &:disabled {
          background: ${(props) => props.theme.grey.shade3};
          cursor: not-allowed;
          opacity: 1;

          p {
            color: ${(props) => props.theme.grey.shade6};
          }
        }

        @media ${BREAKPOINTS['iPad']} {
          margin-right: -8px;
        }
      }

      @media ${BREAKPOINTS['xl']} {
        margin-right: 8px;
        justify-content: center;
        > button {
          margin-left: 190px;
        }
      }
    }

    .center-text {
      margin: 0 4px;
      display: flex;
      align-items: flex-start;

      svg {
        width: 18px;
        height: 18px;
        min-height: 18px;
        min-width: 18px;
        padding-top: 3px;
      }

      p:not(:first-child) {
        margin-left: 4px;
      }
    }

    .title-text {
      font-size: ${pxToRem(16)};
    }
  }
`;

export const InnerStyledInteraction = styled(StyledInteraction)`
  min-height: 60px;
  padding: 10px 24px;
  background: ${(props) => props.theme.grey.shade10};
  border: 1px solid ${(props) => props.theme.grey.shade8};

  ${({ pressed }) => {
    if (pressed) {
      return `
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      `;
    }
  }}
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.25s ease-in-out;
  transform-origin: top;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  background: ${(props) => props.theme.grey.shade9};
`;

export const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ItemCard = styled.div`
  min-height: 144px;
  background: ${(props) => props.theme.grey.shade9};
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.grey.shade8};
  border-radius: 8px;

  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1;

  :hover {
    cursor: pointer;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .title {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;

    p:not(:first-child) {
      margin-left: 4px;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
  }

  .left-content {
    display: flex;
    align-items: center;
    width: 300px;

    @media ${BREAKPOINTS['sm']} {
      width: 240px;
    }

    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      margin: 2px 0;
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    width: 210px;
    padding: 16px 0px;
    justify-content: space-evenly;

    @media ${BREAKPOINTS['sm']} {
      width: 240px;
    }

    @media (max-width: 1024px) {
      width: auto;
    }

    /* @media (max-width: 1237px) {
      margin-left: 72px;
    } */
  }

  .right-content-alternate {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    flex: 1;
    padding: 16px 0px;
    flex-wrap: wrap;

    @media ${BREAKPOINTS['sm']} {
      display: none;
    }

    .data-content {
      display: flex;
      min-width: 120px;
      flex: 1;
      padding: 4px 16px;
    }

    .data-fisherman {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    @media ${BREAKPOINTS.sm} {
      flex-direction: column-reverse;
      align-items: flex-start;

      > button {
        margin-top: 8px;
        margin-bottom: 8px;
        flex: 1;
        width: 100% !important;
      }
    }

    .downloads-menu {
      background-color: ${({ theme }) => theme.grey.shade9};
      border-radius: 4px;
      display: flex;
      align-items: center;

      @media ${BREAKPOINTS.sm} {
        align-items: flex-start;
        flex-direction: column;
      }

      button {
        border: 0;
        padding: 4px 8px;

        p {
          font-weight: 500;
        }
      }

      button:not(:first-of-type) {
        margin-left: 16px;
      }

      @media ${BREAKPOINTS.sm} {
        button:not(:first-of-type) {
          margin-top: 8px;
          margin-left: 0;
        }
      }
    }
  }
`;

export const ItemImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};

  margin-right: 16px;
  border-radius: 4px;
`;

export const ItemDetail = styled(Typography)<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  align-items: ${(props) => (props.row ? 'center' : 'flex-start')};

  width: 100%;
  white-space: nowrap;
  line-height: 16px;

  margin-right: 56px;

  @media (max-width: 662px) {
    margin-right: 16px;
  }

  @media ${BREAKPOINTS.sm} {
    margin-right: 0;
  }

  span {
    color: ${(props) => props.theme.grey.noshade};
    margin-left: ${(props) => (props.row ? '8px' : '0')};
    line-height: 24px;
  }
`;

export const Tag = styled.div`
  /* background: ${(props) => props.theme.grey.shade8}; */
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const Spacer = styled.div`
  width: 0px;
  @media (min-width: 1300px) {
    width: 25px;
  }

  @media (min-width: 1500px) {
    width: 232px;
  }

  @media (min-width: 1600px) {
    width: 332px;
  }
`;
