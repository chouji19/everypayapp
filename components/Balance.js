import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {formatDateNoTime} from '../utils/Utils';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const Balance = ({customer, payment}) => {
  const navigation = useNavigation();

  const calculatePercentage = () => {
    let total =
      (Number(payment.metadata.basicAmount) || 0) +
      (Number(customer.budget) || 0);
    let calc = (Number(payment.metadata.basicAmount) / total) * 100;
    return calc;
  };
  return (
    <View
      style={
        Platform.OS === 'android' ? styles.maincardAndroid : styles.maincard
      }>
      {/* <View style={styles.maincardView}></View> */}
      <Text style={styles.TextUpper}>Current Balance</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.internalBar, {width: `${calculatePercentage()}%`}]}
        />
      </View>
      <View style={styles.viewAvailable}>
        <View style={styles.viewAvailableContent}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'UniformExtraCondensed-Light',
            }}>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(payment.metadata ? payment.metadata.basicAmount : 0)}
          </Text>
          <Text
            note
            style={{
              textAlign: 'center',
              fontFamily: 'UniformExtraCondensed-Light',
            }}>
            Used
          </Text>
        </View>
        <View style={[styles.viewAvailableContent]}>
          <Text
            style={{
              color: 'green',
              textAlign: 'center',
              fontFamily: 'UniformExtraCondensed-Light',
            }}>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(customer.budget > 0 ? customer.budget : 0)}
          </Text>
          <Text
            note
            style={{
              color: 'green',
              textAlign: 'center',
              fontFamily: 'UniformExtraCondensed-Light',
            }}>
            Available
          </Text>
        </View>
      </View>
      {/* <Text
        style={[styles.textEstRepayment, {fontWeight: 'bold', fontFamily: 'UniformExtraCondensed-Light'}]}>
        Est. repayment on{' '}
        <Text style={[styles.textEstRepayment, {color: '#4FB0E6', fontFamily: 'UniformExtraCondensed-Light'}]}>
          {'2020-02-01 '}
          <Text style={[styles.textEstRepayment, {fontWeight: 'bold', fontFamily: 'UniformExtraCondensed-Light'}]}>
            Amount:{' '}
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(150 / 100)}
          </Text>
        </Text>
      </Text> */}
      {payment.paydate && (
        <View style={styles.viewTextAndButton}>
          <View>
            <Text
              style={[
                styles.textEstRepayment,
                {fontFamily: 'UniformExtraCondensed-Light'},
              ]}>
              Next repayment:{' '}
              <Text
                style={[
                  styles.textEstRepayment,
                  {color: '#4FB0E6', fontFamily: 'UniformExtraCondensed-Light'},
                ]}>
                {formatDateNoTime(payment.paydate)}{' '}
              </Text>
            </Text>
            <Text
              style={[
                styles.textEstRepayment,
                {fontFamily: 'UniformExtraCondensed-Light'},
              ]}>
              <Text
                style={[
                  styles.textEstRepayment,
                  {fontFamily: 'UniformExtraCondensed-Light'},
                ]}>
                Amount:{' '}
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'AUD',
                }).format(payment.amount / 100)}
              </Text>
            </Text>
          </View>
          <View style={styles.containerCenter}>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate('PaymentDetails', {payment})}
              rounded>
              <Text style={styles.textButton}>Pay Now</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maincard: {
    marginTop: -30,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginHorizontal: '5%',
    borderRadius: 35,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  maincardAndroid: {
    marginTop: -30,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginHorizontal: '5%',
    borderRadius: 35,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 35,
  },
  TextUpper: {
    color: '#12293E',
    textTransform: 'uppercase',
    // fontWeight: 'bold',
    fontFamily: 'Uniform-Condensed2',
  },
  progressBar: {
    height: 25,
    width: '100%',
    backgroundColor: '#4C5870',
    borderColor: '#4C5870',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 5,
  },
  internalBar: {
    height: 20,
    backgroundColor: '#4FB0E6',
    borderWidth: 0,
    borderRadius: 15,
  },
  maincardView: {
    marginHorizontal: 40,
    marginTop: 10,
    marginLeft: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAvailable: {
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    // height: 100,
    justifyContent: 'space-around',
    // marginBottom: 40,
  },
  viewAvailableContent: {
    color: 'blue',
    display: 'flex',
    textAlign: 'center',
    marginBottom: 5,
  },
  textEstRepayment: {
    color: '#5B6B79',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'left',
    fontFamily: 'UniformExtraCondensed-Light',
  },
  button: {
    backgroundColor: '#4FB0E6',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'UniformExtraCondensed-Light',
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTextAndButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Balance;
