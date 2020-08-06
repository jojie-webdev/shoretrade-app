import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { SellingGeneratedProps } from './Selling.props';
import { ItemImage, ItemCard, ItemDetail, Tag } from './Selling.style';

const Item = () => (
  <ItemCard>
    <ItemImage src="" alt="" />

    <div className="content">
      <Typography variant="title5" color="noshade" className="item-title">
        King Salmon Manuka Cold Smoked
      </Typography>

      <div className="tags-container">
        <Tag>
          <Typography variant="caption" color="noshade">
            Fresh
          </Typography>
        </Tag>
        <Tag>
          <Typography variant="caption" color="noshade">
            Farmed
          </Typography>
        </Tag>
        <Tag>
          <Typography variant="caption" color="noshade">
            Head on Gutted
          </Typography>
        </Tag>
      </div>

      <ItemDetail variant="caption" color="shade6">
        Size: <span>Baby - Extra Large</span>
      </ItemDetail>

      <ItemDetail variant="caption" color="shade6">
        Listed on: <span>21 Apr 20</span>
      </ItemDetail>

      <ItemDetail variant="caption" color="shade6">
        Expires in: <span>22 Days, 20 Hours, 33 min</span>
      </ItemDetail>

      <ItemDetail variant="caption" color="shade6">
        Remaining: <span>50 Kg</span>
      </ItemDetail>
    </div>

    <div className="pricing">
      <Typography variant="title5" weight="900" color="noshade">
        $120.00
      </Typography>
      <Typography color="shade6" variant="caption">
        per kg
      </Typography>
    </div>
  </ItemCard>
);

const SellingView = (props: SellingGeneratedProps) => {
  // const theme = useTheme();
  const { items } = props;

  return (
    <Row>
      <Col>
        {items.map((item: any, ndx) => (
          <Item key={ndx} />
        ))}
      </Col>
    </Row>
  );
};

export default SellingView;
