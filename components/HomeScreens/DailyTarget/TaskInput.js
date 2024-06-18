import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// assets
import {FontSize} from '../../../assets/fonts/fonts';
import {convert} from '../../../assets/dimensions/dimensions';
import {colors} from '../../../assets/colors/colors';

const TaskInput = ({
  idx,
  name,
  complete,
  handleTaskDeletion,
  handleEditPress,
}) => {
  const styles = StyleSheet.create({
    taskBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',

      // borderWidth: 1,
      // borderColor: 'red',
    },
    txtContainer: {flex: 1},
    text: {
      textDecorationLine: complete ? 'line-through' : null,
      color: colors.dark.CONTRAST,
      fontSize: FontSize.medium,
      fontFamily: 'Montserrat-SemiBold',
    },
    delete: {
      height: convert(100),
      width: convert(150),
      alignItems: 'center',
      justifyContent: 'center',

      // borderWidth: 1,
      // borderColor: 'blue',
    },
  });

  return (
    <View style={styles.taskBox}>
      <View style={styles.txtContainer}>
        <Text style={styles.text}>
          {/* {idx + 1} */}
          {name}
        </Text>
      </View>

      {/* <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          handleEditPress();
        }}>
        <Icon name="pencil" size={30} color="blue" />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.delete}
        activeOpacity={0.8}
        onLongPress={() => {
          handleTaskDeletion(idx);
        }}>
        <Icon name="trash" size={convert(50)} color={colors.dark.ERROR} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
