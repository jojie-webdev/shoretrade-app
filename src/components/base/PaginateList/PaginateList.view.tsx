import React, { useState } from 'react';

import Pagination from 'components/module/Pagination';
import { pathOr, splitEvery, take } from 'ramda';
import { useLocation } from 'react-router-dom'

// import { useTheme } from 'utils/Theme';
import { PaginateListProps } from './PaginateList.props';
import {
  Container,
  ListContainer,
  ListItemInteraction,
} from './PaginateList.style';

const PaginateList = (props: PaginateListProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const { list, labelPath, onClickItem, maxItemPerPage } = props;
  const location = useLocation();
  const { pathname } = location;

  const numPages = Math.ceil(list.length / maxItemPerPage);
  const culledList: any[] = splitEvery(maxItemPerPage, list);

  if (!culledList || !culledList.length) return <Container />;

  return (
    <Container>
      <ListContainer>
        {culledList[currentPage].map((item: any, idx: number) => {
          const label = pathOr(item, labelPath || [], item);
          if (pathname.includes('/buyer/home')) {
            return (
              <ListItemInteraction
                key={idx}
                value={label}
                onClick={() => onClickItem(item)}
                resultCount={item.count}
              />
            );
          } else {
            return (
              <ListItemInteraction
                key={idx}
                value={label}
                onClick={() => onClickItem(item)}
              />
            );
          }
          // return (
          //   <ListItemInteraction
          //     key={idx}
          //     value={label}
          //     onClick={() => onClickItem(item)}
          //   />
          // );
        })}
      </ListContainer>

      {numPages > 1 && (
        <Pagination
          numPages={numPages}
          currentValue={currentPage + 1}
          variant="number"
          onClickButton={(page) => setCurrentPage(page - 1)}
        />
      )}
    </Container>
  );
};

export default React.memo(PaginateList);
