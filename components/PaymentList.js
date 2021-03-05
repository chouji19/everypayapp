import React from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from 'native-base';
import {formatDateNoTime} from '../utils/Utils';
import globalStyles from '../styles/global';

const PaymentList = ({prevPayments}) => {
  const checkStatus = (status) => {
    switch (status) {
      case 'Scheduled':
        return '';
      case 'Voided':
      case 'prefailed':
        return '(Failed)';
      case 'Scheduled (Split)':
        return '(Pending)';
      case 'Cleared':
        return '(Paid)';
      default:
        return status;
    }
  };

  const checkDescription = (description) => {
    switch (description) {
      case 'EveryPay payment':
        return 'Repayment';
      default:
        return description;
    }
  };

  if (!prevPayments) return null;
  return (
    <Container style={{borderRadius: 20}}>
      <Content>
        <List>
          {prevPayments &&
            prevPayments.map((payment) => (
              <ListItem avatar key={payment.id}>
                <Left>
                  <Icon
                    name="ellipse"
                    style={{
                      color: payment.type === 'payment' ? 'orange' : 'green',
                    }}
                  />
                </Left>
                <Body>
                  <Text styles={globalStyles.textRegular}>{`${checkDescription(
                    payment.description,
                  )} ${checkStatus(payment.status)}`}</Text>
                  <Text note styles={globalStyles.textRegular}>
                    {formatDateNoTime(payment.paydate)}{' '}
                  </Text>
                </Body>
                <Right>
                  <Text note styles={globalStyles.textRegular}>
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: 'AUD',
                    }).format(payment.amount / 100 || 0)}
                  </Text>
                </Right>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  );
};

export default PaymentList;
