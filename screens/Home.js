import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../assets/colors/colors';

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dark.PRIMARY,
      }}>
      <Text style={{color: 'white'}}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
