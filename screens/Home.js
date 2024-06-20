import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../assets/colors/colors';
import {
  getAuthToken,
  resetToken,
} from '../redux-toolkit/features/authentication/authToken';
import {useDispatch} from 'react-redux';
import {getLocalCache} from '../functions/Cache/cache';

const Home = ({navigation}) => {
  console.log('+--------------------------------------------+');
  console.log('TOKEN CACHE @HOME ==> ', getAuthToken());
  console.log('+--------------------------------------------+');

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
        justifyContent: 'center',
        backgroundColor: colors.dark.PRIMARY,
      }}>
      <TouchableOpacity>
        <Button style={{}} title="LOGOUT !" onPress={logouthandler} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
