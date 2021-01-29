
import 'react-native-gesture-handler';
import React from 'react';
import { Root } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

import Login from './views/Login'
import Home from './views/Home';
import MyAccount from './views/MyAccount';
import Help from './views/Help';
import User from './views/User';
import CashBoost from './views/CashBoost';
import Activity from './views/Activity';
import NewPassword from './views/NewPassword';



const App = () => {
    return (
        <>
            <Root>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Login'>
                        <Stack.Screen
                            name='Login'
                            component={Login}
                            options={{
                                title: 'Login',
                                headerShown: false
                            }}
                        />
                       <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{
                                title: 'Home',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='MyAccount'
                            component={MyAccount}
                            options={{
                                title: 'MyAccount',
                                headerShown: false,
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
                            name='NewPassword'
                            component={NewPassword}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Root>
        </>
    );
};



export default App;
