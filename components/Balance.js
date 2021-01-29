import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {formatDateNoTime} from '../utils/Utils';

const Balance = ({customer, payment}) => {
  const calculatePercentage = () => {
    let total =
      (Number(payment.metadata.basicAmount) || 0) +
      (Number(customer.budget) || 0);
    let calc = (Number(payment.metadata.basicAmount) / total) * 100;
    return calc;
  };
  return (
    <View style={styles.maincard}>
      <View style={styles.maincardView}></View>
      <Text style={styles.TextUpper}>Current Balance</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.internalBar, {width: `${calculatePercentage()}%`}]}
        />
      </View>
      <View style={styles.viewAvailable}>
        <View style={styles.viewAvailableContent}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(payment.metadata ? payment.metadata.basicAmount : 0)}
          </Text>
          <Text note style={{textAlign: 'center'}}>
            Used
          </Text>
        </View>
        <View style={[styles.viewAvailableContent]}>
          <Text style={{color: 'green', textAlign: 'center'}}>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(customer.budget > 0 ? customer.budget : 0)}
          </Text>
          <Text note style={{color: 'green', textAlign: 'center'}}>
            Available
          </Text>
        </View>
      </View>
      <Text
        style={[styles.textEstRepayment, {fontWeight: 'bold', marginTop: 10}]}>
        Est. repayment on{' '}
        <Text style={[styles.textEstRepayment, {color: '#4FB0E6'}]}>
          {formatDateNoTime(payment.paydate)}{' '}
          <Text style={[styles.textEstRepayment, {fontWeight: 'bold'}]}>
            Amount:{' '}
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'AUD',
            }).format(payment.amount / 100)}
          </Text>
        </Text>
      </Text>
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
    minHeight: 150,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 35,
  },
  TextUpper: {
    color: '#12293E',
    textTransform: 'uppercase',
    fontWeight: 'bold',
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
    height: 100,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  viewAvailableContent: {
    height: 70,
    color: 'blue',
    display: 'flex',
    textAlign: 'center',
  },
  textEstRepayment: {
    color: '#5B6B79',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Balance;
