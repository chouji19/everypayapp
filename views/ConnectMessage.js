import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {
  Container,
  Button,
  Text,
  Toast,
} from 'native-base';
// import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import {StyleSheet} from 'react-native';


const ConnectMessage = () => {

  const navigation = useNavigation();


  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#12293E'}]}>
        <View style={globalStyles.content}>
        <View style={globalStyles.containerMain}>
          <Image
            style={[styles.loginImage]}
            source={require('../assets/img/card.png')}
          />
          <Text style={styles.loginTittle}>You are almost there!</Text>
        </View>
        <View style={globalStyles.containerCenter}>
          <Button style={styles.button} onPress={() => navigation.navigate('Banklist')} rounded>
            <Text style={styles.textButton}>continue</Text>
          </Button>
        </View>
        <View style={globalStyles.containerMain}>
          <View style={{flexDirection: 'row', marginVertical: 25}}>
            <Text style={styles.textSubtitle}>
              Connect to your Bank so you can:
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={[styles.liimage]}
              source={require('../assets/img/Next.png')}
            />
            <Text style={styles.textUl}>
              Get access to your money in advance.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={[styles.liimage]}
              source={require('../assets/img/Next.png')}
            />
            <Text style={styles.textUl}>
              Know how much money you can access.
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Image
              style={[styles.liimage]}
              source={require('../assets/img/Next.png')}
            />
            <Text style={styles.textUl}>Make repayments much easier.</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 35}}>
            <Text
              style={{color: '#4FB0E6', textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('Login')}>
              HOW WE PROTECT YOUR DATA?
            </Text>
          </View>
        </View>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#FFF',
    fontSize: 28,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textSubtitle: {
    color: '#FFF',
    fontSize: 22,
    marginVertical: 15,
  },
  textUl: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'left',
    marginVertical: 5,
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
  liimage: {
    width: 35,
    height: 35,
    // marginHorizontal: '50%',
  },
  formItem: {
    display: 'flex',
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default ConnectMessage;
