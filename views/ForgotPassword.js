import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
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
  loginCustomerEP,
  validateCustomerEmail,
  validateCustomerCode,
  validateTokenBE,
  recoverPasswordCustomer,
} from '../services/BEServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = () => {
  // const [email, setEmail] = useState('your.email+fakedata51111@gmail.com');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [showValidationCode, setShowValidationCode] = useState(false);
  const [validationCode, setValidationCode] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (token) {
        const res = await validateTokenBE(token);
        if (res.success) navigation.navigate('Home');
        else await AsyncStorage.removeItem('tokenCustomer');
      }
    };
    checkSession();
  }, []);

  const sendValidationCode = async () => {
    if (email.trim() === '') {
      setMessage('Username and password are required');
      return;
    }
    try {
      const res = await recoverPasswordCustomer({
        email,
      });
      if (res.success) {
        setShowValidationCode(true);
      } else {
        setMessage(res.error);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  async function validateCode() {
    try {
      if (!validationCode) {
        setMessage('Validation code cannot be empty');
        return;
      }
      const res = await validateCustomerCode({
        email,
        codevalidation: validationCode,
      });
      if (res.success) {
        navigation.navigate('NewPassword');
      } else {
        setMessage(res.msg);
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
      <View style={globalStyles.content}>
        <KeyboardAwareScrollView>
          <View style={globalStyles.containerMain}>
            <Image
              style={[styles.loginImage]}
              source={require('../assets/img/EverypayLogo.png')}
            />
            <Text style={styles.loginTittle}>Recover your password</Text>
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
            <ScrollView>
              <Item inlineLabel last style={globalStyles.input} rounded>
                <Icon active name="mail-outline" />
                <Input
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text.toLowerCase())}
                  value={email}
                />
              </Item>
              {!showValidationCode && (
                <View style={globalStyles.containerCenter}>
                  <Button
                    style={styles.button}
                    onPress={() => sendValidationCode()}
                    rounded>
                    <Text style={styles.textButton}>Continue</Text>
                  </Button>
                </View>
              )}
              {showValidationCode && (
                <>
                  <Item inlineLabel last style={globalStyles.input} rounded>
                    <Icon active name="ellipsis-horizontal-outline" />
                    <Input
                      // secureTextEntry={showPassword ? false : true}
                      placeholder="Validation Code"
                      onChangeText={(texto) => setValidationCode(texto)}
                    />
                  </Item>
                  <View style={globalStyles.containerCenter}>
                    <Button
                      style={styles.button}
                      onPress={() => validateCode()}
                      rounded>
                      <Text style={styles.textButton}>Validate</Text>
                    </Button>
                  </View>
                </>
              )}
            </ScrollView>
            {message && showAlert()}
          </Form>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#13293D',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginTop: 60,
  },
  button: {
    backgroundColor: '#54B1E4',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  loginImage: {
    width: 150,
    height: 150,
    // marginHorizontal: '50%',
    marginTop: 150,
  },
});

export default ForgotPassword;
