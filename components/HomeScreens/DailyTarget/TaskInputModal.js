import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../../assets/colors/colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  convert,
} from '../../../assets/dimensions/dimensions';
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
  return (
    <View
    // style={styles.root}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.root}>
          <View style={styles.modalView}>
            <Input
              ref={taskTitleRef}
              maxLength={40}
              onChangeText={e => (taskTitleRef.current.value = e)}
              placeholder="Image"
              // errorStyle={styles.error}
              // errorMessage={errorMessage ? errorMessage : ''}
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
              }}
              inputStyle={{
                color: colors.dark.CONTRAST,
              }}
            />

            <Input
              ref={taskTitleRef}
              maxLength={40}
              onChangeText={e => (taskTitleRef.current.value = e)}
              placeholder="Task Title"
              // errorStyle={styles.error}
              // errorMessage={errorMessage ? errorMessage : ''}
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
              }}
              inputStyle={{
                color: colors.dark.CONTRAST,
              }}
            />

            {/* <Input
              ref={taskRef}
              maxLength={40}
              onChangeText={e => (taskRef.current.value = e)}
              placeholder="Due time"
              // errorStyle={styles.error}
              // errorMessage={errorMessage ? errorMessage : ''}
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
              }}
              inputStyle={{
                color: colors.dark.CONTRAST,
              }}
            /> */}

            <Input
              ref={taskDetailsRef}
              maxLength={200}
              multiline={true}
              onChangeText={e => (taskDetailsRef.current.value = e)}
              placeholder="Details"
              // errorStyle={styles.error}
              // errorMessage={errorMessage ? errorMessage : ''}
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
                height: convert(300),
              }}
              inputStyle={{
                color: colors.dark.CONTRAST,
              }}
            />

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                console.log('taskRef.current.value: ', taskRef.current.value);
                if (
                  taskRef.current.value === '' ||
                  taskRef.current.value === undefined
                ) {
                  return;
                }

                handleSubmit();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>ADD TIME</Text>
            </Pressable> */}

            <TimePickerView
              alarmString={alarmString}
              setAlarmString={setAlarmString}
            />

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              // style={styles.btn}
              onPress={() => {
                console.log('taskRef.current.value: ', taskRef.current.value);
                if (
                  taskRef.current.value === '' ||
                  taskRef.current.value === undefined
                ) {
                  return;
                }

                handleSubmit();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Done!</Text>
            </Pressable> */}

            <Button
              title={'DONE !'}
              loading={false}
              loadingProps={{size: 'small', color: colors.dark.WHITE}}
              buttonStyle={styles.btn.buttonStyle}
              titleStyle={styles.btn.titleStyle}
              containerStyle={styles.btn.containerStyle}
              onPress={() => {
                // console.log('taskRef.current.value: ', taskRef.current.value);
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
              }}
            />

            <Button
              title={'CANCEL'}
              loading={false}
              loadingProps={{size: 'small', color: colors.dark.WHITE}}
              buttonStyle={[styles.btn.buttonStyle, styles.btn.cancelBtn]}
              titleStyle={styles.btn.titleStyle}
              containerStyle={styles.btn.containerStyle}
              onPress={() => {
                // console.log('taskRef.current.value: ', taskRef.current.value);
                // if (
                //   taskRef.current.value === '' ||
                //   taskRef.current.value === undefined
                // ) {
                //   return;
                // }

                // handleSubmit();
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
    // marginTop: 22,
    backgroundColor: 'rgba(255,255,355,0.7)',

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  modalView: {
    width: SCREEN_WIDTH - 100,
    // height: SCREEN_HEIGHT,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
      marginBottom: convert(41),
      borderRadius: convert(25),
      backgroundColor: colors.dark.CONTRAST,

      // borderWidth: convert(10),
      // borderColor: colors.dark.ACCENT,
    },
    titleStyle: {fontFamily: 'Montserrat-SemiBold', color: colors.dark.WHITE},
    containerStyle: {
      // flex: 0.9,
      // marginHorizontal: 50,
      // height: 50,
      // width: 200,
      // marginVertical: 10,
      marginTop: convert(30),
    },
    cancelBtn: {
      backgroundColor: 'red',
      // marginTop: null,
    },
  },
});

export default TaskInputModal;
