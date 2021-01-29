import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Form,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Left,
  Body,
  Right,
  Title,
  Toast,
  Picker,
  ActionSheet,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import FooterMenu from '../components/FooterMenu';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const [activeDailyPayments, setActiveDailyPayments] = useState(false);
  const [message, setMessage] = useState(null);
  const [showCashBoostForm, setShowCashBoostForm] = useState(false);
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState(0);
  const [repayments, setRepayments] = useState([]);
  const [dailyPayments, setDailyPayments] = useState([]);
  const [amountToPay, setAmountToPay] = useState(0);

  useEffect(() => {
    const loadInitialValues = async () => {
      const budgetItem = await AsyncStorage.getItem('budget');
      const repaymentsList = await AsyncStorage.getItem('repayementHistory');
      const paymentsList = await AsyncStorage.getItem('payementHistory');
      const amounttopayItem = await AsyncStorage.getItem('amounttopay');
      if (budgetItem) {
        setBudget(Number(budgetItem));
      }
      if (amounttopayItem) {
        setAmountToPay(Number(amounttopayItem));
      }
      if (repaymentsList) {
        setRepayments(JSON.parse(repaymentsList));
      }
      if (paymentsList) {
        setDailyPayments(JSON.parse(paymentsList));
      }
    };
    loadInitialValues();
  }, [budget]);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log(amount);
    if (amount === 0) {
      setMessage('Amount not valid');
      return;
    }
    if (amount > budget) {
      setMessage('Amount not valid');
      return;
    }

    try {
      Alert.alert(
        'Cash Boost Request',
        `Are you sure you want to make a cash boost for $${amount}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => processCashBoost()},
        ],
        {cancelable: false},
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const processCashBoost = async () => {
    const tempDailyPayments = [
      ...dailyPayments,
      {
        status: 'Scheduled',
        amount,
        date: formatDateNoTime(0),
      },
    ];
    console.log(tempDailyPayments);
    setDailyPayments(tempDailyPayments);
    await AsyncStorage.setItem(
      'payementHistory',
      JSON.stringify(tempDailyPayments),
    );
    let budgetItem = Number(budget) - Number(amount);
    let amountToPayItem =
      Number(amountToPay) + Number(amount) + Number(amount) * 0.05;
    await AsyncStorage.setItem('budget', `${budgetItem}`);
    await AsyncStorage.setItem('amounttopay', `${amountToPayItem}`);
    setBudget(Number(budgetItem));
    setMessage('Payment created');
    setAmountToPay(amountToPayItem);
    setShowCashBoostForm(!showCashBoostForm);
  };

  const changeStatusCashBoostForm = () => {
    setShowCashBoostForm(!showCashBoostForm);
  };

  const changeActiveDailyPayments = async () => {
    setMessage(null);
    Alert.alert(
      'Daily payments activation',
      `Are you sure you want to ${
        activeDailyPayments ? 'pause' : 'activate'
      } your daily payments?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setActiveDailyPayments(!activeDailyPayments),
        },
      ],
      {cancelable: false},
    );
  };

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  const formatDateNoTime = (addDays) => {
    let date = new Date();
    date.setDate(date.getDate() + addDays);
    const d = new Date(date);
    let datepay =
      d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    return datepay;
  };
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    // <Container style={[globalStyles.container, {backgroundColor: '#3898ec'}]}>
    <Container style={[globalStyles.container, {backgroundColor: '#FFF'}]}>
      <LinearGradient
        colors={['#091923', '#202F58']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>Hi Rok,</Text>
      </LinearGradient>
      <View style={styles.maincard}>
        <View style={styles.maincardView}></View>
        <Text style={styles.whiteUpper}>Current Balance</Text>
        <View style={styles.progressBar}></View>
      </View>
      <Card borderRadius={50}>
        <CardItem>
          <Left>
            <Body>
              <Text>Hi Rok,</Text>
              <Text note>
                You have available:{' '}
                <Text style={{fontWeight: 'bold'}}>${budget || 0}</Text>{' '}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            {!activeDailyPayments ? (
              <Button
                square
                block
                style={[globalStyles.button, {marginBottom: 5}]}
                onPress={() => changeActiveDailyPayments()}>
                <Text style={globalStyles.textButton}>
                  Activate $30 Daily Payments
                </Text>
              </Button>
            ) : (
              <Button
                square
                block
                style={[globalStyles.button, {marginBottom: 5}]}
                onPress={() => changeActiveDailyPayments()}>
                <Text style={globalStyles.textButton}>
                  Pause Daily Payments
                </Text>
              </Button>
            )}

            <Button
              square
              block
              style={globalStyles.button}
              onPress={() => changeStatusCashBoostForm()}>
              <Text style={globalStyles.textButton}>Request CASH BOOST</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>

      {/* <View style={styles.maincontent}>
        
        <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Body>
                <Text>
                  Est. repayment on{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {formatDateNoTime(4)}
                  </Text>
                </Text>
                <Text note>
                  Current Balance:{' '}
                  <Text style={{fontWeight: 'bold'}}>A${amountToPay}</Text>{' '}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        {showCashBoostForm && (
          <Card style={{flex: 0}}>
            <Form>
              <CardItem>
                <Left>
                  <Body>
                    <Text>Make a Cash Boost Request</Text>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{width: '90%'}}
                        placeholder="Amount"
                        placeholderStyle={{color: '#bfc6ea'}}
                        placeholderIconColor="#007aff"
                        selectedValue={amount}
                        onValueChange={(e) => setAmount(e)}>
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="50" value="50" />
                        <Picker.Item label="100" value="100" />
                      </Picker>
                    </Item>
                  </Body>
                </Left>
              </CardItem>
              <Button
                square
                block
                style={globalStyles.button}
                onPress={() => handleSubmit()}>
                <Text style={globalStyles.textButton}>Request</Text>
              </Button>
            </Form>
          </Card>
        )}
        {repayments.length > 0 && (
          <Card style={{flex: 0, alignContent: 'space-around'}}>
            <Header style={globalStyles.headerCard}>
              <Text style={globalStyles.headerCardTittle}>
                Recent Repayments:{' '}
              </Text>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Text style={globalStyles.headerCardTittle}>See All</Text>
              </Button>
            </Header>
            <CardItem>
              <Left>
                <Body>
                  <Text note style={globalStyles.noteTextTittle}>
                    Status:{'    '}
                    <Text style={{fontWeight: 'bold'}}>
                      {repayments[0].status}
                    </Text>{' '}
                  </Text>
                  <Text note style={globalStyles.noteTextTittle}>
                    Amount:{'  '}
                    <Text style={{fontWeight: 'bold'}}>
                      ${repayments[0].amount}
                    </Text>{' '}
                  </Text>
                  <Text note style={globalStyles.noteTextTittle}>
                    Date:{'       '}
                    <Text style={{fontWeight: 'bold'}}>
                      {repayments[0].date}
                    </Text>{' '}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        )}
        {dailyPayments.length > 0 && (
          <Card style={{flex: 0, alignContent: 'space-around'}}>
            <Header style={globalStyles.headerCard}>
              <Text style={globalStyles.headerCardTittle}>
                Received Payments:{' '}
              </Text>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Text style={globalStyles.headerCardTittle}>See All</Text>
              </Button>
            </Header>
            <CardItem>
              <Left>
                <Body>
                  <Text note style={globalStyles.noteTextTittle}>
                    Status:{'    '}
                    <Text style={{fontWeight: 'bold'}}>
                      {dailyPayments[dailyPayments.length - 1].status}
                    </Text>{' '}
                  </Text>
                  <Text note style={globalStyles.noteTextTittle}>
                    Amount:{'  '}
                    <Text style={{fontWeight: 'bold'}}>
                      ${dailyPayments[dailyPayments.length - 1].amount}
                    </Text>{' '}
                  </Text>
                  <Text note style={globalStyles.noteTextTittle}>
                    Date:{'       '}
                    <Text style={{fontWeight: 'bold'}}>
                      {dailyPayments[dailyPayments.length - 1].date}
                    </Text>{' '}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        )}
        {message && showAlert()}
      </View>
       */}
      <FooterMenu buttonActive={'Home'} />
    </Container>
  );
};

const styles = StyleSheet.create({
  divCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  noteTextTittle: {
    width: 300,
  },
  linearGradient: {
    height: 200,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 30,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  maincontent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  maincard: {
    marginTop: -30,
    marginHorizontal: '5%',
    borderRadius: 35,
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 35,
  },
  whiteUpper: {
    color: '#12293E',
    textTransform: 'uppercase',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  maincardView: {
    marginHorizontal: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
});

export default Home;
