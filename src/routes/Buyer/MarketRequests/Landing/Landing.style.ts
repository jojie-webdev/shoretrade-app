import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const MarketRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 16px;

  @media ${BREAKPOINTS['sm']} {
    height: auto;
    padding-bottom: 125px;
  }

  .header {
    margin-bottom: 24px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const MarketRequestItemInteraction = styled(Interactions)`
  justify-content: initial;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px;
  @media ${BREAKPOINTS['sm']} {
    padding: 12px;
  }
  padding-right: 12px;
  align-items: center;

  .left-content {
    flex-grow: 2;
  }
`;

export const MarketRequestItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  .thumbnail-container {
    margin-right: 1rem;

    img {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      @media ${BREAKPOINTS['sm']} {
        width: 40px;
        height: 40px;
      }
    }
  }

  .sub-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .info-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;

    .time {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
    }

    .offers-badge,
    .offers-status {
      margin: 0;
      width: fit-content;
      border-radius: 8px;
    }

    .offers-status {
    }

    .delete-button {
      background-color: ${({ theme }) => theme.grey.shade3};
      height: 32px;
      width: 32px;
      border-radius: 12px;
      align-self: center;

      path {
        fill: ${({ theme }) => theme.grey.shade7};
      }
    }
  }
`;

export const SubText = styled(TypographyView)`
  background-color: #EAFFF9;
  font-family: 'Basis Grotesque Pro';
  font-weight: 400;
  color: ${(props) => `${props.theme.grey.shade7}`};
`;

export const BadgeText = styled(TypographyView) <{ empty?: boolean }>`
  font-size: ${pxToRem(9)};
  text-align: center;
  color: ${({ theme, empty }) =>
    empty ? theme.grey.shade5 : theme.grey.shade9};
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`;

export const SizeTextContainer = styled.div`
  display: flex;
  flex-direction: row;

  .over-divider {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

export const MajorInfo = styled.div`
  display: flex;
  flex-direction: row;
`

export const MinorInfo = styled.div`
  margin-top: 8px;
`

export const SubMinorInfo = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between ;
`

export const SubMinorDetail = styled.div`
  display: flex;
  margin-right: 20px
`

export const MarketRequestItemMobileContainer = styled.div`
  .thumbnail-container {
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      margin-right: 8px
    }
  }
`;