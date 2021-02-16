import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {
  Container,
  Button,
  Text,
  Input,
  Form,
  Item,
  Toast,
  Icon,
  Header,
  Picker,
} from 'native-base';
// import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
// import {Picker} from '@react-native-community/picker';
import {StyleSheet} from 'react-native';

import useBankList from '../hooks/useBankList';

const BankList = () => {
  const [selectedBank, setselectedBank] = useState(null);
  const [message, setMessage] = useState(null);
  const {bankList} = useBankList();
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  async function connectHandled() {
    try {
      await AsyncStorage.setItem(
        'bank',
        JSON.stringify(bankList.find((bank) => bank.id === selectedBank)),
      );
      navigation.navigate('BankConnection');
    } catch (error) {
      console.error('There was an error with the login', error);
      setMessage('Error: Income information not valid');
    }
  }

  const handleSearch = async (text) => {
    setSearchText(text);

    const bankFind = bankList.find((bank) =>
      bank.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (bankFind) setselectedBank(bankFind.id);
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
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={styles.containerMain}>
          <Image
            style={[styles.loginImage]}
            source={require('../assets/img/Bank.png')}
          />
          <Text style={styles.loginTittle}>Select your Bank</Text>
        </View>
        {/* <ScrollView> */}
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              value={searchText}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="business" />
          </Item>
          <Button transparent onPress={() => handleSearch()}>
            <Text>Search</Text>
          </Button>
        </Header>
        <Form style={styles.form}>
          <View style={styles.formItem}>
            <Picker
              mode="dropdown"
              iosHeader="Frequency"
              label='Bank selection'
              value={selectedBank}
              style={globalStyles.combobox}
              iosIcon={
                <Icon
                  name="chevron-down-circle"
                  style={{color: '#000', fontSize: 25}}
                />
              }
              selectedValue={selectedBank}
              onValueChange={(e) => setselectedBank(e)}>
              {bankList &&
                bankList.map((bank) => (
                  <Picker.Item
                    label={`(${bank.shortName}) ${bank.name}`}
                    value={bank.id}
                    key={bank.id}
                  />
                ))}
            </Picker>
          </View>
          <View style={globalStyles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => connectHandled()}
              rounded>
              <Text style={styles.textButton}>Connect</Text>
            </Button>
          </View>

          {message && showAlert()}
        </Form>
        {/* </ScrollView> */}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginTittle: {
    color: '#13293D',
    fontSize: 30,
    textTransform: 'uppercase',
    // fontWeight: 'bold',
    fontFamily: 'Uniform-Condensed5'
  },
  form: {
    // marginTop: 60,
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
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default BankList;
