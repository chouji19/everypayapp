import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Container, Text, Button, Item, Toast, Form, Input} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createCustomerBank} from '../services/BEServices';
import SvgUri from 'react-native-svg-uri';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const User = () => {
  const [message, setMessage] = useState(null);
  const [bankSelected, setBankSelected] = useState(null);
  //TODO change default values
  // const [username, setUsername] = useState('richard');
  // const [password, setPassword] = useState('tabsnotspaces');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [secondLoginId, setSecondLoginId] = useState('');

  const navigation = useNavigation();


  useEffect(() => {
    const loadInitialValues = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('Login');
        } else {
          const bank = await AsyncStorage.getItem('bank');
          // console.log({bank})
          setBankSelected(JSON.parse(bank));
          // console.log(JSON.parse(bank));
          // console.log(JSON.parse(bank).logo.links.square);
          // console.log(JSON.parse(bank).logo.links.square.indexOf('.svg'));
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

  const BankListBack = () => {
    AsyncStorage.removeItem('bank');
    navigation.navigate('Banklist');
  };

  const handleSubmit = async () => {
    try {
      if (username.trim() === '' || password.trim() === '') {
        setMessage('All fields are required');
        return;
      }
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      var customer = {
        loginId: username,
        password,
        institutionId: bankSelected.id,
        securityCode: securityCode,
        secondaryLoginId: secondLoginId,
      };
      var res = await createCustomerBank(customer, token);
      if (res.success) {
        navigation.navigate('Validationcode');
      } else {
        var error = res.uncontrolled ? res.error : res.data.msg;
        setMessage(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!bankSelected) return null;
  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <KeyboardAwareScrollView>
        <LinearGradient
          colors={['#091923', '#202F58']}
          style={styles.linearGradient}></LinearGradient>
        <View style={styles.maincontent}>
          <View style={styles.containerMainTitle}>
            <Text style={styles.title}>{bankSelected.name}</Text>
          </View>
          {/* <ScrollView> */}
          <View style={globalStyles.content}>
            <Form style={styles.form}>
              <Text style={styles.formText}>{bankSelected.loginIdCaption}</Text>
              <Item inlineLabel last style={globalStyles.input} rounded>
                <Input
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                />
              </Item>
              <Text style={styles.formText}>
                {bankSelected.passwordCaption}
              </Text>
              <Item inlineLabel last style={globalStyles.input} rounded>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
              </Item>
              {bankSelected.securityCodeCaption && (
                <>
                  <Text style={styles.formText}>
                    {bankSelected.securityCodeCaption}
                  </Text>
                  <Item inlineLabel last style={globalStyles.input} rounded>
                    <Input
                      secureTextEntry={true}
                      onChangeText={(text) => setSecurityCode(text)}
                      value={securityCode}
                    />
                  </Item>
                </>
              )}
              {bankSelected.secondaryLoginIdCaption && (
                <>
                  <Text style={styles.formText}>
                    {bankSelected.secondaryLoginIdCaption}
                  </Text>
                  <Item inlineLabel last style={globalStyles.input} rounded>
                    <Input
                      secureTextEntry={true}
                      onChangeText={(text) => setSecondLoginId(text)}
                      value={secondLoginId}
                    />
                  </Item>
                </>
              )}
              <Text style={{textAlign: 'center', marginVertical: 5}}>
                I agree the
                <Text
                  style={{color: '#4FB0E6'}}
                  onPress={() =>
                    Linking.openURL(
                      `http://docs.basiq.io/en/articles/382581-basiq-privacy-policy`,
                    ).catch((err) => console.error('An error occurred', err))
                  }>
                  {' '}
                  User Terms &amp; Conditions{' '}
                </Text>{' '}
                and
                <Text
                  style={{color: '#4FB0E6', textAlign: 'center'}}
                  onPress={() =>
                    Linking.openURL(
                      `http://docs.basiq.io/en/articles/415750-basiq-terms-of-service`,
                    ).catch((err) => console.error('An error occurred', err))
                  }>
                  {' '}
                  Privacy Policy
                </Text>
              </Text>
              {message && showAlert()}
              <View style={globalStyles.containerCenter}>
                <Button
                  style={styles.button}
                  onPress={() => handleSubmit()}
                  rounded>
                  <Text style={styles.textButton}>Login</Text>
                </Button>
              </View>
            </Form>
          </View>
          {/* </ScrollView> */}
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
      {/* <FooterMenu buttonActive={'User'} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#13293D',
    fontSize: 25,
    marginVertical: 5,
    marginTop: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Uniform-Regular5',
    backgroundColor: 'white',
  },
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
    marginVertical: 30,
    backgroundColor: 'white',
  },
  textTittle: {
    color: '#54B1E4',
    fontSize: 40,
    fontWeight: '200',
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
  buttonBlack: {
    backgroundColor: '#000',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  bankImg: {
    width: 150,
    height: 150,
    marginVertical: 15,
    backgroundColor: 'black',
    resizeMode: 'stretch',
  },
  formItem: {
    display: 'flex',
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  form: {
    // marginTop: 60,
  },
  containerMainTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default User;
