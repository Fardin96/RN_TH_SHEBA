import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../assets/colors/colors';

const FallbackScreens = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{'Loading...'}</Text>
    </View>
  );
};

export default FallbackScreens;

const styles = StyleSheet.create({});
