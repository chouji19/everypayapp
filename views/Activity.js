import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Container,
  Title,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PaymentList from '../components/PaymentList'
import { validateTokenBE,getCustomerData } from '../services/BEServices';

const Activity = () => {

  const navigation = useNavigation();

  const [prevPayments, setPrevPayments] = useState([]);
  const [message, setMessage] = useState(null);

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
          const customers = await getCustomerData(token);
          if (customers.success) {
            setPrevPayments(customers.data.data.previouspayments);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadInitialValues();
  }, []);


  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#F4F4F4'}]}>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}></LinearGradient>
      <View style={styles.maincontent}>
        <Title style={styles.textTittle}>Activity</Title>
        <PaymentList prevPayments={prevPayments} />
      </View>

      {/* <FooterMenu buttonActive={'Activity'} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 130,
    paddingLeft: 15,
    paddingRight: 15,
    
  },
  maincontent: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // marginHorizontal: '3%',
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  viewImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textTittle: {
    color: 'black',
    fontSize: 25,
    marginVertical: 10,
    textTransform: 'uppercase',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'UniformExtraCondensed-Light'
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
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Activity;
