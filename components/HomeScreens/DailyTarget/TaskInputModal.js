import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../../assets/colors/colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../assets/dimensions/dimensions';

const TaskInputModal = ({
  modalVisible,
  setModalVisible,
  taskRef,
  handleSubmit,
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
              ref={taskRef}
              maxLength={40}
              onChangeText={e => (taskRef.current.value = e)}
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

            <Input
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
            />

            <Input
              ref={taskRef}
              maxLength={40}
              onChangeText={e => (taskRef.current.value = e)}
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
              ref={taskRef}
              maxLength={40}
              onChangeText={e => (taskRef.current.value = e)}
              placeholder="Details"
              // errorStyle={styles.error}
              // errorMessage={errorMessage ? errorMessage : ''}
              inputContainerStyle={{
                backgroundColor: colors.dark.PRIMARY,
              }}
              inputStyle={{
                color: colors.dark.CONTRAST,
              }}
            />

            <Pressable
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
              <Text style={styles.textStyle}>Done!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
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
});

export default TaskInputModal;
