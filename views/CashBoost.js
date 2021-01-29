import React, {useState, useEffect} from 'react';
import {View, Alert, TouchableOpacity, StyleSheet, Image} from 'react-native';
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
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
import {createCashBoostPayment, getCustomerData} from '../services/BEServices';
import { formatDate } from '../utils/Utils';
import Balance from '../components/Balance';


const CashBoost = () => {
  const [message, setMessage] = useState(null);
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState(null);
  const [causeRefresh, setCauseRefresh] = useState(false)

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
          if (customers.data.data.lastpayment)
            setPayment(customers.data.data.lastpayment);
          if (customers.data.data.lastpayment) {
            formatDate(customers.data.data.lastpayment.paydate);
          }
        }
      }
    };
    loadInitialValues();
  }, [causeRefresh]);

  const navigation = useNavigation();

  const handleCashBoostSubmit = async (amount) => {
    try {
      Alert.alert(
        'Cash Boost Request',
        `Are you sure you want to make a cash boost for $${amount}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => processCashBoost(amount)},
        ],
        {cancelable: false},
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const processCashBoost = async (amount) => {
    const token = await AsyncStorage.getItem('tokenCustomer');
    if (!token) {
      navigation.navigate('Login');
    } else {
      const result = await createCashBoostPayment(token, {
        amount,
      });
      if (result.data.success) {
        setMessage(result.data.msg);
        setCauseRefresh(!causeRefresh);
      } else {
        setMessage(
          'There was not possible to create the payment, verify you have enough budget to make the cash boost request',
        );
      }
    }
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
            <Title style={styles.textHeadTittle}>Hi Rok!</Title>
            <Title style={styles.textHeadWelcome}>
              Welcome to the everypay app.
            </Title>
          </View>
        </View>
      </LinearGradient>
      <Balance customer={customer} payment={payment}/>
      <View style={styles.maincontent}>
        <View style={[globalStyles.containerCenter, {marginTop: 30}]}>
          <Image
            style={[styles.imageyellow]}
            source={require('../assets/img/cashboostyellow.png')}
          />
          <Title style={styles.textTittle}>request cash boost</Title>
        </View>
        <View style={styles.viewReqTittle}>
          <TouchableOpacity onPress={() => handleCashBoostSubmit(20)}>
            <View style={styles.viewactions}>
              <Text style={styles.textYellowButtons}>$20</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCashBoostSubmit(50)}>
            <View style={styles.viewactions}>
              <Text style={styles.textYellowButtons}>$50</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCashBoostSubmit(100)}>
            <View style={styles.viewactions}>
              <Text style={styles.textYellowButtons}>$100</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.contentHome}>
          <Text note style={{textAlign: 'center', marginBottom: 10}}>
            The money will be depositated in your XX Bank account
          </Text>
          <View style={globalStyles.containerCenter}>
            <Image
              style={[styles.imageeverypay]}
              source={require('../assets/img/everypay_logo.png')}
            />
          </View>
        </View>
      </View>
      {message && showAlert()}

      <FooterMenu buttonActive={'Cashboost'} />
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
  maincard: {
    marginTop: -30,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginHorizontal: '5%',
    borderRadius: 35,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    minHeight: 150,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 35,
  },
  TextUpper: {
    color: '#12293E',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 25,
    width: '100%',
    backgroundColor: '#4C5870',
    borderColor: '#4C5870',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 5,
  },
  internalBar: {
    height: 20,
    backgroundColor: '#4FB0E6',
    borderWidth: 0,
    borderRadius: 15,
  },
  maincardView: {
    marginHorizontal: 40,
    marginTop: 10,
    marginLeft: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
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
  viewReqTittle: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
  },
  viewAvailable: {
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    height: 100,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  viewAvailableContent: {
    height: 70,
    color: 'blue',
    display: 'flex',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  imageyellow: {
    width: 80,
    height: 80,
  },
  imageeverypay: {
    width: 150,
    height: 30,
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
    borderRadius: 40,
    height: 100,
    width: 100,
    backgroundColor: '#FFDD61',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textYellowButtons: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textEstRepayment: {
    color: '#5B6B79',
    fontSize: 12,
    textAlign: 'center',
  },
  textTittle: {
    // marginTop: 30,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  viewIntFooter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2.5%',
  },
});

export default CashBoost;
