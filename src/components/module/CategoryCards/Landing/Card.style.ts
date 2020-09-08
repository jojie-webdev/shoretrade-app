import styled from 'utils/styled';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
    width: 100%;
    height: auto;
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card a:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
  }

  .card-content {
    padding: 1.4em;
  }

  .card-content h2 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  .card-content p {
    font-size: 80%;
  }

  /* Flexbox stuff */

  .card {
    flex: 1 0 500px;
    box-sizing: border-box;
    margin: 1rem 0.25em;
    border-radius: 4px;
  }
`;
