import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  /* justify-content: space-around; */
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkipButton = styled.button`
  padding: 4px 8px;
  background: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade3 : theme.grey.shade9};
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;

  .text {
    margin-right: 4px;
  }
`;

export const SvgContainer = styled.div`
  width: 100%;
  /* margin-top: 78px; */
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 24px;
    min-height: unset;
  }

  @media ${BREAKPOINTS['md']} {
    margin-top: 32px;
    min-height: unset;
  }

  @media ${'(min-width: 768px) and (max-width: 800px)'} {
    margin-top: 32px;
    min-height: unset;
  }

  @media ${BREAKPOINTS['xl']} {
    margin-top: 24px;
    min-height: unset;
  }
`;
export const Description = styled(Typography)`
  margin-top: 4px;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: unset;
  }
`;

export const PrevButton = styled(Button)`
  margin-right: 16px;
`;
