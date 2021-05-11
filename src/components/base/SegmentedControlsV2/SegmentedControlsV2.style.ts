import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  width: 100%;
  // box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  background: ${(props) =>
    props.theme.appType === 'buyer'
      ? props.theme.grey.noshade
      : props.theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  max-height: 60px;
  margin-bottom: 32px;

  .controls {
    display: flex;
    flex-direction: row;
  }
  .search-row {
    display: flex;
    flex-direction: row;
  }
  .search {
    padding: 7px;
    min-height: 36px;
  }

  @media ${BREAKPOINTS['sm']} {
    justify-content: space-evenly !important;
  }
  @media ${BREAKPOINTS['genericTablet']} {
    justify-content: space-evenly !important;
  }
  @media ${BREAKPOINTS['iPad']} {
    justify-content: space-evenly !important;
  }
  @media ${BREAKPOINTS['sm']} {
    padding: 0px;
    margin-bottom: 16px;
  }
`;

const ControlButtonColor: Record<'buyer' | 'seller', string> = {
  buyer: theme.grey.shade8,
  seller: theme.brand.primary,
};

const ControlButtonTextColor = (
  active: boolean,
  appType: 'buyer' | 'seller',
  isMobile?: boolean
): string => {
  if (appType === 'buyer') {
    return active ? theme.grey.noshade : theme.grey.shade8;
  } else {
    if (isMobile) {
      return active ? theme.grey.shade9 : theme.grey.noshade;
    } else {
      return active ? theme.grey.noshade : theme.grey.shade6;
    }
  }
};

export const ControlButton = styled.button<{
  active: boolean;
  isMobile?: boolean;
}>`
  height: 100%;
  min-width: 166px;
  max-width: 166px;
  max-height: 36px;
  width: 100%;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.active
      ? props.isMobile
        ? theme.grey.noshade
        : ControlButtonColor[props.theme.appType]
      : 'none'};

  @media ${BREAKPOINTS['sm']} {
    max-height: 40px;
    height: 40px;
  }

  font-size: 14px;
  color: ${(props) =>
    ControlButtonTextColor(props.active, props.theme.appType, props.isMobile)};
  font-weight: 500;
  line-height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }

  .tooltip {
    margin-left: 6px;
    margin-bottom: 4px;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    width: 320px;
    background-color: black;
    color: ${(props) =>
      props.isMobile ? theme.brand.info : theme.grey.noshade};
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
  }
`;
