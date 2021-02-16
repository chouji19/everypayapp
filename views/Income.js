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
  Picker,
  // DatePicker,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import {
  updateCustomerData,
  validateCustomerEmail,
  validateCustomerCode,
  validateTokenBE,
} from '../services/BEServices';

const Income = () => {
  const [incomefrequency, setIncomeFrequency] = useState('Weekly');
  const [employmenttype, setEmploymentType] = useState('Fulltime');
  const [datelastpay, setDatelastpay] = useState(new Date());
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();

  async function signuphandle() {
    try {
      if (incomefrequency.trim() === '' || employmenttype.trim() === '') {
        setMessage('All fields are required');
        return;
      }
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
      }
      const res = await updateCustomerData(token, {
        incomefrequency,
        employementtype: employmenttype,
        paydate: calculateNextPayDate(
          datelastpay,
          incomefrequency,
        ).toDateString(),
        lastpaydate: datelastpay,
      });
      if (res.success) {
         navigation.navigate('ConnectMessage');
      } else {
        setMessage(res.error);
      }
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: Income information not valid');
    }
  }

  const calculateNextPayDate = (paydateData, incomefrequency) => {
    let validDay = false;
    let today = new Date();

    let paydate = new Date(paydateData);
    if (today >= paydate) {
      paydate = getDatesAfterDate(paydate, incomefrequency);
    }
    //TODO Test for today and future payments creation
    do {
      if (today <= paydate) {
        validDay = true;
      } else {
        paydate = getDatesAfterDate(paydate, incomefrequency);
      }
    } while (!validDay);
    paydate.setHours(7, 0, 0, 0);
    return paydate;
  };

  const getDatesAfterDate = (date, incomefrequency) => {
    let daysAdd = 7;
    switch (incomefrequency) {
      case 'Fortnightly':
        daysAdd = 14;
        break;
      case 'Monthly':
        daysAdd = 30;
        break;
      default:
        daysAdd = 7;
        break;
    }
    var firstDate = new Date(date);
    //TODO change date with months issues
    var endDate = new Date(date);
    endDate.setDate(firstDate.getDate() + daysAdd);
    return endDate;
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
    <Container style={[globalStyles.container, {backgroundColor: '#F9F9F9'}]}>
      <View style={globalStyles.content}>
        <View style={globalStyles.containerMain}>
          <Image
            style={[styles.loginImage]}
            source={require('../assets/img/XYGraphic.png')}
          />
          <Text style={styles.loginTittle}>Income information</Text>
          <Text style={[styles.subTextTitle, {marginTop: 15}]}>In order to verify your information,</Text>
          <Text style={styles.subTextTitle}>please complete the following steps</Text>
        </View>
        <Form style={styles.form}>
          <ScrollView>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Income Frequency:</Text>
            <Picker
              mode="dropdown"
              iosHeader="Frequency"
              value={incomefrequency}
              style={globalStyles.combobox}
              iosIcon={
                <Icon
                  name="chevron-down-circle"
                  style={{color: '#000', fontSize: 25}}
                />
              }
              selectedValue={incomefrequency}
              onValueChange={(e) => setIncomeFrequency(e)}>
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Fortnightly" value="Fortnightly" />
              <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Employment type:</Text>
            <Picker
              mode="dropdown"
              iosHeader="Frequency"
              value={employmenttype}
              style={globalStyles.combobox}
              iosIcon={
                <Icon
                  name="chevron-down-circle"
                  style={{color: '#000', fontSize: 25}}
                />
              }
              selectedValue={employmenttype}
              onValueChange={(e) => setEmploymentType(e)}>
              <Picker.Item label="Casual" value="Casual" />
              <Picker.Item label="Full time" value="Fulltime" />
              <Picker.Item label="Centrelink" value="Centrelink" />
              <Picker.Item
                label="Part-time and Centrelink"
                value="PartTime-Centrelink"
              />
            </Picker>
          </View>
          <View style={styles.formItem}>
            <Text style={[styles.formText, {marginBottom: 10}]}>date of last payment:</Text>
            {/* <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date()}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              //modalTransparent={false}
              // animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Select date"
              textStyle={{color: 'blue'}}
              placeHolderTextStyle={{color: '#d3d3d3'}}
              onDateChange={(e) => setDatelastpay(e)}
              disabled={false}
            /> */}
            <DatePicker
              style={{width: 200}}
              date={datelastpay}
              mode="date"
              placeholder="select date"
              // format="YYYY-MM-DD"
              minDate={new Date(2018, 1, 1)}
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setDatelastpay(date);
              }}
              value={datelastpay}
            />
          </View>
          <View style={globalStyles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => signuphandle()}
              rounded>
              <Text style={styles.textButton}>Connect to your bank</Text>
            </Button>
          </View>

          {message && showAlert()}
        </ScrollView>
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
    fontFamily: 'Uniform-Regular5',
  },
  form: {
    marginTop: 20,
    marginHorizontal: '2.5%'
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
    fontFamily: 'Uniform-Regular5',
  },
  loginImage: {
    width: 150,
    height: 150,
    marginTop: 20
  },
  formItem: {
    display: 'flex',
  },
  formText: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginLeft: 10,
    fontFamily: 'UniformExtraCondensed-Light' 
  },
  subTextTitle: {
    marginBottom: 4,
    fontFamily: 'UniformExtraCondensed-Light' 
  }
});

export default Income;
