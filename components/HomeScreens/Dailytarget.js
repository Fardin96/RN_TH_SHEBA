/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
// rtk-slices
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../../redux-toolkit/features/daily-todolist/daily-todolist-slice';
import {getArabicDate} from '../../redux-toolkit/features/arabic-date/arabicDate';
// assets
import {colors} from '../../assets/colors/colors';
import {FontSize} from '../../assets/fonts/fonts';
import {convert} from '../../assets/dimensions/dimensions';
// components
import TasksContainer from './DailyTarget/TasksContainer';

const Dailytarget = () => {
  const day = useSelector(getArabicDate);

  //* handeling race conditions with queue
  const stateUpdateQueue = useRef([]);
  const [processingQueue, setProcessingQueue] = useState(false);

  const addToQueue = (taskID, newValue) => {
    stateUpdateQueue.current.push({taskID, newValue});

    if (!processingQueue) {
      processQueue();
    }
  };

  const processQueue = async () => {
    setProcessingQueue(true);

    while (stateUpdateQueue.current.length > 0) {
      const {taskID, newValue} = stateUpdateQueue.current[0];

      try {
        const response = await updateTodo({
          id: taskID,
          value: newValue,
          year: parseInt(day.year, 10),
          month: parseInt(day.monthNumber, 10),
          day: parseInt(day.day, 10),
        });

        // console.log('TODO LIST TRACKER RACE QUEUE: response: ', response);

        stateUpdateQueue.current.shift();
      } catch (issue) {
        console.error('Error updating state:', issue);
        break;
      }
    }

    setProcessingQueue(false);
  };

  const {
    data = {},
    error,
    isError,
    isLoading,
  } = useGetTodosQuery({
    year: parseInt(day.year, 10),
    month: parseInt(day.monthNumber, 10),
    day: parseInt(day.day, 10),
  });

  useEffect(() => {
    try {
      // if (isError) {
      //   console.error('SCREEN:DAILY TARGET: get todolist error: ', error);
      //   console.error('SCREEN:DAILY TARGET: get todolist error: ', error.date);
      // }

      if (!isLoading && data) {
        // console.log('screen:daily target: get todolist data: ', data.items);
        setTask(data.items);
      }
    } catch (issue) {
      console.error("SCREEN:DAILY TARGET: 'CATCH' todolist error: ", issue);
    }
  }, [isLoading, isError]);

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const taskRef = useRef(null);
  const [task, setTask] = useState([]);

  const handleSubmit = async () => {
    const newTask = taskRef.current.value;

    if (newTask === '') {
      // reset input field
      taskRef.current.clear();
      return;
    }

    setTask(prevTask => [...prevTask, {name: newTask, is_completed: false}]);

    // reset input field
    taskRef.current.value = '';
    taskRef.current.clear();

    //! todo: queue and try-catch
    const response = await addTodo({
      value: newTask,
      year: parseInt(day.year, 10),
      month: parseInt(day.monthNumber, 10),
      day: parseInt(day.day, 10),
    });
  };

  const handleTaskCompletion = (idx, taskID) => {
    let newValue = !task[idx].is_completed;

    setTask(prevTask => {
      const updatedTask = {
        ...prevTask[idx],
        is_completed: newValue,
      };
      // console.log('comp:Daily Target: updatedTask: ', updatedTask);

      return [
        ...prevTask.slice(0, idx),
        updatedTask,
        ...prevTask.slice(idx + 1),
      ];
    });

    addToQueue(taskID, newValue);
  };

  const handleTaskEdit = (idx, updatedName) => {
    // todo: popup!
    setTask(prevTask => {
      const updatedTask = {...prevTask[idx], name: updatedName};

      return [
        ...prevTask.slice(0, idx),
        updatedTask,
        ...prevTask.slice(idx + 1),
      ];
    });
  };

  const handleTaskDeletion = idx => {
    // todo: popup!
    setTask(prevTask => {
      return [...prevTask.slice(0, idx), ...prevTask.slice(idx + 1)];
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.taskContainer}>
        <TasksContainer
          task={task}
          handleTaskCompletion={handleTaskCompletion}
          handleTaskDeletion={handleTaskDeletion}
          handleTaskEdit={handleTaskEdit}
        />

        <Input
          ref={taskRef}
          maxLength={40}
          onChangeText={e => (taskRef.current.value = e)}
          placeholder="Add a task"
          // errorStyle={styles.error}
          // errorMessage={errorMessage ? errorMessage : ''}
          inputContainerStyle={{
            backgroundColor: colors.dark.PRIMARY,
          }}
          inputStyle={{
            color: colors.dark.CONTRAST,
          }}
        />
      </View>

      <Button
        title={'+ ADD TASK'}
        loading={false}
        loadingProps={{size: 'small', color: colors.dark.WHITE}}
        buttonStyle={styles.btn.buttonStyle}
        titleStyle={styles.btn.titleStyle}
        containerStyle={styles.btn.containerStyle}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Dailytarget;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.PRIMARY,
  },
  tasklist: {
    height: convert(1200),
    width: convert(1000),
    borderWidth: 1,
    borderColor: 'red',
  },
  empty: {fontSize: FontSize.btnTitle, color: 'black'},
  taskContainer: {
    flex: 1,
    width: convert(1000),
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'black',
  },
  taskinner: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  task: {color: 'black', fontSize: FontSize.btnTitle},
  btn: {
    buttonStyle: {
      height: convert(100),
      width: convert(890),
      marginBottom: convert(41),
      borderRadius: convert(25),
      backgroundColor: colors.dark.CONTRAST,

      // borderWidth: convert(10),
      // borderColor: colors.dark.ACCENT,
    },
    titleStyle: {fontFamily: 'Montserrat-SemiBold', color: colors.dark.PRIMARY},
    containerStyle: {
      // marginHorizontal: 50,
      // height: 50,
      // width: 200,
      // marginVertical: 10,
      // marginTop: 80,
    },
  },
});
