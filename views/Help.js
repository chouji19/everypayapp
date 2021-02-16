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
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
// import {Picker} from '@react-native-community/picker';
import {getCustomerInfoAppBE, messageHelpUser} from '../services/BEServices';

const Help = () => {
  const [message, setMessage] = useState(null);
  const [subject, setSubject] = useState('Payments');
  const [comment, setComment] = useState('');

  const navigation = useNavigation();



  const handleSendMessage = async () => {
    try {
      if (!comment) {
        setMessage('All fields are required');
        return;
      }
      const token = await AsyncStorage.getItem('tokenCustomer');
      if (!token) {
        navigation.navigate('Login');
      } else {
        const customer = await getCustomerInfoAppBE(token);
        if (customer.success) {
          const res = await messageHelpUser({
            email: customer.data.data.customer.email,
            message: comment,
            subject,
          });
          if (res.success) setMessage('message sent successfully');
        } else {
          setMessage('Please login with your account before fill this form');
        }
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
            <Image
              style={[styles.image]}
              source={require('../assets/img/HelpIcon.png')}
            />
            <Title style={styles.textTittle}>How can we help you?</Title>
          </View>
          <View style={{marginHorizontal: '3%'}}>
            {/* <View style={styles.combobox}> */}
            <Picker
              mode="dropdown"
              iosHeader="Frequency"
              value={subject}
              style={globalStyles.combobox}
              iosIcon={
                <Icon
                  name="chevron-down-circle"
                  style={{color: '#000', fontSize: 25}}
                />
              }
              selectedValue={subject}
              onValueChange={(e) => setSubject(e)}>
              <Picker.Item label="Payments" value="Payments" />
              <Picker.Item
                label="Update Account Details"
                value="Update Account Details"
              />
              <Picker.Item label="Hardship" value="Hardship" />
              <Picker.Item
                label="Log In/Account Access"
                value="Log In/Account Access"
              />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <View style={styles.viewTextArea}>
              <Text style={[globalStyles.textRegular, {marginLeft: 10}]}>Message: </Text>
              {/* <Item inlineLabel last style={styles.inputradio}> */}
                <Textarea
                  containerStyle={styles.textareaContainer}
                  onChangeText={(texto) => setComment(texto)}
                  value={comment}
                  // rounded
                  rowSpan={5}
                  style={styles.textarea}
                />
              {/* </Item> */}
            </View>
            <View style={globalStyles.containerCenter}>
              <Button
                style={styles.button}
                onPress={() => handleSendMessage()}
                rounded>
                <Text style={styles.textButton}>Send</Text>
              </Button>
            </View>
          </View>
        </View>
        {/* </View> */}
        {message && showAlert()}
      </ScrollView>
      {/* <FooterMenu buttonActive={'Help'} /> */}
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
  },
  textTittle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Uniform-Regular5',
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
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

export default Help;
