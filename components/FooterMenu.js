import React from 'react';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import FooterHelp, {
  FooterCashBoostButton,
  FooterHelpButton,
  FooterTransactionsButton,
  FooterUserButton,
} from '../utils/SvgIcons';
import {StyleSheet, Image} from 'react-native';

const FooterMenu = ({navigation, state, descriptors}) => {
  // const FooterMenu = ({ buttonActive}) => {
  //   const navigation = useNavigation();
  let buttonActive = 0;
  if (state) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    buttonActive = state.index;
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  }

  return (
    <Footer>
      <FooterTab
        style={globalStyles.footerContainer}
        active={buttonActive === 2}>
        <Button onPress={() => navigation.navigate('Home')}>
          <Image
            style={[styles.image]}
            source={require('../assets/img/everypaywhite.png')}
          />
        </Button>
        <Button
          onPress={() => navigation.navigate('Activity')}>
          <FooterTransactionsButton color={`${buttonActive === 7 ? '#FFDD5F' : '#56b1e4'}`}/>
        </Button>

        <Button
          onPress={() => navigation.navigate('Cashboost')}>
          <FooterCashBoostButton size={30} square={40} color={`${buttonActive === 6 ? '#FFDD5F' : '#56b1e4'}`}/>
        </Button>
        <Button
          onPress={() => navigation.navigate('User')}
          >
          <FooterUserButton color={`${buttonActive === 5 ? '#FFDD5F' : '#56b1e4'}`} />
        </Button>
        <Button
          // active={buttonActive === 4}
          onPress={() => navigation.navigate('Help')}>
          <FooterHelpButton size={30} square={40} color={`${buttonActive === 4 ? '#FFDD5F' : '#56b1e4'}`}/>
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
  },
});

export default FooterMenu;
