import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import { Search, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import fightingFish from 'res/images/fighting-fish.png';
import { useTheme } from 'utils/Theme';

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
  Text1,
  Content1,
  EnvelopeAltWrapper,
  ChatWrapper,
  Account,
  Content2,
  Title,
  MobileDescription,
} from './HelpAndSupport.style';

const HelpAndSupportView = (props: HelpAndSupportGeneratedProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="help_and_support">
      <Account
        className="help_and_support__account"
        variant="title5"
        weight="700"
      >
        Account
      </Account>

      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
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
          <SearchFieldWrapper
            className="help_and_support__content__search_field"
            LeftComponent={<Search />}
            placeholder="Search for anything..."
            height={isMobile ? '40px' : '56px'}
          />
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
                  category?.fields?.referenceCategoryId?.sys?.id
                )
              }
            >
              <Category className="help_and_support__categories__category_content">
                <img src={category?.fields?.icon?.fields?.file?.url} />
                <Title weight="500">{category?.fields?.title}</Title>
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
                    <Title variant="body" weight="500">
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

      <Text1>
        <Typography
          variant="copy"
          weight="500"
          style={{ textAlign: isMobile ? 'left' : 'center' }}
        >
          Can’t find an answer?
        </Typography>
        {!isMobile && <div style={{ height: 8 }} />}
        <Typography
          variant="label"
          weight="500"
          color="shade6"
          style={{ textAlign: isMobile ? 'left' : 'center' }}
        >
          Get in touch with our success team
        </Typography>
      </Text1>

      <div className="help_and_support__contact">
        <Content1>
          <EnvelopeAltWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography variant="body" weight="500">
              Email us
            </Typography>
            <Typography variant="caption" weight="500" color="shade6">
              Fill out the form, and we will get back to you
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content1>
        <Content1>
          <ChatWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography variant="body" weight="500">
              Chat with us
            </Typography>
            <Typography variant="caption" weight="500" color="shade6">
              Connect with our live specialists
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content1>
      </div>
    </Container>
  );
};

export default HelpAndSupportView;
