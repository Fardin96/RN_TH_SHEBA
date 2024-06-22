import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// assets
import {colors} from '../assets/colors/colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  convert,
} from '../assets/dimensions/dimensions';
// functions
import {resetToken} from '../redux-toolkit/features/authentication/authToken';
import {useDispatch} from 'react-redux';
import TasksContainer from '../components/HomeScreens/DailyTarget/TasksContainer';
import Dailytarget from '../components/HomeScreens/Dailytarget';
import Icon from 'react-native-vector-icons/Ionicons';
import {remLocalCache} from '../functions/Cache/cache';

const Home = ({navigation}) => {
  const disptach = useDispatch();
  function logouthandler() {
    navigation.push('Login');
    disptach(resetToken());
    remLocalCache('todo');
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.dark.PRIMARY,
      }}>
      <View
        style={{
          borderWidth: 3,
          borderColor: colors.dark.CONTRAST,
          borderBottomEndRadius: convert(100),
          borderBottomStartRadius: convert(100),
          height: SCREEN_HEIGHT - (SCREEN_HEIGHT - 120),
          width: SCREEN_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: convert(50),
          backgroundColor: colors.dark.CONTRAST,
        }}>
        <Text
          style={{color: 'white', fontSize: convert(100), fontWeight: '900'}}>
          TODOLIST App
        </Text>
        <TouchableOpacity
          onPress={logouthandler}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: convert(150),
            width: convert(150),
            borderRadius: convert(75),
            backgroundColor: 'grey',
            marginLeft: convert(100),
          }}>
          <Icon name={'exit'} size={30} color={colors.dark.WHITE} />
        </TouchableOpacity>
      </View>

      <Dailytarget />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
