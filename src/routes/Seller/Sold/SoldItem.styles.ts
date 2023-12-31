import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const StyledInteraction = styled(Interaction)<{
  pressed?: boolean;
  accordionButtonStyle?: boolean;
}>`
  margin-bottom: ${({ pressed }) => (pressed ? '0' : '8px')};
  padding: 16px 24px;

  > .left-content,
  .top-content > .left-content {
    width: 100%;
  }

  @media ${BREAKPOINTS.sm} {
    padding: 16px;

    > .left-content,
    .top-content > .left-content {
      padding-right: 0 !important;
      width: 95%;
    }

    > .right-content,
    > .top-content {
      align-items: flex-start;
    }

    .content > .right-content {
      width: unset;
    }

    .bottom-content {
      margin-top: 10px;

      > div > p {
        margin-top: 8px;
      }

      .order-count {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 8px;
        background-color: ${({ theme }) => theme.grey.shade8};
        border-radius: 8px;
        min-width: 85px;
      }
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

  ${({ accordionButtonStyle, theme }) => {
    if (accordionButtonStyle) {
      return `
        > .right-content {
          .interactions-right {
            width: 40px;
            height: 40px;
            border: 2px solid ${theme.grey.shade8};
            border-radius: 8px;
            margin-left: 24px;
            background: ${theme.grey.shade10};

            p {
              display: none;
            }
          }
        }
      `;
    }
  }}

  .content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    .left-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        display: flex;
        align-items: center;
        margin-right: 8px;

        svg {
          margin-right: 4px;
        }
      }

      @media ${BREAKPOINTS.genericTablet} {
        max-width: 370px;
      }

      @media ${BREAKPOINTS.sm} {
        flex-direction: column;
        align-items: flex-start;

        .label {
          align-items: flex-start;
        }
      }
    }

    .right-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 1237px) {
        justify-content: flex-start;
        margin-left: 8px;
      }

      @media ${BREAKPOINTS.sm} {
        margin-left: 0;
      }

      .order-count {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 8px;
        background-color: ${({ theme }) => theme.grey.shade8};
        border-radius: 8px;
        min-width: 85px;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        border-radius: 8px;

        &:not(:first-of-type) {
          margin-left: 8px;
        }

        @media ${BREAKPOINTS.sm} {
          flex: 0 1 auto;
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

  .order-details {
    display: flex;
    align-items: center;
  }

  @media ${BREAKPOINTS.sm} {
    .bottom-content {
      .order-count {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }

    .content {
      flex-direction: column;
      align-items: flex-start;

      .right-content {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        .order-count {
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .order-details {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
      }

      .buttons {
        width: 100%;
      }
    }
  }

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
  background: ${(props) => props.theme.grey.shade9};
  padding: 12px;
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

    @media ${BREAKPOINTS['sm']} {
      flex-direction: column;
    }
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
      margin-left: 0;
      justify-content: flex-end;
      flex: 1;
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
      flex: 0 1 auto;

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
        margin-top: 8px;
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

  margin-left: 24px;

  @media (max-width: 662px) {
    margin-left: 16px;
  }

  @media ${BREAKPOINTS.sm} {
    margin-left: 0;
  }

  span {
    color: ${(props) => props.theme.grey.noshade};
    margin-left: ${(props) => (props.row ? '8px' : '0')};
    line-height: 24px;
  }
`;

export const Tag = styled.div<{
  background?: string;
}>`
  background: ${({ background }) => background || 'none'};
  padding: 5px 8px 2px 8px;
  margin-right: 8px;
  border-radius: 8px;
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
    width: 48px;
  }
`;

export const InvoiceContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.shade3};
  position: absolute;
  z-index: 1;
  border-radius: 10px;
  padding: 12px 24px;
  min-width: 220px;
  bottom: 35px;
`;
