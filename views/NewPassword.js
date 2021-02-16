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
  updateCustomerPassword
} from '../services/BEServices';

const NewPassword = () => {
  const [email, setEmail] = useState('your.email+fakedata63101@gmail.com');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const navigation = useNavigation();

  

  async function passwordFormHandle() {
    try {
      if (password.trim() === '' || repeatPassword.trim() === '') {
        setMessage('Password not valid');
        return;
      }
      if (password.trim() !== repeatPassword.trim()) {
        setMessage('Passwords do not match');
        return;
      }

      var lowerCaseLetters = /[a-z]/g;
      if (!password.match(lowerCaseLetters)) {
        setMessage('Password debe contener al menos una letra a-z');
        return;
      } 
      if (password.length < 6) {
        setMessage('password must contain at least 6 characters');
        return;
      }
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      const res = await updateCustomerPassword(token, password);
      if (res.success) {
        if (res.data.usercomplete) navigation.navigate('Home');
        else navigation.navigate('BankAccount');
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
      // buttonText: 'OK',
      duration: 3000,
    });
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#ECFFFF'}]}>
      <View style={globalStyles.content}>
        <View style={[globalStyles.containerMain, {marginHorizontal: 10}]}>
          <Text style={styles.passTittle}>Please insert your new password</Text>
          <Text note style={styles.passNote}>
            the password must contain at least 6 characters including numbers
            and letters
          </Text>
        </View>
        <Form style={styles.form}>
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
          <Item inlineLabel last style={globalStyles.input} rounded>
            <Icon active name="lock-closed-outline" />
            <Input
              secureTextEntry={showRepeatPassword ? false : true}
              placeholder="Repeat Password"
              onChangeText={(texto) => setRepeatPassword(texto)}
            />
            <Icon
              active
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowRepeatPassword(!showRepeatPassword)}
              style={{marginRight: 5}}
            />
          </Item>
          <View style={globalStyles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => passwordFormHandle()}
              rounded>
              <Text style={styles.textButton}>Update password</Text>
            </Button>
          </View>
          {message && showAlert()}
        </Form>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  passTittle: {
    color: '#13293D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passNote: {
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
    marginHorizontal: '50%',
  },
});

export default NewPassword;
