import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
// components
import Tasks from './Tasks';
// assets
import {convert} from '../../../assets/dimensions/dimensions';

const TasksContainer = ({
  task = [],
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskEdit,
  alarmString,
}) => {
  // todo: replace all onPress to regular functions instead of arrow functions. r&d about the scoping issue?
  return (
    <ScrollView
      contentContainerStyle={styles.tasklist}
      showsVerticalScrollIndicator={false}>
      {typeof task === 'undefined' ||
      task === null ||
      task.length === 0 ||
      task === undefined ? (
        <View
          style={{
            flex: 1,
            padding: convert(30),
            // borderWidth: 1,
            // borderColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.empty}>No tasks :(</Text>
        </View>
      ) : (
        task.map((i, idx) => {
          return (
            <Tasks
              key={idx}
              name={i.name}
              idx={idx}
              taskID={i.id}
              lastItem={i === task.length - 1 ? true : false}
              complete={i.is_completed}
              handleTaskCompletion={handleTaskCompletion}
              handleTaskDeletion={handleTaskDeletion}
              handleTaskEdit={handleTaskEdit}
              alarmString={i.alarm}
            />
          );
        })
      )}
    </ScrollView>
  );
};

export default TasksContainer;

const styles = StyleSheet.create({
  tasklist: {
    flexGrow: 1,
    width: convert(1000),

    // borderWidth: 1,
    // borderColor: 'red',
  },
  empty: {
    // fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: convert(50),
  },
});
