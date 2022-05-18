import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { Search, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { PAGE_SIZE } from './Category.contants';
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
} from './Category.style';

const CategoryView = (props: CategoryGeneratedProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="category">
      <Account className="category__account" variant="title5" weight="700">
        Account
      </Account>

      <div className="category__breadcrumb">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Help & Support',
              link: BUYER_ACCOUNT_ROUTES.HELP_AND_SUPPORT,
              isDone: true,
            },
            { label: props.category?.fields?.title },
          ]}
        />
      </div>

      <SearchContent>
        {props.category?.fields?.title && (
          <Typography variant={isMobile ? 'copy' : 'title5'} weight="500">
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
                <Typography weight="500">{topic?.fields?.title}</Typography>
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
        <Content>
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
        </Content>
        <Content>
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
        </Content>
      </div>
    </Container>
  );
};

export default CategoryView;
