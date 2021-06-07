import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImage from 'components/module/CategoryImage';
import Loading from 'components/module/Loading/Loading.view';
import Search from 'components/module/Search';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { MarketInterestsGeneratedProps } from 'routes/Buyer/Account/MarketInterests/MarketInterests.props';
import {
  Container,
  BadgeContainer,
} from 'routes/Buyer/Account/MarketInterests/MarketInterests.style';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

const MarketInterestsView = ({
  isInner,
  setIsInner,
  currentCategoryId,
  setCurrentCategoryId,

  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,

  categories,
  innerCategories,
  loadingInnerCategories,
  ...props
}: MarketInterestsGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (!categories || loadingInnerCategories) {
    return <Loading />;
  }

  return (
    <Container>
      <BoxContainer>
        <Row
          nogutter
          justify="between"
          align="center"
          style={{
            marginBottom:
              !isInner && isEmpty(innerCategories) && !isMobile ? 40 : 0,
          }}
        >
          <Col>
            <div style={{ marginRight: 20, marginBottom: isMobile ? 40 : 0 }}>
              <Breadcrumbs
                sections={[
                  { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
                  ...(!isInner
                    ? [{ label: "Products I'm Buying" }]
                    : [
                        {
                          label: "Products I'm Buying",
                          onClick: () => {
                            setIsInner(false);
                            setCurrentCategoryId('');
                            setSearchTerm('');
                            props.setCategories([]);
                            props.setInnerCategories([]);
                          },
                        },
                        {
                          label:
                            categories.find((c) => c.id === currentCategoryId)
                              ?.name || 'Details',
                        },
                      ]),
                ]}
              />
            </div>
          </Col>
          <Col xs={12} sm="content">
            <div style={{ width: isMobile ? '100%' : 300 }}>
              <Search
                className="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                resetValue={() => setSearchTerm('')}
                placeholder="Search for a Product or Category"
                rounded
              />
            </div>
          </Col>
        </Row>

        {!isEmpty(innerCategories) && !isMobile && (
          <Row nogutter style={{ margin: '16px 0' }}>
            <Col />
            <Col xs="content">
              <Button
                loading={props.isSaving}
                onClick={props.onSave}
                text="Save"
              />
            </Col>
          </Row>
        )}

        {!isInner &&
          categories.map((c) => {
            const buying = props.buying.filter((s) => s.categoryId === c.id);

            return (
              <>
                <Interactions
                  padding="16px 20px 16px 8px"
                  key={c.id}
                  onClick={() => props.onPressCategory(c.id)}
                  leftComponent={
                    <div className="category-container">
                      <div style={{ width: 48 }}>
                        <CategoryImage
                          id={c.id}
                          containerHeight={30}
                          maxHeight={30}
                        />
                      </div>

                      <Typography variant="label" className="category-text">
                        {c.name}
                      </Typography>
                    </div>
                  }
                />

                {!isEmpty(buying) && (
                  <BadgeContainer>
                    {buying.map((s) => (
                      <div key={s.id} className="badge-item-container">
                        <Badge badgeColor={theme.grey.shade3}>
                          <Typography variant="overline" color="shade9">
                            {s.name}
                          </Typography>
                        </Badge>
                      </div>
                    ))}
                  </BadgeContainer>
                )}
              </>
            );
          })}

        {innerCategories.map((c) => (
          <Interactions
            padding="8px 20px 8px 16px"
            key={c.id}
            type="checkbox"
            pressed={selectedCategories.some((v) => v.id === c.id)}
            onClick={() =>
              props.onPressInnerCategory({
                id: c.id,
                name: c.name,
                categoryId: c.categoryId || currentCategoryId,
              })
            }
            leftComponent={
              <div className="category-container">
                <img src={parseImageUrl(c.thumbnail)} />
                <Typography variant="label">{c.name}</Typography>
              </div>
            }
          />
        ))}
      </BoxContainer>

      <MobileFooter>
        <Button
          disabled={isEmpty(innerCategories)}
          loading={props.isSaving}
          onClick={props.onSave}
          text="Save"
          takeFullWidth
        />
      </MobileFooter>
    </Container>
  );
};

export default MarketInterestsView;
