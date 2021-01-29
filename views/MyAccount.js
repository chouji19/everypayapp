import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Container,
  Header,
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Toast,
  List,
  ListItem,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';

const MyAccount = () => {

  const navigation = useNavigation();


  const formatDateNoTime = (addDays) => {
    let date = new Date();
    date.setDate(date.getDate() + addDays);
    const d = new Date(date);
    let datepay =
      d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    return datepay;
  };
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }



  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <Header style={{backgroundColor: '#28303B'}}>
        <Left>
          <Icon
            name="home"
            style={[globalStyles.icon]}
            onPress={() => navigation.navigate('Home')}
          />
        </Left>
        <Body>
          <Title style={{color: '#FFF'}}>My Account</Title>
        </Body>
        <Right>
          <Icon
            name="log-out-outline"
            style={[globalStyles.icon]}
            onPress={() => logOut()}
          />
        </Right>
      </Header>
      <List>
        <Header style={globalStyles.headerCard}>
          <Text style={globalStyles.headerCardTittle}>Account Info: </Text>
        </Header>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Name:</Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
              Rok Zolnir
            </Text>
          </Body>
        </ListItem>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Phone:</Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
             0452 255 863
            </Text>
          </Body>
        </ListItem>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Income Frequency:</Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
              Weekly
            </Text>
          </Body>
        </ListItem>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Employement type:</Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
              Full Time
            </Text>
          </Body>
        </ListItem>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Current Daily Amount:</Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
              $30
            </Text>
          </Body>
        </ListItem>
        <ListItem >
          <Body>
            <Text style={{fontWeight: 'bold'}}>Next Pay Date: </Text>
            <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>
                {formatDateNoTime(4)}
            </Text>
          </Body>
        </ListItem>
      </List>
    </Container>
  );
};


export default MyAccount;
