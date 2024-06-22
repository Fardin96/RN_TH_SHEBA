import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// assets
import {colors} from '../assets/colors/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../assets/dimensions/dimensions';
// functions
import {resetToken} from '../redux-toolkit/features/authentication/authToken';
import {useDispatch} from 'react-redux';
import TasksContainer from '../components/HomeScreens/DailyTarget/TasksContainer';
import Dailytarget from '../components/HomeScreens/Dailytarget';

const Home = ({navigation}) => {
  const disptach = useDispatch();
  function logouthandler() {
    navigation.navigate('Login');
    disptach(resetToken());
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.dark.PRIMARY,
      }}>
      {/* todo: replace with header */}
      <View
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          height: SCREEN_HEIGHT - (SCREEN_HEIGHT - 120),
          width: SCREEN_WIDTH,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Button style={{}} title="LOGOUT !" onPress={logouthandler} />
      </View>

      {/* <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT - 200,
        }}
      /> */}
      <Dailytarget />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
