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

const CompletedToday = ({dropDownPlaceholder, inputPlaceholder, setter}) => {
  const lastReadRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const data = [
    {label: 'Ayat', value: 'Ayat'},
    {label: 'Page', value: 'Page'},
    {label: 'Para', value: 'Para'},
  ];

  useEffect(() => {
    setter(() => ({
      unit: value === null ? dropDownPlaceholder : value,
      value:
        lastReadRef.current?.value === '' ||
        lastReadRef.current?.value === undefined
          ? inputPlaceholder
          : lastReadRef.current?.value,
    }));
  }, [value]);

  const onChangeText = e => {
    lastReadRef.current.value = e;
    setter(prev => ({
      ...prev,
      value: lastReadRef.current.value,
    }));
  };

  return (
    <View style={styles.root}>
      <DropDownPicker
        isFocus={isFocus}
        data={data}
        value={value}
        search={false}
        setIsFocus={setIsFocus}
        setValue={setValue}
        placeholder={dropDownPlaceholder}
      />

      <View style={styles.btnContainer}>
        <Input
          maxLength={value === 'Para' ? 2 : 3}
          inputMode="numeric"
          ref={lastReadRef}
          onChangeText={e => onChangeText(e)}
          placeholder={`${
            dropDownPlaceholder === 'ayat/page/para'
              ? 'value'
              : inputPlaceholder
          }`}
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
  );
};

export default CompletedToday;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: convert(900),
    justifyContent: 'center',
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
  btnContainer: {
    marginTop: convert(35),
    marginHorizontal: convert(30),
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
});
