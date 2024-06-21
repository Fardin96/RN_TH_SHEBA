/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
// screens
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
// components
// import CustomHeader from './components/CustomHeader/CustomHeader';
// redux-store
import {store} from './redux-toolkit/store/store';
// assets
import {colors} from './assets/colors/colors';
import {API_URL} from '@env';
// functions
import {getAuthToken} from './redux-toolkit/features/authentication/authToken';

const Stack = createNativeStackNavigator();

// const linking = {
//   prefixes: ['https://ramadan-planner-frontend.vercel.app'],
//   config: {
//     screens: {
//       ChangePass: 'password-reset/Mg/:params',
//     },
//   },
// };

console.log('+--------------------------------------------+');
console.log('API_URL --> ', API_URL);
console.log('+--------------------------------------------+');

const App = () => {
  const [cachedToken, setCachedToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCache = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          setCachedToken(token);
        }
        // console.log('cached token @app.js:', cachedToken);
      } catch (error) {
        console.warn('Error fetching local cache @app.js:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCache();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.dark.PRIMARY,
        }}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  // console.log('+--------------------------------------------+');
  // // const localCache = getAuthToken();
  // console.log('TOKEN CACHE @app.js==> ', cachedToken);
  // console.log('+--------------------------------------------+');

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
          }}></View>
      }>
      <Provider store={store}>
        <Stack.Navigator initialRouteName={cachedToken ? 'Home' : 'Login'}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => (
                <View style={{backgroundColor: colors.dark.PRIMARY}}>
                  {/* <CustomHeader /> */}
                </View>
              ),
            }}
          />
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
