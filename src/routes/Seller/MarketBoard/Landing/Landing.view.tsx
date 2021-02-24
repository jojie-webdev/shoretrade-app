import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import Search from 'components/module/Search';
import { Col, Row } from 'react-grid-system';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container } from './Landing.style';

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <SegmentedControls
        options={['Buyer Requests', 'My Active Offers']}
        selectedOption={props.currentTab}
        onClickControl={(value) =>
          props.onChangeCurrentTab(value as TabOptions)
        }
      />

      <Row className="search-row">
        <Col xl={4}>
          <Search
            className="filter-search"
            value={props.searchTerm}
            onChange={(event: any) =>
              props.setSearchTerm(event.currentTarget.value)
            }
            resetValue={() => props.setSearchTerm('')}
            placeholder="Search for any product..."
            rounded
          />
        </Col>
      </Row>

      {[...new Array(10)].map((v, i) => (
        <Interactions key={i} padding="16px 24px 16px 16px" />
      ))}
    </Container>
  );
};

export default MarketBoardLandingView;
