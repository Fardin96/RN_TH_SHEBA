import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../../assets/colors/colors';
import {SCREEN_WIDTH, convert} from '../../../assets/dimensions/dimensions';
import TimePickerView from './TimePicker/TimePickerView';

const TaskInputModal = ({
  modalVisible,
  setModalVisible,
  taskTitleRef,
  taskDetailsRef,
  handleSubmit,
  alarmString,
  setAlarmString,
}) => {
  const addTaskHandler = () => {
    if (
      taskTitleRef.current.value === '' ||
      taskTitleRef.current.value === undefined ||
      taskDetailsRef.current.value === '' ||
      taskDetailsRef.current.value === undefined
    ) {
      return;
    }

    handleSubmit();
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.root}>
          <View style={styles.modalView}>
            {/* <Input
              ref={taskTitleRef}
              maxLength={40}
              onChangeText={e => (taskTitleRef.current.value = e)}
              placeholder="Image"
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
                borderWidth: 1,
                borderColor: 'grey',
              }}
              inputStyle={
                {
                  // color: colors.dark.CONTRAST,
                }
              }
            /> */}

            <Input
              ref={taskTitleRef}
              maxLength={40}
              onChangeText={e => (taskTitleRef.current.value = e)}
              placeholder="Task Title"
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
                borderWidth: 1,
                borderRadius: convert(30),
                borderColor: 'grey',
              }}
              inputStyle={
                {
                  // color: colors.dark.CONTRAST,
                }
              }
            />

            <Input
              ref={taskDetailsRef}
              maxLength={200}
              multiline={true}
              onChangeText={e => (taskDetailsRef.current.value = e)}
              placeholder="Details"
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: convert(30),
                height: convert(300),
              }}
              inputStyle={
                {
                  // color: colors.dark.CONTRAST,
                }
              }
            />

            <TimePickerView
              alarmString={alarmString}
              setAlarmString={setAlarmString}
            />

            <Button
              title={'DONE !'}
              loading={false}
              loadingProps={{size: 'small', color: colors.dark.WHITE}}
              buttonStyle={styles.btn.buttonStyle}
              titleStyle={styles.btn.titleStyle}
              containerStyle={styles.btn.containerStyle}
              onPress={addTaskHandler}
            />

            <Button
              title={'CANCEL'}
              loading={false}
              loadingProps={{size: 'small', color: colors.dark.WHITE}}
              buttonStyle={[styles.btn.buttonStyle, styles.btn.cancelBtn]}
              titleStyle={{color: 'black'}}
              containerStyle={{}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,355,0.7)',

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  modalView: {
    width: SCREEN_WIDTH - 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: convert(50),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: colors.dark.PRIMARY,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: convert(25),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    buttonStyle: {
      height: convert(100),
      width: convert(500),
      marginBottom: convert(20),
      borderRadius: convert(25),
      backgroundColor: colors.dark.ACCENT,

      // borderWidth: convert(10),
      // borderColor: colors.dark.ACCENT,
    },
    titleStyle: {fontFamily: 'Montserrat-SemiBold', color: colors.dark.WHITE},
    containerStyle: {
      marginTop: convert(30),
    },
    cancelBtn: {
      backgroundColor: colors.dark.PRIMARY,
    },
  },
});

export default TaskInputModal;
