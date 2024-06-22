/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaViewBase, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
// rtk-slices
// import {
//   useAddTodoMutation,
//   useGetTodosQuery,
//   useUpdateTodoMutation,
// } from '../../redux-toolkit/features/daily-todolist/daily-todolist-slice';
// import {getArabicDate} from '../../redux-toolkit/features/arabic-date/arabicDate';
// assets
import {colors} from '../../assets/colors/colors';
// import {FontSize} from '../../assets/fonts/fonts';
import {SCREEN_HEIGHT, convert} from '../../assets/dimensions/dimensions';
// components
import TasksContainer from './DailyTarget/TasksContainer';
import TaskInputModal from './DailyTarget/TaskInputModal';
import {getLocalCache, setLocalCache} from '../../functions/Cache/cache';

const Dailytarget = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const taskTitleRef = useRef(null);
  const taskDetailsRef = useRef(null);
  const [task, setTask] = useState([]);
  const [alarmString, setAlarmString] = useState('');

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
        const cachedTodosString = await getLocalCache('todo');
        let cachedTodos = [];
        if (cachedTodosString) {
          cachedTodos = JSON.parse(cachedTodosString);
        }

        const updatedTodos = cachedTodos.map(todo =>
          todo.id === taskID ? {...todo, is_completed: newValue} : todo,
        );

        setLocalCache('todo', JSON.stringify(updatedTodos));

        stateUpdateQueue.current.shift();
      } catch (issue) {
        console.error('Error updating state:', issue);
        break;
      }
    }

    setProcessingQueue(false);
  };

  useEffect(() => {
    try {
      (async () => {
        const savedTasks = await getLocalCache('todo');
        setTask(JSON.parse(savedTasks));
      })();
    } catch (issue) {
      console.error("SCREEN:DAILY TARGET: 'CATCH' todolist error: ", issue);
    }
  }, []);

  const handleSubmit = async () => {
    const newTaskTitle = taskTitleRef.current.value.trim();
    const newTaskDetails = taskDetailsRef.current.value.trim();
    const newAlarmString = alarmString;

    // reset input field
    if (newTaskTitle === '') {
      taskTitleRef.current.clear();
      taskDetailsRef.current.clear();
      setAlarmString('');
      return;
    }

    const newTask = {
      id: task.length
        ? task.reduce((acc, cur) => {
            if (cur.id > acc.id) return cur;
            return acc;
          }).id + 1
        : 0,
      is_completed: false,
      name: newTaskTitle,
      details: newTaskDetails,
      alarm: newAlarmString,
    };

    setTask(prevTask => [...prevTask, newTask]);

    setLocalCache('todo', JSON.stringify([...task, newTask]));

    // reset input field
    taskTitleRef.current.value = '';
    taskTitleRef.current.clear();
    taskDetailsRef.current.value = '';
    taskDetailsRef.current.clear();
    setAlarmString('');
  };

  const handleTaskCompletion = (idx, taskID) => {
    let newValue = !task[idx].is_completed;

    setTask(prevTask => {
      const updatedTask = {
        ...prevTask[idx],
        is_completed: newValue,
      };

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
    setTask(prevTask => {
      return [...prevTask.slice(0, idx), ...prevTask.slice(idx + 1)];
    });

    setLocalCache(
      'todo',
      JSON.stringify([...task.slice(0, idx), ...task.slice(idx + 1)]),
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.taskContainer}>
        <TasksContainer
          task={task}
          handleTaskCompletion={handleTaskCompletion}
          handleTaskDeletion={handleTaskDeletion}
          handleTaskEdit={handleTaskEdit}
          alarmString={alarmString}
        />
      </View>

      <View style={{flex: 1}}>
        <Button
          title={'+ ADD TASK'}
          loading={false}
          loadingProps={{size: 'small', color: colors.dark.WHITE}}
          buttonStyle={styles.btn.buttonStyle}
          titleStyle={styles.btn.titleStyle}
          containerStyle={styles.btn.containerStyle}
          onPress={() => setModalVisible(true)}
        />

        <View style={{flex: 0.1}}>
          <TaskInputModal
            taskTitleRef={taskTitleRef}
            taskDetailsRef={taskDetailsRef}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleSubmit={handleSubmit}
            alarmString={alarmString}
            setAlarmString={setAlarmString}
          />
        </View>
      </View>
    </View>
  );
};

export default Dailytarget;

const styles = StyleSheet.create({
  root: {
    flex: 10,
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
  empty: {
    // fontSize: FontSize.btnTitle,
    color: 'black',
  },
  taskContainer: {
    flex: 9,
    width: convert(1000),
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'black',
  },
  taskinner: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  task: {
    color: 'black',
    // fontSize: FontSize.btnTitle
  },
  btn: {
    buttonStyle: {
      height: convert(100),
      width: convert(890),
      marginBottom: convert(41),
      borderRadius: convert(25),
      backgroundColor: colors.dark.ACCENT,

      // borderWidth: convert(10),
      // borderColor: colors.dark.ACCENT,
    },
    titleStyle: {fontFamily: 'Montserrat-SemiBold', color: colors.dark.WHITE},
    containerStyle: {
      flex: 0.9,
      // marginHorizontal: 50,
      // height: 50,
      // width: 200,
      // marginVertical: 10,
      // marginTop: 80,
    },
  },
});
