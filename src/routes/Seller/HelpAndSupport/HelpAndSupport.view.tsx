import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import { Search, ChevronRight, CloseFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import HelpAndSupportFooter from 'components/module/HelpAndSupportFooter';
import { SELLER_ROUTES, SHORETRADE_EMAIL } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import fightingFish from 'res/images/fighting-fish.png';
import { useTheme } from 'utils/Theme';

import { SHORETRADE_TEL } from './HelpAndSupport.constants';
import { HelpAndSupportGeneratedProps } from './HelpAndSupport.props';
import {
  Container,
  ImageWrapper,
  SearchFieldWrapper,
  SearchFieldContainer,
  HelpAndSupport,
  Category,
  Description,
  DescriptionContent,
  Categories,
  Content1,
  EnvelopeAltWrapper,
  ChatWrapper,
  Account,
  Content2,
  Title,
  MobileDescription,
  SearchResults,
  ResultWrapper,
  CloseFilledContainer,
  Content3,
} from './HelpAndSupport.style';

const HelpAndSupportView = (props: HelpAndSupportGeneratedProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const highlightPhrase = (words: string, phraseToHighlight: string) => {
    const parts = words.split(new RegExp(`(${phraseToHighlight})`, 'gi'));

    const wordsWithHighlightedPhrase = (
      <span>
        {parts.map((part: string) => (
          <span
            key={Math.random()}
            style={
              part.toLowerCase() === phraseToHighlight.toLowerCase()
                ? { fontWeight: 'bolder' }
                : {}
            }
          >
            {part}
          </span>
        ))}{' '}
      </span>
    );

    return wordsWithHighlightedPhrase;
  };

  return (
    <Container className="help_and_support">
      <Account
        className="help_and_support__account"
        variant="title5"
        weight="700"
        color="noshade"
      >
        Account
      </Account>

      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ROUTES.ACCOUNT },
            { label: 'Help & Support' },
          ]}
        />
      </div>

      <Content2>
        <ImageWrapper src={fightingFish} />
        <SearchFieldContainer>
          <HelpAndSupport
            variant={isMobile ? 'title6' : 'title5'}
            weight="700"
            color="noshade"
          >
            Help &amp; Support
          </HelpAndSupport>
          <div className="help_and_support__search_container">
            <SearchFieldWrapper
              value={props.searchKeyword}
              onChange={(e: any) => props.handleSearchChange(e)}
              className="help_and_support__content__search_field"
              LeftComponent={<Search />}
              placeholder="Search for anything..."
              height={isMobile ? '40px' : '56px'}
              RightComponent={
                props.searchKeyword && (
                  <CloseFilledContainer
                    onClick={() => props.handleClearSearchResults()}
                  >
                    <CloseFilled
                      width={16}
                      height={16}
                      fill={theme.grey.shade6}
                    />
                  </CloseFilledContainer>
                )
              }
            />
            {props.searchKeyword ? (
              <SearchResults>
                {props.searching ? (
                  <ResultWrapper variant="label">Searching...</ResultWrapper>
                ) : props?.topicEntries?.items &&
                  props?.topicEntries?.items?.length > 0 ? (
                  props?.topicEntries?.items?.map((item) => (
                    <ResultWrapper
                      key={item?.fields?.referenceTopicId?.sys?.id}
                      variant="label"
                      onClick={() =>
                        props.handleTopicClick(
                          item?.sys?.id,
                          item?.fields?.slug
                        )
                      }
                    >
                      {highlightPhrase(
                        item?.fields?.title,
                        props.searchKeyword
                      )}
                    </ResultWrapper>
                  ))
                ) : (
                  <ResultWrapper variant="label">
                    No result for {props.searchKeyword}
                  </ResultWrapper>
                )}
              </SearchResults>
            ) : null}
          </div>
        </SearchFieldContainer>
      </Content2>

      <Categories>
        {props.mainPage?.fields?.categories?.map(
          (category: any, index: number) => (
            <Col
              key={`help_and_support__categories__category-${index}`}
              className="help_and_support__categories__category"
              xs={12}
              onClick={() =>
                props.handleCategoryClick(
                  category?.fields?.referenceCategoryId?.sys?.id,
                  category?.fields?.slug
                )
              }
            >
              <Category className="help_and_support__categories__category_content">
                <img src={category?.fields?.icon?.fields?.file?.url} />
                <Title color="noshade" weight="500">
                  {category?.fields?.title}
                </Title>
                <DescriptionContent>
                  <Description variant="label" weight="400" color="shade6">
                    {category?.fields?.description}
                  </Description>
                </DescriptionContent>
              </Category>

              <div className="help_and_support__categories__category_content_mobile">
                <Content1>
                  <img src={category?.fields?.icon?.fields?.file?.url} />
                  <div style={{ marginLeft: 14 }}>
                    <Title color="noshade" variant="body" weight="500">
                      {category?.fields?.title}
                    </Title>
                    <MobileDescription
                      variant="caption"
                      weight="500"
                      color="shade6"
                    >
                      {category?.fields?.description}
                    </MobileDescription>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <ChevronRight
                      fill={theme.brand.primary}
                      height={14}
                      width={24}
                    />
                  </div>
                </Content1>
              </div>
            </Col>
          )
        )}
      </Categories>
      <HelpAndSupportFooter
        contactNo={SHORETRADE_TEL}
        email={SHORETRADE_EMAIL}
        handleEmailClick={props.handleEmailUsClick}
      />
    </Container>
  );
};

export default HelpAndSupportView;
