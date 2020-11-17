import React from 'react';

import { FileCheck } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { ToShipAccordionContentProps } from './ToShipAccordionContent.props';
import {
  ActionsContainer,
  ActionContainer,
  ActionText,
  Container,
  ValuesRow,
  Value,
  OrderNumber,
  Row,
  Preview,
  Details,
  Size,
  TagsContainer,
  Tag,
  TagText,
} from './ToShipAccordionContent.style';

const ToShipAccordionContent = (
  props: ToShipAccordionContentProps
): JSX.Element => {
  const theme = useTheme();
  const { items, onDownloadInvoice, onPress } = props;
  return (
    <>
      <ActionsContainer>
        {/* 
        // NOTE: Not yet supported by BE
        <Touchable dark onPress={() => null}>
          <ActionContainer>
            <FileCheck width={13} height={13} fill={theme.grey.noshade} />
            <ActionText variant="caption" color="noshade">
              Packing Lists
            </ActionText>
          </ActionContainer>
        </Touchable> */}
        <Touchable
          dark
          onPress={() => {
            onDownloadInvoice();
          }}
        >
          <ActionContainer>
            <FileCheck width={13} height={13} fill={theme.grey.noshade} />
            <ActionText variant="caption" color="noshade">
              Invoice
            </ActionText>
          </ActionContainer>
        </Touchable>
        {/* 
        // NOTE: Not yet supported by BE
        <Touchable dark onPress={() => null}>
          <ActionContainer>
            <FileCheck width={13} height={13} fill={theme.grey.noshade} />
            <ActionText variant="caption" color="noshade">
              Summary
            </ActionText>
          </ActionContainer>
        </Touchable> */}
      </ActionsContainer>
      {items.map(
        ({ orderNumber, buyer, uri, price, weight, name, tags, size }) => (
          <Container key={orderNumber + name} onClick={() => onPress()}>
            <ValuesRow>
              <Value>
                <Typography variant="overline" color="shade6">
                  Order:
                </Typography>
                <OrderNumber>{orderNumber}</OrderNumber>
              </Value>

              <Value>
                <Typography variant="overline" color="shade6">
                  Buyer:
                </Typography>
                <Typography color="noshade">{buyer}</Typography>
              </Value>
            </ValuesRow>

            <ValuesRow>
              <Value>
                <Typography variant="overline" color="shade6">
                  Price:
                </Typography>
                <Typography color="noshade">{price}</Typography>
              </Value>

              <Value>
                <Typography variant="overline" color="shade6">
                  Weight:
                </Typography>
                <Typography color="noshade">{weight}</Typography>
              </Value>
            </ValuesRow>

            <Row>
              <Preview src={uri} />

              <Details>
                <Typography variant="label" color="noshade">
                  {name}
                </Typography>
                <TagsContainer>
                  {tags.map((t) => (
                    <Tag key={t.label}>
                      <TagText variant="small" color="noshade">
                        {t.label}
                      </TagText>
                    </Tag>
                  ))}
                </TagsContainer>
                {size ? (
                  <Row>
                    <Typography variant="small" color="shade6">
                      Size:
                    </Typography>
                    <Size variant="small">{size}</Size>
                  </Row>
                ) : (
                  <Typography variant="small" color="shade6">
                    Ungraded
                  </Typography>
                )}
              </Details>
            </Row>
          </Container>
        )
      )}
    </>
  );
};

export default React.memo(ToShipAccordionContent);
