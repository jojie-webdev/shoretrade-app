import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Interactions from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import { ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import Search from 'components/module/Search';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container } from './Landing.style';

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

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

      {props.currentTab === 'Buyer Requests' &&
        [...new Array(5)].map((v, i) => (
          <Interactions
            key={i}
            onClick={() =>
              history.push(SELLER_MARKET_BOARD_ROUTES.REVIEW_REQUEST)
            }
            leftComponent={
              <div className="left-component">
                <img src="https://picsum.photos/200/300" />
                <div>
                  <Typography color="noshade">Pale Octopus</Typography>
                  <div className="badges-container">
                    {['Fresh', 'Farmed', 'Head on Gutted', 'Medium'].map(
                      (v) => (
                        <Badge
                          key={v}
                          className="badge"
                          badgeColor={theme.grey.shade8}
                        >
                          <BadgeText variant="overlineSmall" color="noshade">
                            {v}
                          </BadgeText>
                        </Badge>
                      )
                    )}
                  </div>

                  <div className="weights">
                    <Typography color="noshade" variant="small">
                      100kg
                    </Typography>
                    <ArrowRight
                      width={10}
                      height={10}
                      fill={theme.grey.shade7}
                    />
                    <Typography color="noshade" variant="small">
                      250kg
                    </Typography>
                  </div>
                </div>
              </div>
            }
            padding="16px 24px 16px 16px"
          />
        ))}

      {props.currentTab === 'My Active Offers' &&
        [...new Array(5)].map((v, i) => (
          <Interactions
            key={i}
            onClick={() => history.push(SELLER_MARKET_BOARD_ROUTES.NEGOTIATE)}
            leftComponent={
              <div className="left-component">
                <img src="https://picsum.photos/200/300" />
                <div>
                  <Typography color="noshade">Pale Octopus</Typography>
                  <div className="badges-container">
                    <Badge
                      key={v}
                      className="badge"
                      badgeColor={theme.brand.success}
                    >
                      <BadgeText variant="overlineSmall" color="noshade">
                        ACCEPTED
                      </BadgeText>
                    </Badge>
                  </div>

                  <div className="weights">
                    <Typography color="noshade" variant="small">
                      100kg
                    </Typography>
                    <ArrowRight
                      width={10}
                      height={10}
                      fill={theme.grey.shade7}
                    />
                    <Typography color="noshade" variant="small">
                      250kg
                    </Typography>
                  </div>
                </div>
              </div>
            }
            padding="16px 24px 16px 16px"
          />
        ))}
    </Container>
  );
};

export default MarketBoardLandingView;
