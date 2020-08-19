import React from 'react';

// import { useTheme } from 'utils/Theme';
import { UpArrow, Fish } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import { CategoriesGeneratedProps } from './Categories.props';
import { Container, HeaderRow, CategoryContainer } from './Categories.style';

const CategoriesView = (props: CategoriesGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <HeaderRow align="center" justify="between">
        <InnerRouteHeader title="Categories" fullRow={false} />
        <Typography variant="overline" color="shade6">
          {'1 may – 16 jun 2020'}
        </Typography>
      </HeaderRow>

      <Row>
        {[1, 2, 3, 4, 5].map((num) => (
          <Col md={12} key={num}>
            <CategoryContainer>
              <div className="top">
                <div className="text-container">
                  <Typography
                    variant="overline"
                    color="shade6"
                    className="overline"
                  >
                    Whole Tuna
                  </Typography>
                  <div className="price-container">
                    <Typography variant="title5" color="noshade">
                      $55k
                    </Typography>

                    <div className="svg-container">
                      <UpArrow height={8} width={8} />
                    </div>

                    <Typography variant="caption" color="success">
                      +1.25%
                    </Typography>
                  </div>
                </div>

                <Fish />
              </div>

              <div className="bottom">
                <div className="progress-bar"></div>
              </div>
            </CategoryContainer>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesView;
