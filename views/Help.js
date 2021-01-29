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

const Help = () => {
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
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
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
        <Picker
          mode="dropdown"
          iosHeader="Frequency"
          // value={frequency}
          iosIcon={
            <Icon
              name="arrow-dropdown-circle"
              style={{color: '#000', fontSize: 25}}
            />
          }
          // style={{height: 50, width: 150}}
          //itemStyle={{height: 44}}
          // selectedValue={frequency}
          // onValueChange={(e) => changeTimeScheduleFrequency(e)}
        >
          <Picker.Item label="Payments" value="Payments" />
          <Picker.Item label="Update Account Details" value="Update Account Details" />
          <Picker.Item label="Hardship" value="Hardship" />
          <Picker.Item label="Log In/Account Access" value="Log In/Account Access" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Item inlineLabel last style={globalStyles.input}>
          <Textarea
            placeholder="Message..."
            // onChangeText={(texto) => setComment(texto)}
            // value={comment}
            bordered
            rounded
            rowSpan={5}
            width="100%"
          />
        </Item>
        <View style={globalStyles.containerCenter}>
                <Button
                  style={styles.button}
                  // onPress={() => validateCode()}
                  rounded>
                  <Text style={styles.textButton}>Send</Text>
                </Button>
              </View>
      </View>

      <FooterMenu buttonActive={'Help'} />
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

export default Help;
