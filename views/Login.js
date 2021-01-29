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
  loginCustomerEP,
  validateCustomerEmail,
  validateCustomerCode,
} from "../services/BEServices";

const Login = () => {
  const [email, setEmail] = useState('your.email+fakedata63101@gmail.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showValidationCode, setShowValidationCode] = useState(false);
  const [validationCode, setValidationCode] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (token) {
        navigation.navigate('Home');
      }
    };
    checkSession();
  }, []);

  const emailHandle = async () => {
    if (email.trim() === '') {
      setMessage('Username and password are required');
      return;
    }
    try {
      const res = await validateCustomerEmail({
        email,
      });
      if (res.success) {
        if (res.userfirstlogin) {
          setShowValidationCode(true);
        } else {
          setShowPasswordField(true);
        }
      } else {
        setMessage(res.error);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  async function loginHandle() {
    try {
      if (email.trim() === '' || password.trim() === '') {
        setMessage('Username and password are required');
        return;
      }
      const res = await loginCustomerEP({
        email,
        password,
      });
      if (res.success) {
        // if (!res.connectionvalid) navigation.navigate('Updatebankdetails');
        // else 
        if (res.changePassword) navigation.navigate('NewPassword');
        else navigation.navigate('Home');
      } else {
        setMessage(res.error);
      }
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: Login failed please try again');
    }
  }

  async function validateCode() {
    try {
      console.log('validating.......');
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
        <View style={globalStyles.containerMain}>
          <Image
            style={[styles.loginImage]}
            source={require('../assets/img/EverypayLogo.png')}
          />
          <Text style={styles.loginTittle}>login to everypay</Text>
        </View>
        <Form style={styles.form}>
          <Item inlineLabel last style={globalStyles.input} rounded>
            <Icon active name="mail-outline" />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text.toLowerCase())}
              value={email}
            />
          </Item>
          {showPasswordField && (
            <>
              <Item inlineLabel last style={globalStyles.input} rounded>
                <Icon active name="lock-closed-outline" />
                <Input
                  secureTextEntry={showPassword ? false : true}
                  placeholder="Password"
                  onChangeText={(texto) => setPassword(texto)}
                />
                <Icon
                  active
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowPassword(!showPassword)}
                  style={{marginRight: 5}}
                />
              </Item>
              <View style={globalStyles.containerCenter}>
                <Button
                  style={styles.button}
                  onPress={() => loginHandle()}
                  rounded>
                  <Text style={styles.textButton}>Sign In</Text>
                </Button>
              </View>
            </>
          )}
          {!showPasswordField && !showValidationCode && (
            <View style={globalStyles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => emailHandle()}
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
          {message && showAlert()}
        </Form>
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
    marginHorizontal: '50%',
  },
});

export default Login;
