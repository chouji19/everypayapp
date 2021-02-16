import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {
  Container,
  Text,
  Title,
  Toast,
} from 'native-base';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PaymentList from '../components/PaymentList';
import {
  getCustomerData,
  updateCustomerStatusByUser,
  requestGetDailyPayment,
  validateTokenBE,
} from '../services/BEServices';
import {formatDate} from '../utils/Utils';
import Balance from '../components/Balance';
import Spinner from 'react-native-loading-spinner-overlay';

const Home = ({navigation}) => {
  // const navigation = useNavigation();

  const [budget, setBudget] = useState(0);
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState(null);
  const [prevPayments, setPrevPayments] = useState([]);
  const [dailyPayments, setDailyPayments] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeDailyPayments, setActiveDailyPayments] = useState(false);
  const [dailyPaymentStatus, setDailyPaymentStatus] = useState(null);
  const [divLoading, setDivLoading] = useState(false)

  useEffect(() => {
    const loadInitialValues = async () => {
      try {
        setDivLoading(true);
        const token = await AsyncStorage.getItem('tokenCustomer');
        if (!token) {
          navigation.navigate('Login');
        } else {
          const res = await validateTokenBE(token);
          if (!res.success) {
            navigation.navigate('Login');
          }
          const customers = await getCustomerData(token);
          if (customers.success) {
            setCustomer(customers.data.data.customer);
            setDailyPaymentStatus(
              customers.data.data.customer.dailypaymentsactive,
            );
            if (customers.data.data.lastpayment)
              setPayment(customers.data.data.lastpayment);
            else
              setPayment({
                metadata: { basicAmount: 0},
                amount: 0,
                
              })
            setPrevPayments(customers.data.data.previouspayments);
            // setDailyPayments(customers.data.data.dailypayments);
            if (customers.data.data.lastpayment) {
              formatDate(customers.data.data.lastpayment.paydate);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      setDivLoading(false);
    };
    loadInitialValues();
  }, [dailyPaymentStatus, navigation]);

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
            onPress: () =>
              changeDailyPaymentStatus(!customer.dailypaymentsactive),
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

  if (!customer || !payment) return <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />;

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#F4F4F4'}]}>
      <Spinner
          visible={divLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <ScrollView >

      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}>
        <View style={styles.viewTittle}>
          <Image
            style={[styles.image]}
            source={require('../assets/img/everypaywhite.png')}
          />
          <View style={styles.viewHiUser}>
            <Text style={styles.textHeadTittle}>
              Hi {customer.firstname}!
            </Text>
            <Text style={styles.textHeadWelcome}>
              Welcome to the EverydayPay app.
            </Text>
          </View>
        </View>
      </LinearGradient>
      <Balance customer={customer} payment={payment} />
        <View style={styles.maincontent}>
        <View style={styles.viewCont}>
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
        <PaymentList prevPayments={prevPayments} />
        </View>
      </ScrollView>
      {message && showAlert()}
      {/* <FooterMenu buttonActive={'Home'} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  linearGradient: {
    height: 200,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'UniformExtraCondensed-Light',
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
    marginTop: 30,
    backgroundColor: 'transparent',
    marginBottom: 0
    // backgroundColor: 'red',
  },
  viewCont: {
    height: 200,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    marginBottom: 10
    // backgroundColor: 'red',
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  imageyellow: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  textHeadTittle: {
    color: 'white',
    fontSize: 32,
    // fontWeight: '400',
    fontFamily: 'UniformExtraCondensed-Light'
  },
  textHeadWelcome: {
    color: '#4FB0E6',
    fontSize: 18,
    // fontWeight: '400',
    fontFamily: 'UniformExtraCondensed-Light'
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
    height: 150,
    width: 120,
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
    marginBottom: 10,
    fontFamily: 'UniformExtraCondensed-Light'
  },
  textYellowButtons: {
    color: '#5B6B79',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'UniformExtraCondensed-Light'
  },
});

export default Home;
