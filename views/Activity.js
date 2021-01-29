import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Container,
  Text,
  Button,
  Icon,
  Item,
  Title,
  Toast,
  Textarea,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';
import PaymentList from '../components/PaymentList'

const Activity = () => {
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    
    try {
      
    } catch (error) {
      setMessage(error.message);
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
    <Container style={[globalStyles.container, {backgroundColor: '#F4F4F4'}]}>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}></LinearGradient>
      <View style={styles.maincontent}>
        <Title style={styles.textTittle}>Activity</Title>
        <PaymentList />
      </View>

      <FooterMenu buttonActive={'Activity'} />
    </Container>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 130,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  maincontent: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: '3%',
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
    fontWeight: 'bold',
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
