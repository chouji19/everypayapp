import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {
  Container,
  Text,
  Button,
  Icon,
  Item,
  Title,
  Toast,
  // Textarea,
  Picker,
} from 'native-base';
import Textarea from 'react-native-textarea';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getCustomerInfoAppBE, validateTokenBE} from '../services/BEServices';

// import {Picker} from '@react-native-community/picker';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

const CardDetails = ({route, navigation}) => {
  const [message, setMessage] = useState(null);

  const {details, payment} = route.params;

  const [cardDetails, setCardDetails] = useState({})


  const handlePay = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        if(!cardDetails.valid){
          Alert.alert(
            'Card Detail',
            `Card not valid.`,
            [
              {
                text: 'OK',
              },
            ],
            {cancelable: false},
          );
          return;
        }
        navigation.navigate('Summary',{details, cardDetails, payment})
        // const customer = await getCustomerInfoAppBE(token);
        // if (customer.success) {
        //   const res = await messageHelpUser({
        //     email: customer.data.data.customer.email,
        //     message: comment,
        //     subject,
        //   });
        //   if (res.success) setMessage('message sent successfully');
        // } else {
        //   setMessage('Please login with your account before fill this form');
        // }
      }
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: All fields are required ');
    }
  };



  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <ScrollView>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}></LinearGradient>
      <View style={styles.maincontent}>
        <View style={styles.viewImage}>
          {/* <FooterHelpButton size={200} square={50} /> */}
          <Title style={styles.textTittle}>Card Info</Title>
        </View>
        <View style={styles.viewCreditCard}>
        <CreditCardInput onChange={(form) => setCardDetails(form)} />
        </View>
        <View style={globalStyles.containerCenter}>
          <Button style={styles.button} onPress={() => handlePay()} rounded>
            <Text style={styles.textButton}>Pay Now</Text>
          </Button>
        </View>
      </View>
      </ScrollView>
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 50,
  },
  textTittle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Uniform-Regular5',
    marginVertical: 5,
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
  inputradio: {
    backgroundColor: '#FFF',
    marginBottom: 20,

    marginTop: 10,
  },

  dropdownStyle: {
    fontSize: 20,
    padding: 10,
    marginVertical: 20,
    width: 350,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 10,
  },
  viewTextArea: {
    borderWidth: 0,
  },
  textareaContainer: {
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginVertical: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  loginTittle: {
    color: '#13293D',
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'Uniform-Regular5',
  },
  viewCreditCard: {
    marginVertical: 15,
  }
});

export default CardDetails;
