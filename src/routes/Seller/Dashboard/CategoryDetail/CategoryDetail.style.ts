import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  padding-bottom: ${(props) => (props.isIOS ? IOSBOTTOMPADDING : 0)};
`;

export const HeaderRow = styled(Row)`
  margin-bottom: 32px;
  .padding-bread {
    padding-left: 16px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-left: 8px;

    .text {
      margin-right: 16px;
    }
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.grey.shade9};
  margin-bottom: 16px;

  img {
    height: 64px;
    width: 64px;
    border-radius: 4px;
    margin-right: 16px;
  }

  .text-container {
    .overline {
      margin-bottom: 4px;
    }

    .price-container {
      display: flex;
      align-items: center;

      .svg-container {
        margin: 0 4px 0 14px;
      }
    }
  }
`;
