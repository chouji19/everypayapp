import React, {useState, useEffect} from 'react';
import {View, Image, Animated, Easing, ScrollView} from 'react-native';
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
} from 'native-base';
// import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';

const EndMessage = () => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const [message, setMessage] = useState(null);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });
  const navigation = useNavigation();

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#4FB0E6'}]}>
      <View style={globalStyles.content}>
        <View style={globalStyles.containerMain}>
          <View style={{flexDirection: 'row', marginVertical: 25}}>
            {/* <Image
              style={[styles.loginImage]}
              source={require('../assets/img/loginicon.png')}
            /> */}
            <Animated.Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                transform: [{rotate: spin}],
              }}
              source={require('../assets/img/loginicon.png')}
            />
          </View>
        </View>

        <View style={globalStyles.containerMain}>
          <View style={{ marginVertical: 25}}>
            <Text style={styles.textSubtitle}>
            Verifying your details can take 5 minutes...
            </Text>
            <Text style={styles.textSubtitle}>
              After approval, you will receive an email with the details to login to your account 
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.containerCenter}>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          rounded>
          <Text style={styles.textButton}>Login</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTittle: {
    color: '#FFF',
    fontSize: 20,
  },
  textSubtitle: {
    color: '#FFF',
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
    fontFamily: 'UniformExtraCondensed-Light' 

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
    backgroundColor: '#000',
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
    borderRadius: 100,
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
    // fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default EndMessage;
