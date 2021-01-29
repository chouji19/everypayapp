import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Form,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Left,
  Body,
  Right,
  Title,
  Toast,
  Picker,
  ActionSheet,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
import PaymentList from '../components/PaymentList';
import {
  getCustomerData,
  updateCustomerStatusByUser,
  requestGetDailyPayment,
} from '../services/BEServices';
import {formatDate} from '../utils/Utils';
import Balance from '../components/Balance';

const Home = () => {
  const navigation = useNavigation();

  const [budget, setBudget] = useState(0);
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState(null);
  const [prevPayments, setPrevPayments] = useState([]);
  const [dailyPayments, setDailyPayments] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeDailyPayments, setActiveDailyPayments] = useState(false);
  const [dailyPaymentStatus, setDailyPaymentStatus] = useState(null);

  useEffect(() => {
    const loadInitialValues = async () => {
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        const customers = await getCustomerData(token);
        console.log(customers.data.data.lastpayment);
        if (customers.success) {
          setCustomer(customers.data.data.customer);
          setDailyPaymentStatus(
            customers.data.data.customer.dailypaymentsactive,
          );
          if (customers.data.data.lastpayment)
            setPayment(customers.data.data.lastpayment);
          setPrevPayments(customers.data.data.previouspayments);
          setDailyPayments(customers.data.data.dailypayments);
          if (customers.data.data.lastpayment) {
            formatDate(customers.data.data.lastpayment.paydate);
          }
        }
      }
    };
    loadInitialValues();
  }, [dailyPaymentStatus]);

  const changeDailyPaymentStatus = async (status) => {
    try {
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        await updateCustomerStatusByUser(token, {
          dailypaymentsactive: status,
        });
        if (status) await requestGetDailyPayment(token);
        setDailyPaymentStatus(!dailyPaymentStatus);
        // setTimeout(() => {
        // }, 4000);
      }
    } catch (error) {}
  };

  const changeActiveDailyPaymentsHandle = async () => {
    if (customer.status === 0 && customer.rulesResult) {
      setMessage(null);
      Alert.alert(
        'Daily payments activation',
        `Are you sure you want to ${
          customer.dailypaymentsactive ? 'pause' : 'activate'
        } your daily payments?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => changeDailyPaymentStatus(!customer.dailypaymentsactive),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Daily payments activation',
        `Ups, Your account doesn't meet the criteria to activate daily payments at this time.`,
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    }
  };

  

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  

  if (!customer) return null;
  if (!payment) return null;

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#F4F4F4'}]}>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}>
        <View style={styles.viewTittle}>
          <Image
            style={[styles.image]}
            source={require('../assets/img/everypaywhite.png')}
          />
          <View style={styles.viewHiUser}>
            <Title style={styles.textHeadTittle}>
              Hi {customer.firstname}!
            </Title>
            <Title style={styles.textHeadWelcome}>
              Welcome to the everypay app.
            </Title>
          </View>
        </View>
      </LinearGradient>
     <Balance customer={customer} payment={payment}/>
     <View style={styles.maincontent}>
        <View style={styles.viewTittle}>
          <TouchableOpacity onPress={() => navigation.navigate('Cashboost')}>
            <View style={styles.viewactions}>
              <Image
                style={[styles.imageyellow]}
                source={require('../assets/img/cashboostyellow.png')}
              />
              <Text style={styles.textYellowButtons}>Request cash boost</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeActiveDailyPaymentsHandle()}>
            <View style={styles.viewactions}>
              <Image
                style={[styles.imageyellow]}
                source={require('../assets/img/cashbuttonyellow.png')}
              />
              <Text style={styles.textYellowButtons}>
                {!dailyPaymentStatus ? 'Activate' : 'Pause'} Daily Payments
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.textActivity}>Activity</Text>
        <PaymentList />
      </View>
      {message && showAlert()}
      <FooterMenu buttonActive={'Home'} />
    </Container>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 200,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 30,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  maincontent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  viewTittle: {
    height: 200,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  imageyellow: {
    width: 130,
    height: 130,
    marginHorizontal: 10,
  },
  textHeadTittle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
  },
  textHeadWelcome: {
    color: '#4FB0E6',
    fontSize: 15,
    fontWeight: '400',
  },
  viewHiUser: {
    marginTop: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewactions: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 180,
    width: 150,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowBorder: {
    padding: 20,
    backgroundColor: '#FFDD61',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  textActivity: {
    color: '#5B6B79',
    marginVertical: 5,
  },
  textYellowButtons: {
    color: '#5B6B79',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
