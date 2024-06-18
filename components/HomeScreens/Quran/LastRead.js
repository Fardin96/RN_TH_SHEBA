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

const LastRead = ({dropDownPlaceholder, inputPlaceholder, setter, data}) => {
  const lastReadRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    //* finding surah index
    setter(() => {
      let lastReadUnit = null;

      data.map((i, idx) => {
        if (i.value === value) {
          lastReadUnit = idx + 1;
        }
      });

      return {
        unit: lastReadUnit,
        value:
          lastReadRef.current?.value === '' ||
          lastReadRef.current?.value === undefined
            ? inputPlaceholder
            : lastReadRef.current?.value,
      };
    });
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
        search={true}
        setIsFocus={setIsFocus}
        setValue={setValue}
        placeholder={dropDownPlaceholder}
        dropdownPosition={'top'}
      />

      <View style={styles.btnContainer}>
        <Input
          maxLength={3}
          inputMode="numeric"
          ref={lastReadRef}
          onChangeText={e => onChangeText(e)}
          placeholder={`${inputPlaceholder}`}
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

export default LastRead;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: convert(900),
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
