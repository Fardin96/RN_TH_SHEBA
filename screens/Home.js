import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// assets
import {colors} from '../assets/colors/colors';
// functions
import {resetToken} from '../redux-toolkit/features/authentication/authToken';
import {useDispatch} from 'react-redux';

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
