import React, { useMemo, useReducer } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import Divider from '../Divider';
import Typography from '../Typography';
import { TotalCardProps } from './TotalCard.props';
import { Container } from './TotalCard.style';

const TotalCard = (props: TotalCardProps): JSX.Element => {
  const { removeCredits } = props;
  const theme = useTheme();

  const getUser = useSelector((state: Store) => state.getUser);

  // eslint-disable-next-line
  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const credit = defaultCompany?.credit;

  return (
    <Container>
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${theme.grey.shade3}`,
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        <div>
          <Typography
            variant="label"
            color="shade6"
            style={{ textAlign: 'right' }}
          >
            Total Value
          </Typography>
          <Typography
            variant="title3"
            weight="900"
            style={{ textAlign: 'right' }}
          >
            <sup className="sup-text-2">$</sup>
            {props?.totalOrderValue
              ? toPrice(props?.totalOrderValue).replace('$', '')
              : '0.00'}
          </Typography>
        </div>

        {!removeCredits && (
          <>
            <Divider spacing={20} />

            <div style={{ marginTop: '10px' }}>
              <Typography
                variant="label"
                color="shade6"
                style={{ textAlign: 'right' }}
              >
                Credits Balance
              </Typography>
              <Typography
                variant="title5"
                weight="900"
                style={{ textAlign: 'right' }}
              >
                <sup className="sup-text">$</sup>
                {credit ? toPrice(credit).replace('$', '') : '0.00'}
              </Typography>
            </div>

            <div style={{ marginTop: '10px' }}>
              <Typography
                variant="label"
                color="shade6"
                style={{ textAlign: 'right' }}
              >
                Credit Balance after Purchase
              </Typography>
              <Typography
                variant="title5"
                weight="900"
                style={{ textAlign: 'right' }}
              >
                <sup className="sup-text">$</sup>
                {toPrice(
                  parseFloat(credit as string) - props?.totalOrderValue
                ).replace('$', '')}
              </Typography>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default React.memo(TotalCard);
