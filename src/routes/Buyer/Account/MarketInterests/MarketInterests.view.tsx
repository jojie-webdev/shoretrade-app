import React, { useEffect } from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImage from 'components/module/CategoryImage';
import Loading from 'components/module/Loading/Loading.view';
import LoadingOverlay from 'components/module/LoadingOverlay';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isInner]);

  if (!categories || loadingInnerCategories) {
    return <Loading />;
  }
  return (
    <Container>
      <Row
        nogutter
        justify="between"
        align="center"
        // style={{
        //   marginBottom:
        //     !isInner && isEmpty(innerCategories) && !isMobile ? 40 : 0,
        // }}
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
          <div
            style={{ width: isMobile ? '100%' : 330 }}
            className="search-info"
          >
            <Search
              className="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              resetValue={() => setSearchTerm('')}
              placeholder={`Search for a product ${
                !isInner ? 'or category' : ''
              }`}
              rounded
            />
            <div className="tooltip">
              <InfoFilled width={20} height={20} fill={theme.brand.info} />
              <span className="tooltip-text">
                Optimise your experience with custom notifications and search
                results based on seafood products you commonly purchase. Simply
                select products here and your account will be more personalised.
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <Row nogutter style={{ margin: '16px 0' }}>
        <Col />
        {!isEmpty(innerCategories) && !isMobile && (isInner || searchTerm) && (
          <Col xs="content">
            <Button
              disabled={props.isSaving}
              onClick={props.onSave}
              text="Save"
            />
          </Col>
        )}
      </Row>

      {!isInner &&
        !props.isSaving &&
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
              <img src={parseImageUrl(c.thumbnail)} alt="" />
              <Typography variant="label">{c.name}</Typography>
            </div>
          }
        />
      ))}

      <MobileFooter>
        <Button
          disabled={isEmpty(innerCategories) || props.isSaving}
          onClick={props.onSave}
          text="Save"
          takeFullWidth
        />
      </MobileFooter>

      {props.isSaving && <LoadingOverlay />}
    </Container>
  );
};

export default MarketInterestsView;
