import React from 'react';

import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import Search from 'components/module/Search';
import SellerRating from 'components/module/SellerRating';
import { BUYER_ROUTES } from 'consts/routes';
import { useHistory } from 'react-router-dom';
import { Seller } from 'types/store/GetSellerByIdState';

// import { useTheme } from 'utils/Theme';
import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import {
  Container,
  CategoryContainer,
  SpinnerContainer,
  ListingContainer,
  ListingCounter,
  SearchContainer,
  ListContainer,
  ListItemInteraction,
  ListingImageContainer,
  RightComponent,
} from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();
  const { loading, search, onSearch, result, sellerRatingProps } = props;

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <SellerRating {...sellerRatingProps} />

          <ListingContainer>
            <Typography variant="title5" color="shade9">
              Active Listing <ListingCounter>{result.length}</ListingCounter>
            </Typography>

            <SearchContainer>
              <Search
                value={search}
                resetValue={() => onSearch('')}
                onChange={(e) => onSearch(e.target.value)}
              />
            </SearchContainer>

            <ListContainer>
              {result &&
                result
                  // .filter((cat) => {
                  //   if (search && search !== '') {
                  //     const catName = cat.name.replace(' ', '').toLowerCase();
                  //     return catName.includes(
                  //       search.replace(' ', '').toLowerCase()
                  //     );
                  //   }
                  //   return true;
                  // })
                  .map((r, idx) => {
                    return (
                      <ListItemInteraction
                        key={idx}
                        leftComponent={
                          <CategoryContainer>
                            <ListingImageContainer>
                              <img src={r.images[0]} />
                            </ListingImageContainer>
                            <Typography variant="body" color={'shade9'}>
                              {r.type}
                            </Typography>
                          </CategoryContainer>
                        }
                        rightComponent={
                          <RightComponent>
                            <ChevronRight width={12} height={16} />
                          </RightComponent>
                        }
                        value={r.type}
                        padding="0"
                        onClick={() => {
                          // history.push(
                          //   `${BUYER_ROUTES.ROOT}/categories/${cat.id}`
                          // );
                        }}
                      />
                    );
                })}
            </ListContainer>
          </ListingContainer>
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
