import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
// components
import TaskInput from './TaskInput';
import EditTaskInput from './EditTaskInput';
// assets
import {convert} from '../../../assets/dimensions/dimensions';
import {colors} from '../../../assets/colors/colors';

const Tasks = ({
  idx,
  name,
  complete,
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskEdit,
  taskID,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditPress = () => {
    setIsEditing(prev => !prev);
  };

  const styles = StyleSheet.create({
    root: {
      height: convert(150),
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: convert(15),
      marginHorizontal: convert(33),
      borderWidth: convert(5),
      borderRadius: convert(25),
      borderColor: colors.dark.CONTRAST,

      // paddingBottom: lastItem ? convert(150) : 0,
      // borderWidth: 1,
    },
    smallBox: {
      width: convert(150),
      alignItems: 'center',
      justifyContent: 'center',

      //   borderWidth: 1,
      //   borderColor: 'blue',
    },
  });

  return (
    <View style={styles.root}>
      {isEditing ? (
        <EditTaskInput
          taskIdx={idx}
          name={name}
          handleTaskEdit={handleTaskEdit}
          handleEditPress={handleEditPress}
        />
      ) : (
        <>
          <View style={styles.smallBox}>
            <CheckBox
              checked={complete}
              onPress={() => handleTaskCompletion(idx, taskID)}
              checkedColor={colors.dark.CONTRAST}
            />
          </View>

          <TaskInput
            idx={idx}
            name={name}
            complete={complete}
            handleTaskDeletion={handleTaskDeletion}
            handleEditPress={handleEditPress}
          />
        </>
      )}
    </View>
  );
};

export default Tasks;
