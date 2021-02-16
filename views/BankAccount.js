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
  DatePicker,
  ListItem,
  List,
  Left,
  Right, 
  Body,
} from 'native-base';
// import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import {StyleSheet} from 'react-native';
import {
  getAccounts,
  updateCustomerBank,
} from '../services/BEServices';
import Spinner from 'react-native-loading-spinner-overlay';

const BankAccount = () => {
  const [message, setMessage] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadInitialValues = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        const accounts = await getAccounts(token);
        setIsLoading(false);
        setBankAccounts(accounts.data);
      }
      setIsLoading(false);
    };
    loadInitialValues();
  }, []);

  async function submithandle(account) {
    try {
      // if (incomefrequency.trim() === '' || employmenttype.trim() === '') {
      //   setMessage('All fields are required');
      //   return;
      // }
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      }
      let splitpaymentId = account.splitpaymentId || null;

      const customer = {
        defaultAccounts: [account],
        cancelled: false,
        splitpaymentId,
      };
      var resUpdate = await updateCustomerBank(customer, token);
      //var res = await createSplitAccount(token);
      if (resUpdate.success) {
        navigation.navigate('Home');
      }else{
        var error = resUpdate.uncontrolled
          ? resUpdate.error
          : resUpdate.data.error;
        setErrorMessage(error);
        setMessage(error);
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
      setMessage('Error: Bank Account not valid');
    }
  }

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  if (!bankAccounts)
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={globalStyles.spinnerTextStyle}
      />
    );

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#F9F9F9'}]}>
      <View style={globalStyles.content}>
        <View style={globalStyles.containerMain}>
          <Image
            style={[styles.loginImage]}
            source={require('../assets/img/account.png')}
          />
          <Text style={styles.loginTittle}>
            Choose the account your income is deposited into. We will deposit
            and take payments from this account
          </Text>
        </View>
        <Form style={styles.form}>
          <ScrollView style={styles.formItem}>
            {bankAccounts.length > 0 &&
            bankAccounts.filter(
              (account) => account.accountType === 'transaction',
            ).length === 0 ? (
              <div>No transactions account found</div>
            ) : (
              <List>
                {
                  // accounts.map(account => (
                  bankAccounts
                    .filter((account) => account.accountType === 'transaction')
                    .map((account) => (
                      <ListItem key={account.id} style={{margin: 5}}>
                        {/* <input
                          type="radio"
                          value={account.accountNumber}
                          className="w-form-formradioinput w-radio-input block"
                          onChange={handleChange}
                          checked={accountSelected === account.accountNumber}
                          // onChange={e => console.log(e.target.value)}
                        /> */}
                        {/* <Left>
                          <Icon
                            name="ellipse"
                            style={{
                              color: 'green',
                            }}
                          />
                        </Left> */}
                        <Body>
                          <Text>{account.name}</Text>
                          <Text
                            note
                            numberOfLines={1}>{`  $${account.balance}`}</Text>
                        </Body>
                        <Right>
                          <Button transparent onPress={() => submithandle(account)}>
                            <Text>Select</Text>
                          </Button>
                        </Right>
                      </ListItem>
                    ))
                }
              </List>
            )}
          </ScrollView>
          {/* <View style={globalStyles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => submithandle()}
              rounded>
              <Text style={styles.textButton}>Submit</Text>
            </Button>
          </View> */}

          {message && showAlert()}
        </Form>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#13293D',
    fontSize: 20,
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
  formItem: {
    display: 'flex',
    borderRadius: 10,
    borderColor: '#13293D',
    borderWidth: 1,
    padding: 10,
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default BankAccount;
