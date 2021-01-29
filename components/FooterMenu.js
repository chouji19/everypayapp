import React from 'react';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import FooterHelp,{FooterCashBoostButton, FooterHelpButton, FooterTransactionsButton, FooterUserButton } from '../utils/SvgIcons';
import {StyleSheet, Image} from 'react-native';

const FooterMenu = ({buttonActive}) => {
  const navigation = useNavigation();

  return (
    <Footer>
      <FooterTab style={globalStyles.footerContainer}>
        <Button onPress={() => navigation.navigate('Home')}>
        <Image
            style={[styles.image]}
            source={require('../assets/img/everypaywhite.png')}
          />
        </Button>
        <Button onPress={() => navigation.navigate('Activity')}
          active={buttonActive === 'Activity'}>
          <FooterTransactionsButton />
        </Button>
        
        <Button onPress={() => navigation.navigate('Cashboost')}
          active={buttonActive === 'Cashboost'}>
          <FooterCashBoostButton size={30} square={40} />
        </Button>
        <Button onPress={() => navigation.navigate('User')}
          active={buttonActive === 'User'}
        >
          <FooterUserButton />
        </Button>
        <Button
          active={buttonActive === 'Help'}
          onPress={() => navigation.navigate('Help')}>
          <FooterHelpButton  size={30} square={40} />
          {/* <Icon name="person" active={buttonActive === 'Conf'}/> */}
        </Button>
      </FooterTab>
    </Footer>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  }
});

export default FooterMenu;
