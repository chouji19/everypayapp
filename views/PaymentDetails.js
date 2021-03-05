import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
  Icon,
  Label,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import {
  validateCustomerExist,
  saveCustomer,
  saveCustomerBasiq,
  validateTokenBE,
  getCustomerInfoAppBE,
} from '../services/BEServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PaymentDetails = ({route, navigation}) => {
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [validationCode, setValidationCode] = useState('');

  const {payment} = route.params;


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
            setAddress(
              customers.data.data.customer.useraddress[0]
                ? customers.data.data.customer.useraddress[0].addressLine1
                : '',
            );
            setCity(
              customers.data.data.customer.useraddress[0]
                ? customers.data.data.customer.useraddress[0].city
                : '',
            );
            setPostcode(
              customers.data.data.customer.useraddress[0]
                ? customers.data.data.customer.useraddress[0].postcode
                : '',
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadInitialValues();
  }, []);

  async function signuphandle() {
    try {
      if (
        postcode.trim() === '' ||
        address.trim() === '' ||
        city.trim() === ''
      ) {
        setMessage('All fields are required');
        return;
      }
      navigation.navigate('CardDetails', {details: {postcode, address, city}, payment});
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: Login failed please try again');
    }
  }

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#ECFFFF'}]}>
      <KeyboardAwareScrollView>
        <View style={globalStyles.content}>
          <View style={globalStyles.containerMain}>
            <Image
              style={[styles.loginImage]}
              source={require('../assets/img/EverypayLogo.png')}
            />
            <Text style={styles.loginTittle}>Billing Info</Text>
          </View>
          <Form style={styles.form}>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Label>City:</Label>
              <Input onChangeText={(text) => setCity(text)} value={city} />
            </Item>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Label>Address:</Label>
              <Input
                onChangeText={(text) => setAddress(text)}
                value={address}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Label>Postcode:</Label>
              <Input
                onChangeText={(text) => setPostcode(text.toLowerCase())}
                value={postcode}
              />
            </Item>
            <View style={globalStyles.containerCenter}>
              <Button
                style={styles.button}
                onPress={() => signuphandle()}
                rounded>
                <Text style={styles.textButton}>Continue</Text>
              </Button>
            </View>

            {message && showAlert()}
          </Form>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#13293D',
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'Uniform-Regular5',
  },
  form: {
    marginTop: 60,
  },
  button: {
    backgroundColor: '#FFDD5F',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Uniform-ExtraCondensed2',
  },
  loginImage: {
    width: 150,
    height: 150,
    marginHorizontal: '50%',
    marginTop: 100,
  },
});

export default PaymentDetails;
