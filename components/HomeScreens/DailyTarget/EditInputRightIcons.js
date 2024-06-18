import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// assets
import {convert} from '../../../assets/dimensions/dimensions';

const EditInputRightIcons = ({handleClearInput, handleSubmit}) => {
  return (
    <View style={styles.rightIconsRoot}>
      <TouchableOpacity style={styles.icon.cancel} onPress={handleClearInput}>
        <Icon name="cancel" size={30} color="red" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon.done} onPress={handleSubmit}>
        <Icon name="done" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default EditInputRightIcons;

const styles = StyleSheet.create({
  rightIconsRoot: {
    width: convert(250),
    flexDirection: 'row',
    justifyContent: 'space-around',
    //   borderRightWidth: 1,
    //   borderColor: 'green',
  },
  icon: {
    done: {
      height: convert(100),
      width: convert(100),
      borderRadius: convert(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      // borderRightWidth: 1,
      // borderColor: 'blue',
    },
    cancel: {
      height: convert(100),
      width: convert(100),
      borderRadius: convert(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      // borderRightWidth: 1,
      // borderColor: 'blue',
    },
  },
});
