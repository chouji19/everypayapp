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
} from '../services/BEServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [validationCode, setValidationCode] = useState('');

  const navigation = useNavigation();

  async function signuphandle() {
    try {
      if (
        email.trim() === '' ||
        surname.trim() === '' ||
        name.trim() === '' ||
        phone.trim() === ''
      ) {
        setMessage('All fields are required');
        return;
      }
      if (
        await validateCustomerExist({
          email,
          phone,
        })
      ) {
        setMessage('User already registered');
        return;
      }
      const res = await saveCustomer({
        firstname: name,
        surname,
        phone,
        email,
        agreepolicy: true,
        agreetemrsuse: true,
      });
      const resBasiq = saveCustomerBasiq();
      if (res.success) {
        navigation.navigate('Income');
      } else {
        setMessage(res.error);
      }
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
            <Text style={styles.loginTittle}>register to everypay</Text>
            <Text>
              or{' '}
              <Text
                style={{color: '#4FB0E6'}}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </View>
          <Form style={styles.form}>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Input
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Input
                placeholder="Surname"
                onChangeText={(text) => setSurname(text)}
                value={surname}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Input
                placeholder="Email"
                onChangeText={(text) => setEmail(text.toLowerCase())}
                value={email}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input} rounded>
              <Input
                placeholder="Phone"
                onChangeText={(text) => setPhone(text)}
                value={phone}
              />
            </Item>
            <View style={globalStyles.containerCenter}>
              <Button
                style={styles.button}
                onPress={() => signuphandle()}
                rounded>
                <Text style={styles.textButton}>Sign Up</Text>
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
    fontFamily: 'Uniform-Regular5'
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
    fontFamily: 'Uniform-ExtraCondensed2'
  },
  loginImage: {
    width: 150,
    height: 150,
    marginHorizontal: '50%',
    marginTop: 100,
  },
});

export default Signup;
