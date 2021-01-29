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
  Content,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';

const User = () => {
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
    <Container style={[globalStyles.container, {backgroundColor: '#E6E6E6'}]}>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}></LinearGradient>
      <View style={styles.maincontent}>
        <View style={styles.viewTittle}>
          {/* <FooterHelpButton size={200} square={50} /> */}
          <Title style={styles.textTittle}>Rok Zolnir</Title>
        </View>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text note >Full Name</Text>
          <Text >Rok Zolnir</Text>
        </View>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text note >Mobile</Text>
          <Text >0420536859</Text>
        </View>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text note >Email</Text>
          <Text >rok@everypay.com.au</Text>
        </View>
        <View style={{marginTop: 40}}>
          <List>
            <ListItem >
              <Left>
                <Text>Privacy Policy</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Terms of use</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem selected>
              <Left>
                <Text>Log out</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
      </View>

      <FooterMenu buttonActive={'User'} />
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: '3%',
  },
  viewTittle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  textTittle: {
    color: '#54B1E4',
    fontSize: 40,
    fontWeight: '200',
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

export default User;
