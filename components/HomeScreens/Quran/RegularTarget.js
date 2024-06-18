/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
// components
import DropDownPicker from '../../DropDownPicker/DropDownPicker';
// assets
import {convert} from '../../../assets/dimensions/dimensions';
import {colors} from '../../../assets/colors/colors';
import {FontSize} from '../../../assets/fonts/fonts';

const RegularTarget = ({dropDownPlaceholder, inputPlaceholder, setter}) => {
  const regularTargetRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const dropdown = [
    {label: 'Ayat', value: 'Ayat'},
    {label: 'Page', value: 'Page'},
    {label: 'Para', value: 'Para'},
  ];

  useEffect(() => {
    setter(() => ({
      unit: value === null ? dropDownPlaceholder : value,
      value:
        regularTargetRef.current.value === '' ||
        regularTargetRef.current.value === undefined
          ? inputPlaceholder
          : regularTargetRef.current.value,
    }));
  }, [value]);

  const onChangeText = e => {
    regularTargetRef.current.value = e;

    setter(prev => ({
      ...prev,
      value: regularTargetRef.current.value,
    }));
  };

  return (
    <View style={styles.root}>
      <DropDownPicker
        isFocus={isFocus}
        data={dropdown}
        value={value}
        search={false}
        setIsFocus={setIsFocus}
        setValue={setValue}
        placeholder={dropDownPlaceholder}
      />

      <View style={styles.targetInputContainer}>
        <View style={styles.targetInput}>
          <Input
            keyboardType="number-pad"
            inputMode="numeric"
            maxLength={value === 'Para' ? 2 : 3}
            ref={regularTargetRef}
            onChangeText={e => onChangeText(e)}
            placeholder={`${inputPlaceholder}`}
            placeholderStyle={{color: colors.dark.BLACK}}
            inputContainerStyle={{
              width: convert(350),
              backgroundColor: colors.dark.PRIMARY,
            }}
            inputStyle={{
              color: colors.dark.CONTRAST,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RegularTarget;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: convert(900),
    justifyContent: 'space-between',
    marginLeft: convert(35),
    // borderWidth: 1,
    // borderColor: 'black',
  },
  title: {color: colors.dark.BLACK, fontSize: FontSize.secondaryTitle},
  bottomSlider: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    backgroundColor: colors.dark.PRIMARY,
    width: convert(425),
    padding: 16,
  },
  containerStyle: {
    color: 'black',
  },
  dropdown: {
    backgroundColor: colors.dark.WHITE,
    // width: convert(300),
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: convert(10),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {color: 'black'},
  btn: {
    symbol: {
      color: colors.dark.BLACK,
      fontSize: FontSize.dateTxt,
    },
    height: convert(100),
    width: convert(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: convert(50),
    backgroundColor: colors.dark.WHITE,
  },
  targetInputContainer: {
    marginHorizontal: convert(50),
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  targetValContainer: {
    width: convert(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetVal: {
    fontSize: FontSize.secondaryTitle,
    color: colors.dark.WHITE,
  },
  targetInput: {
    paddingTop: convert(50),
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
