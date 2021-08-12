import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Col, Row } from 'react-grid-system';

import { TabsProps } from './Tabs.props';
import { Container, Tab } from './Tabs.style';

const Tabs = (props: TabsProps): JSX.Element => {
  // const theme = useTheme();

  const { tabs, selectedTab, onClickTab } = props;
  return (
    <Container>
      <Row className="row" nogutter align="center" justify="center">
        {tabs.map((tab) => {
          return (
            <Col key={tab}>
              <Tab active={tab === selectedTab} onClick={() => onClickTab(tab)}>
                <span className="tab-text">{tab}</span>
              </Tab>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default React.memo(Tabs);
