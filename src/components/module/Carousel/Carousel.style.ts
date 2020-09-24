import styled from 'utils/styled';

export const Container = styled.div`
  .swiper-pagination-bullets {
    background: ${({ theme }) => theme.grey.shade7};
    display: none;
  }

  .swiper-container {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .swiper-wrapper {
    padding-inline-start: 0;
  }

  .swiper-slide {
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px;
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
    margin-top: 4px;
  }

  .swiper-button-next {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
    margin-top: 4px;
  }
`;

export const Image = styled.img`
  width: 65vw;
  height: 295px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 7%;
`;
