
import 'react-native-gesture-handler';
import React from 'react';
import { Root } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// const Tab = createBottomTabNavigator();

import FooterMenu from './components/FooterMenu';
import Login from './views/Login'
import Home from './views/Home';
// import MyAccount from './views/MyAccount';
import Help from './views/Help';
import User from './views/User';
import CashBoost from './views/CashBoost';
import Activity from './views/Activity';
import NewPassword from './views/NewPassword';
import SignUp from './views/Signup';
import Income from './views/Income';
import ConnectMessage from './views/ConnectMessage';
import BankList from './views/BankList';
import BankConnection from './views/BankConnection';
import Validationcode from './views/Validationcode';
import EndMessage from './views/EndMessage';
import ForgotPassword from './views/ForgotPassword';
import BankAccount from './views/BankAccount';




const Stack = createBottomTabNavigator();
// const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <Root>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Login' 
                        tabBar={(props) => <FooterMenu {...props} />}
                    >
                        <Stack.Screen
                            name='Login'
                            component={Login}    
                            options={{
                                tabBarVisible: false,
                                buttonActive: 'Login'
                            }}            
                        />
                        
                        <Stack.Screen
                            name='NewPassword'
                            component={NewPassword}
                            options={{
                                header: null,
                                tabBarVisible: false
                            }}    
                        />
                       <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{
                                tabBarVisible: true,
                                unmountOnBlur: true
                            }}
                        />
                        {/* <Stack.Screen
                            name='MyAccount'
                            component={MyAccount}
                            options={{
                                title: 'MyAccount',
                                headerShown: false,
                                buttonActive: 'MyAccount'
                            }}
                        /> */}
                        <Stack.Screen
                            name='BankAccount'
                            component={BankAccount}    
                            options={{
                                headerShown: true,
                                tabBarVisible: false,
                            }}            
                        />
                        <Stack.Screen
                            name='Help'
                            component={Help}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='User'
                            component={User}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Cashboost'
                            component={CashBoost}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Activity'
                            component={Activity}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Signup'
                            component={SignUp}    
                            options={{
                                tabBarVisible: false,
                                buttonActive: 'Login'
                            }}            
                        />
                        <Stack.Screen
                            name='Income'
                            component={Income}    
                            options={{
                                tabBarVisible: false,
                            }}            
                        />
                        <Stack.Screen
                            name='ConnectMessage'
                            component={ConnectMessage}    
                            options={{
                                tabBarVisible: false,
                            }}            
                        />
                        <Stack.Screen
                            name='Banklist'
                            component={BankList}    
                            options={{
                                tabBarVisible: false,
                            }}            
                        />
                        <Stack.Screen
                            name='BankConnection'
                            component={BankConnection}    
                            options={{
                                headerShown: true,
                                tabBarVisible: false,
                                unmountOnBlur: true

                            }}            
                        />
                        <Stack.Screen
                            name='Validationcode'
                            component={Validationcode}    
                            options={{
                                headerShown: true,
                                tabBarVisible: false,
                                unmountOnBlur: true

                            }}            
                        />
                        <Stack.Screen
                            name='Endmessage'
                            component={EndMessage}    
                            options={{
                                headerShown: true,
                                tabBarVisible: false,
                            }}            
                        />
                        <Stack.Screen
                            name='ForgotPassword'
                            component={ForgotPassword}    
                            options={{
                                headerShown: true,
                                tabBarVisible: false,
                            }}            
                        />
                        
                        
                    </Stack.Navigator>
                            {/* <HomeTabs /> */}
                </NavigationContainer>
            </Root>
        </>
    );
};



export default App;
