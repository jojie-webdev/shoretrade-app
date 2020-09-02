import React from 'react';

// import { useTheme } from 'utils/Theme';
import { PreviewProps } from './Preview.props';
import { CardContainer } from './Preview.style';

const Preview = (props: PreviewProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <CardContainer className="centered">
      <div className="card">
        <picture className="thumbnail">
          {/* <img src={props.image} alt="A banana that looks like a bird" /> */}
        </picture>
        <div className="card-content">
          {/* <TypographyView variant="label" color="primary">
            {props.label}
          </TypographyView> */}
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
