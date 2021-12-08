import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Col, Row } from 'react-grid-system';

import { TabsProps, TabColProps } from './Tabs.props';
import { Container, Tab } from './Tabs.style';

const TabCol = (props: TabColProps) => {
  return props.fitTabWidthToContent ? (
    <Col sm="content">{props.children}</Col>
  ) : (
    <Col>{props.children}</Col>
  );
};

const Tabs = (props: TabsProps): JSX.Element => {
  // const theme = useTheme();

  const {
    tabs,
    tabElements,
    tabStyle,
    fitTabWidthToContent,
    tabValues,
    justify,
    selectedTab,
    onClickTab,
    customTabContent,
  } = props;

  return (
    <Container>
      <Row
        className="row"
        nogutter
        align="center"
        justify={justify ? justify : 'center'}
      >
        {tabs &&
          !tabElements &&
          tabs.map((tab, index) => {
            return (
              <TabCol key={tab} fitTabWidthToContent={fitTabWidthToContent}>
                <Tab
                  style={tabStyle}
                  active={tab === selectedTab || index === Number(selectedTab)}
                  onClick={() => onClickTab(tab)}
                >
                  <span className="tab-text">{tab}</span>
                  {customTabContent && (
                    <span className="custom-tab">
                      {customTabContent[index]}
                    </span>
                  )}
                </Tab>
              </TabCol>
            );
          })}
        {!tabs &&
          tabElements &&
          tabElements.map((tab, index) => {
            return (
              <TabCol
                key={index.toString()}
                fitTabWidthToContent={fitTabWidthToContent}
              >
                <Tab
                  style={tabStyle}
                  active={
                    tabValues
                      ? tabValues[index] === selectedTab
                      : index === Number(selectedTab)
                  }
                  onClick={() =>
                    onClickTab(tabValues ? tabValues[index] : index.toString())
                  }
                >
                  <span className="tab-text">{tab}</span>
                  {customTabContent && (
                    <span className="custom-tab">
                      {customTabContent[index]}
                    </span>
                  )}
                </Tab>
              </TabCol>
            );
          })}
      </Row>
    </Container>
  );
};

export default React.memo(Tabs);
