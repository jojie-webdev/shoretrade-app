import React from 'react';

import AnimationPlayer from 'components/base/AnimationPlayer';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Select from 'components/base/Select';
import {
  Group194,
  Group195,
  Group196,
  Wave31,
  Wave41,
  Wave51,
} from 'components/base/SVG';
import Group204 from 'components/base/SVG/Group204';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { AnimatedSwordfish } from 'res/images/animated/swordfish';

import { CreateRequestHeaderContainer } from '../Create.style';
import {
  CategoryItem,
  CategorySelectionProps,
} from './CategorySelection.props';
import {
  CategoryInterAction,
  CategoryInteractionsContainer,
  EmptyContainer,
  BottomAbsoContainer,
  BottomGroupContainer,
  LeftAbsoContainer,
  LeftGroupContainer,
  TopAbsoContainer,
  TopGroupContainer,
  NoResultMessage,
  TitleContainer,
  CircleBackground,
  AnimatedComponentContainer,
} from './CategorySelection.style';

const CategorySelectionView = (props: CategorySelectionProps) => {
  const {
    step,
    stepCountComponent,
    searchTerm,
    setSearchTerm,
    search,
    buying,
    setSelectedCategory,
    hideSearchResult,
    pendingSearch,
    typeSearchResults,
    setStep,
    updateCategory,
    didFinishStep,
    setDidFinishStep,
    onBack,
  } = props;

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const handleCategoryClick = (v: CategoryItem) => {
    updateCategory(v);
    setSelectedCategory(v);
    setStep(2);
    setDidFinishStep(1);
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          {isMobile ? null : (
            <Breadcrumbs
              className="breadcrumbs"
              color="shade5"
              sections={[
                { label: 'Product' },
                {
                  label: 'Specifications',
                  onClick: () => {
                    if (didFinishStep >= 2) {
                      onBack(2);
                    }
                  },
                  isDone: didFinishStep >= 2,
                },
                {
                  label: 'Size',
                  onClick: () => {
                    if (didFinishStep >= 3) {
                      onBack(3);
                    }
                  },
                  isDone: didFinishStep >= 3,
                },
                {
                  label: 'Quantity',
                  onClick: () => {
                    if (didFinishStep >= 4) {
                      onBack(4);
                    }
                  },
                  isDone: didFinishStep >= 4,
                },
                {
                  label: 'Summary',
                  onClick: () => {
                    if (didFinishStep >= 5) {
                      onBack(5);
                    }
                  },
                  isDone: didFinishStep >= 5,
                },
              ]}
            />
          )}
          <TitleContainer>
            <Visible xs sm>
              {stepCountComponent}
            </Visible>
            <Typography
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans', marginBottom: 12 }}
            >
              Request a Product
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Search from the hundreds of product types on ShoreTrade and select
              the product you would like to request.
            </Typography>
          </TitleContainer>
        </div>
      </CreateRequestHeaderContainer>
      <CategoryInteractionsContainer>
        <div className="search-container">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            resetValue={() => setSearchTerm('')}
            placeholder="Search for a product"
            style={{ borderRadius: 12, width: '100%' }}
          />
        </div>

        {pendingSearch ? (
          <Loading label="Searching" />
        ) : !hideSearchResult && typeSearchResults.length > 0 ? (
          typeSearchResults.map((result) => (
            <CategoryInterAction
              onClick={() =>
                handleCategoryClick({ id: result.value, name: result.label })
              }
              key={result.value}
              type="next"
              leftComponent={
                <Typography variant="body">{result.label}</Typography>
              }
            />
          ))
        ) : (
          <>
            {searchTerm && (
              <NoResultMessage>
                <Typography weight="700" variant="title5" color="shade9">
                  No search result
                </Typography>
              </NoResultMessage>
            )}
            <Hidden xs sm>
              <TopAbsoContainer>
                <Wave41 />
              </TopAbsoContainer>
              <TopGroupContainer>
                <Group196 />
              </TopGroupContainer>
              <BottomAbsoContainer>
                <Wave31 />
              </BottomAbsoContainer>
              <BottomGroupContainer>
                <Group195 />
              </BottomGroupContainer>
              <LeftAbsoContainer>{/* <Wave51 /> */}</LeftAbsoContainer>
              <LeftGroupContainer>
                <Group194 />
              </LeftGroupContainer>
            </Hidden>
            <EmptyContainer>
              <AnimatedComponentContainer>
                <CircleBackground />
                <div style={{ position: 'absolute' }}>
                  <AnimationPlayer
                    src={AnimatedSwordfish}
                    style={{ width: '301px', height: '305px' }}
                  />
                </div>
              </AnimatedComponentContainer>
            </EmptyContainer>
          </>
        )}
      </CategoryInteractionsContainer>
    </>
  );
};

export default CategorySelectionView;
