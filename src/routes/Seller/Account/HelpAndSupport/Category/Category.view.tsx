import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { Search, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { SHORETRADE_TEL } from '../HelpAndSupport.constants';
import { PAGE_SIZE } from './Category.constants';
import { CategoryGeneratedProps } from './Category.props';
import {
  Account,
  Container,
  SearchFieldWrapper,
  SearchContent,
  SubCategory,
  SubCategories,
  EnvelopeAltWrapper,
  ChatWrapper,
  Text1,
  Content,
  Content2,
} from './Category.style';

const CategoryView = (props: CategoryGeneratedProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="category">
      <Account
        className="category__account"
        variant="title5"
        weight="700"
        color="noshade"
      >
        Account
      </Account>

      <div className="category__breadcrumb">
        <Breadcrumbs
          color="noshade"
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Help & Support',
              link: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT,
            },
            { label: props.category?.fields?.title },
          ]}
        />
      </div>

      <SearchContent>
        {props.category?.fields?.title && (
          <Typography
            color="noshade"
            variant={isMobile ? 'copy' : 'title5'}
            weight="500"
          >
            {props.category?.fields?.title}
          </Typography>
        )}
        <SearchFieldWrapper
          value={props.searchKeyword}
          onChange={(e: any) => props.handleSearchChange(e)}
          placeholder={`Search in ${props.category?.fields?.title}`}
          LeftComponent={<Search />}
        />
      </SearchContent>

      <SubCategories>
        {props?.filteredTopics
          ?.slice((props.page - 1) * PAGE_SIZE, props.page * PAGE_SIZE)
          .map((topic: any) => (
            <SubCategory
              key={`category_topic-${topic?.sys?.id}`}
              onClick={() =>
                props.handleTopicClick(topic?.sys?.id, topic?.fields?.slug)
              }
            >
              {topic?.fields?.title && (
                <Typography color="noshade" weight="500">
                  {topic?.fields?.title}
                </Typography>
              )}
              <div style={{ marginLeft: 'auto' }}>
                <ChevronRight
                  fill={theme.brand.primary}
                  height={14}
                  width={24}
                />
              </div>
            </SubCategory>
          ))}
      </SubCategories>

      {props?.filteredTopics?.length > PAGE_SIZE && (
        <Pagination
          className="category_pagination"
          numPages={props.totalPages}
          currentValue={props.page}
          onClickButton={props.handlePageChange}
          variant="number"
          iconColor={theme.grey.shade7}
          color="shade7"
        />
      )}

      <Text1>
        <Typography
          variant="copy"
          weight="500"
          color="noshade"
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

      <div className="category__contact">
        <Content onClick={() => props.handleEmailUsClick()}>
          <EnvelopeAltWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Email us
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content>
        <Content2 href={SHORETRADE_TEL}>
          <ChatWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Chat with us
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content2>
      </div>
    </Container>
  );
};

export default CategoryView;
