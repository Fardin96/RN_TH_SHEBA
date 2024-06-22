import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../assets/colors/colors';

const TaskDetails = ({route}) => {
  const {id, name, taskDetails, alarmString} = route.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dark.PRIMARY,
      }}>
      <Text style={{color: 'black'}}>{name}</Text>
      <Text style={{color: 'black'}}>{'Image'}</Text>
      <Text style={{color: 'black'}}>{alarmString}</Text>
      <Text style={{color: 'black'}}>{taskDetails}</Text>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({});
