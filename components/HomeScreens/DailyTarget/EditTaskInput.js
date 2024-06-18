import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
// components
import EditInputRightIcons from './EditInputRightIcons';
// assets
import {Input} from 'react-native-elements';
import {convert} from '../../../assets/dimensions/dimensions';

const EditTaskInput = ({taskIdx, name, handleTaskEdit, handleEditPress}) => {
  const editRef = useRef(null);

  const handeClearEditRef = () => {
    editRef.current.value = '';
    editRef.current.clear();
  };

  const handleClearInput = () => {
    handeClearEditRef();
    handleEditPress();
  };

  const handleSubmit = () => {
    handleTaskEdit(
      taskIdx,
      typeof editRef.current?.value === 'undefined' ||
        editRef.current?.value === ''
        ? name
        : editRef.current.value,
    );
    handleClearInput();
  };

  return (
    <View style={styles.root}>
      <Input
        defaultValue={name}
        ref={editRef}
        onChangeText={e => (editRef.current.value = e)}
        // placeholder="Name"
        rightIcon={
          <EditInputRightIcons
            handleClearInput={handleClearInput}
            handleSubmit={handleSubmit}
          />
        }
        // rightIconContainerStyle={{borderWidth: 1, borderColor: 'red'}}
        // errorStyle={styles.error}
        // errorMessage={errorMessage ? errorMessage : ''}
      />
    </View>
  );
};

export default EditTaskInput;

const styles = StyleSheet.create({
  root: {
    height: convert(150),
    width: convert(1000),
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
  },
});
