import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';


const PaymentList = () => {
    return ( 
        <Container style={{borderRadius: 20}}>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Icon name="ellipse" style={{color: 'red'}}/>
              </Left>
              <Body>
                <Text>Daily Payment</Text>
                <Text note>Mon 18 Jan 2021 </Text>
              </Body>
              <Right>
                <Text note>$20</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ellipse" style={{color: 'green'}}/>
              </Left>
              <Body>
                <Text>CASH BOOST</Text>
                <Text note>Mon 18 Jan 2021 </Text>
              </Body>
              <Right>
                <Text note>$100</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ellipse" style={{color: 'red'}}/>
              </Left>
              <Body>
                <Text>Daily Payment</Text>
                <Text note>Mon 18 Jan 2021 </Text>
              </Body>
              <Right>
                <Text note>$20</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
     );
}
 
export default PaymentList;