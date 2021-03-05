import styled from 'utils/styled';

const imgUrl = (url: string) => `"${url}"`;

export const Container = styled.div<{ img?: string }>`
  width: 100%;
  max-width: 474px;
  margin-bottom: 1rem;

  .imgContainer {
    position: relative;
    text-align: center;
    color: white;
  }
  .img {
    background-image: url(${(props) => imgUrl(props.img ? props.img : '')});
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    border: 0;
    width: 100%;
    height: 280px;
    border-radius: 8px;
  }

  .label {
    margin-top: 1rem;
  }
`;

export const BadgeContainer = styled.div`
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 12px;
  left: 16px;
`;
