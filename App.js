/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
// screens
import Register from './screens/Register';
import Login from './screens/Login';
// import Home from './screens/Home';
// import RequestNewPassword from './components/AuthScreens/ForgotPassScreens/RequestNewPassword';
// import ChangePassword from './components/AuthScreens/ForgotPassScreens/ChangePassword';
// import OnboardingScreen from './screens/OnboardingScreen';
// components
// import CustomHeader from './components/CustomHeader/CustomHeader';
// redux-store
import {store} from './redux-toolkit/store/store';
// assets
import {colors} from './assets/colors/colors';

const Stack = createNativeStackNavigator();

// const linking = {
//   prefixes: ['https://ramadan-planner-frontend.vercel.app'],
//   config: {
//     screens: {
//       ChangePass: 'password-reset/Mg/:params',
//     },
//   },
// };

const App = () => {
  return (
    <NavigationContainer
      // linking={linking}
      fallback={
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.dark.PRIMARY,
          }}>
          {/* <Text>{'Loading...'}</Text> */}
        </View>
      }>
      <Provider store={store}>
        <Stack.Navigator>
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="Onboarding"
            component={OnboardingScreen}
          /> */}
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="ReqPassChange"
            component={RequestNewPassword}
          /> */}
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="ChangePass"
            component={ChangePassword}
          /> */}
          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => (
                <View style={{backgroundColor: colors.dark.PRIMARY}}>
                  <CustomHeader />
                </View>
              ),
            }}
          /> */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Provider store={store}>
    //     <ChangePassword />
    //   </Provider>
    // </NavigationContainer>
  );
};

export default App;
