import styled from 'utils/styled';

const imgUrl = (url: string) => `"${url}"`;

export const Container = styled.div<{ img: string }>`
  width: 474px;

  .imgContainer {
    position: relative;
    text-align: center;
    color: white;
  }
  .img {
    background-image: url(${(props) => imgUrl(props.img)});
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    border: 0;
    width: 474px;
    height: 280px;
    border-radius: 8px;
  }

  .caption {
    margin-top: 1rem;
  }
`;

export const BadgeContainer = styled.div`
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 12px;
  left: 16px;

  .badge {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 900;
    line-height: 12px;
  }
`;
