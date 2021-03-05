import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {
  Container,
  Text,
  Button,
  Icon,
  Item,
  Title,
  Toast,
  Textarea,
  Content,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image, Linking} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
import {getCustomerInfoAppBE, validateTokenBE} from '../services/BEServices';

const User = () => {
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const loadInitialValues = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenCustomer');
        if (!token) {
          navigation.navigate('Login');
        } else {
          const res = await validateTokenBE(token);
          if (!res.success) {
            navigation.navigate('Login');
          }
          const customers = await getCustomerInfoAppBE(token);
          if (customers.success) {
            setCustomer(customers.data.data.customer);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadInitialValues();
  }, []);

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  const logout = () => {
    AsyncStorage.removeItem('tokenCustomer');
    navigation.navigate('Login');
  };

  if (!customer) return null;
  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <ScrollView>
        <LinearGradient
          colors={['#091923', '#202F58']}
          style={styles.linearGradient}></LinearGradient>
        <View style={styles.maincontent}>
          <View style={styles.viewTittle}>
            {/* <FooterHelpButton size={200} square={50} /> */}
            <Title
              style={
                styles.textTittle
              }>{`${customer.firstname} ${customer.surname}`}</Title>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>Full Name</Text>
            <Text style={globalStyles.textCondensedRegular}>{`${customer.firstname} ${customer.surname}`}</Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>Mobile</Text>
            <Text style={globalStyles.textCondensedRegular}>{customer.phone}</Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>Email</Text>
            <Text style={globalStyles.textCondensedRegular}>{customer.email}</Text>
          </View>
          <View style={{marginTop: 40, marginHorizontal: 20}}>
            <List>
              <ListItem
                onPress={() =>
                  Linking.openURL(
                    `https://everypay.com.au/privacy-policy.html`,
                  ).catch((err) => console.error('An error occurred', err))
                }>
                <Left>
                  <Text style={{fontFamily: 'UniformExtraCondensed-Light'}}>Privacy Policy</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  Linking.openURL(
                    `https://everypay.com.au/terms-of-use.html`,
                  ).catch((err) => console.error('An error occurred', err))
                }>
                <Left>
                  <Text style={{fontFamily: 'UniformExtraCondensed-Light'}}>Terms of use</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem onPress={() => navigation.navigate('NewPassword')}>
                <Left>
                  <Text style={{fontFamily: 'UniformExtraCondensed-Light'}}>Change password</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem selected onPress={() => logout()}>
                <Left>
                  <Text style={{fontFamily: 'UniformExtraCondensed-Light'}}>Log out</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </View>
        </View>
      </ScrollView>

      {/* <FooterMenu buttonActive={'User'} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 130,
    paddingLeft: 15,
    paddingRight: 15,
  },
  maincontent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // marginHorizontal: '3%',
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  viewTittle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textTittle: {
    color: '#54B1E4',
    fontSize: 30,
    fontWeight: '200',
    marginVertical: 20,
    fontFamily: 'UniformExtraCondensed-Light'
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#54B1E4',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default User;
