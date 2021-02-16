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
  // DatePicker,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  processRules,
  createvalidationcode,
  validateCustomerConnectionAndCode,
} from '../services/BEServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Validationcode = () => {
  const [message, setMessage] = useState(null);
  const [codevalidation, setCodevalidation] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const navigation = useNavigation();

  async function formhandle() {
    try {
      setIsLoading(true);

      if (codevalidation.trim() === '') {
        setMessage('Validation code cannot be empty');
        setIsLoading(false);
        return;
      }
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
      }
      var data = {
        codevalidation: codevalidation,
      };
      var res = await validateCustomerConnectionAndCode(data, token);
      if (res.success) {
        var resRules = await processRules(token);
        if (resRules.success) {
          // setMessage('');
          navigation.navigate('Endmessage');
        }
      }else{
        setMessage(res.data.msg);
      }
      // const res = await updateCustomerData(token, {
      //   incomefrequency,
      //   employementtype: employmenttype,
      //   paydate: calculateNextPayDate(
      //     datelastpay,
      //     incomefrequency,
      //   ).toDateString(),
      //   lastpaydate: datelastpay.toDateString(),
      // });
      // if (res.success) {
      //   navigation.navigate('ConnectMessage');
      // } else {
      //   setMessage(res.error);
      // }
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: Income information not valid');
    }
    setIsLoading(false);
    
  }

  const resendCode = async (e) => {
    setMessage('Sending a new code');
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      navigation.navigate('Login');
    }
    setTimeout(() => {
      var res = createvalidationcode(token);
    }, 2000);
  };

  const BankListBack = () => {
    AsyncStorage.removeItem('bank');
    navigation.navigate('Banklist');
  };

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#F9F9F9', paddingTop: 30}]}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={globalStyles.spinnerTextStyle}
      />
      <KeyboardAwareScrollView>
        <View style={globalStyles.content}>
          <View style={globalStyles.containerMain}>
            <Image
              style={[styles.loginImage]}
              source={require('../assets/img/SMS.png')}
            />
            <Text style={styles.loginTittle}>Check your phone</Text>
          </View>
          <View style={globalStyles.containerMain}>
            <Form style={styles.form}>
              <View style={styles.formItem}>
                <Text style={styles.formText}>
                  We sent a 6 digit verification code to your mobile number
                </Text>
                <Item inlineLabel last style={globalStyles.input} rounded>
                  <Input
                    onChangeText={(text) => setCodevalidation(text)}
                    keyboardType="number-pad"
                    value={codevalidation}
                  />
                </Item>
              </View>
              <Text style={{textAlign: 'center', marginVertical: 5}}>
                You didn't receive it?
                <Text style={{color: '#4FB0E6'}} onPress={() => resendCode()}>
                  {' '}
                  Send again{' '}
                </Text>
              </Text>

              <View style={globalStyles.containerCenter}>
                <Button
                  style={styles.button}
                  onPress={() => formhandle()}
                  rounded>
                  <Text style={styles.textButton}>Continue</Text>
                </Button>
              </View>

              {message && showAlert()}
            </Form>
          </View>
        </View>
          </KeyboardAwareScrollView>
        <View style={globalStyles.containerCenter}>
          <Button
            style={styles.buttonBlack}
            onPress={() => BankListBack()}
            rounded>
            <Text style={styles.textButton}>Back</Text>
          </Button>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#13293D',
    fontSize: 30,
    textTransform: 'uppercase',
    fontFamily: 'Uniform-Condensed5'
  },
  buttonBlack: {
    backgroundColor: '#000',
    marginTop: 10,
    paddingHorizontal: 10,
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
    marginTop: 100,
  },
  formItem: {
    display: 'flex',
  },
  formText: {
    // fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    fontFamily: 'UniformExtraCondensed-Light' 

  },
});

export default Validationcode;
