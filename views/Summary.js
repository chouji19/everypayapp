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
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image, Linking} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {getCustomerInfoAppBE, sendCreditCardDetailsLP, validateTokenBE} from '../services/BEServices';

const Summary = ({route, navigation}) => {
  const [message, setMessage] = useState(null);
  const {details, cardDetails, payment} = route.params;
  const [isloading, setIsLoading] = useState(false)

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


  const onSummaryHandle = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        const result = await sendCreditCardDetailsLP({
          details, cardDetails, payment, customer
        },token);
        if (result.success) {
          setMessage('Payment processed successfully');
          setIsLoading(false);

          Alert.alert(
            'Payment process',
            'Payment processed successfully',
            [
              {text: 'OK', onPress: ()=>navigation.navigate('Home')}
            ],
            {cancelable: true},
          );
        } else {
          setMessage(result.msg);
          setIsLoading(false);

          Alert.alert(
            'Payment process',
            result.data.data.msg,
            [
              {text: 'OK', onPress: ()=>navigation.navigate('Home')}
            ],
            {cancelable: true},
          );
        }
      }
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: All fields are required ');
    } 
    setIsLoading(false);
    
  }

  if (!customer) return null;
  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <ScrollView>
      <Spinner
          visible={isloading}
          textContent={'Loading...'}
          textStyle={globalStyles.spinnerTextStyle}
        />
        <LinearGradient
          colors={['#091923', '#202F58']}
          style={styles.linearGradient}></LinearGradient>
        <View style={styles.maincontent}>
          <View style={styles.viewTittle}>
            {/* <FooterHelpButton size={200} square={50} /> */}
            <Title style={styles.textTittle}>Summary</Title>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Name
            </Text>
            <Text
              style={
                globalStyles.textCondensedRegular
              }>{`${customer.firstname} ${customer.surname}`}</Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Mobile
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {customer.phone}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Email
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {customer.email}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Payment Ammount
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'AUD',
                }).format(payment.amount / 100)}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Card Number
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              ****-****-****-{cardDetails.values.number.toString().substring(cardDetails.values.number.toString().length-4, cardDetails.values.number.toString().length)}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Card Type
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {cardDetails.values.type}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Address
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {details.address}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              City
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {details.city}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text note style={globalStyles.textBold}>
              Postcode
            </Text>
            <Text style={globalStyles.textCondensedRegular}>
              {details.postcode}
            </Text>
          </View>
          <View style={globalStyles.containerCenter}>
          <Button style={styles.button} onPress={() => onSummaryHandle()} rounded>
            <Text style={styles.textButton}>Confirm</Text>
          </Button>
        </View>
        </View>
        {message && showAlert()}

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
    fontFamily: 'UniformExtraCondensed-Light',
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

export default Summary;
