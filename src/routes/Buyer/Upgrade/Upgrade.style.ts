import styled from 'utils/styled';

export const Container = styled.div``;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
`;

export const DicountContainer = styled.div`
  display: flex;
  margin: auto;
  position: relative;
  height: 18px;
  width: 260px;

  .discount {
    position: absolute;
    right: 0;

    p {
      font-family: Wilderness;
      font-size: 24px;
    }
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

export const PlanSection = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 35%;
    max-width: 400px;
    padding: 30px;
    background: ${({ theme }) => theme.grey.noshade};
    border-radius: 12px;
  }

  .plan-rate {
    display: flex;
    margin: 24px 0;
  }

  .upgrade-btn {
    margin-top: 24px;
  }
`;
