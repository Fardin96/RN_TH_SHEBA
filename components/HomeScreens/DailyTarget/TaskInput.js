import React from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
// assets
// impoFontSizert {FontSize} from '../../../assets/fonts/fonts';
import {convert} from '../../../assets/dimensions/dimensions';
import {colors} from '../../../assets/colors/colors';

const TaskInput = ({
  idx,
  name,
  complete,
  handleTaskDeletion,
  handleEditPress,
  alarmString,
}) => {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    taskBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',

      // borderWidth: 1,
      // borderColor: 'red',
    },
    txtContainer: {flex: 1, flexDirection: 'column'},
    textTitle: {
      fontWeight: '800',
      fontSize: convert(40),
      textDecorationLine: complete ? 'line-through' : null,
      color: colors.dark.CONTRAST,
    },
    textTime: {
      textDecorationLine: complete ? 'line-through' : null,
      color: colors.dark.CONTRAST,
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
        <Text style={styles.textTitle}>
          {/* {idx + 1} */}
          {name}
        </Text>
        <Text style={styles.textTime}>{`Due @${alarmString}`}</Text>
      </View>

      {/* <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          navigation.navigate('TaskDetails', {
            id: idx,
            name: name,
            details: '',
            complete: 'false',
            alarmString: alarmString,
          });
        }}>
        <Icon name="pencil" size={30} color="blue" />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.delete}
        activeOpacity={0.8}
        onPress={() => {
          ToastAndroid.show('PRESS & HOLD TO DELETE', ToastAndroid.SHORT);
        }}
        onLongPress={() => {
          handleTaskDeletion(idx);
        }}>
        <Icon name="trash" size={convert(50)} color={colors.dark.ERROR} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
