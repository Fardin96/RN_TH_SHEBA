import React from 'react';
import {StyleSheet, View} from 'react-native';
// assets
import {colors} from '../../assets/colors/colors';
import {convert} from '../../assets/dimensions/dimensions';
import {Dropdown} from 'react-native-element-dropdown';

const DropDownPicker = ({
  isFocus,
  data,
  value,
  search,
  setIsFocus,
  setValue,
  placeholder,
  dropdownPosition,
}) => {
  return (
    <View style={styles.container}>
      <Dropdown
        dropdownPosition={dropdownPosition ? dropdownPosition : 'auto'}
        style={[
          styles.dropdown,
          isFocus && {
            backgroundColor: colors.dark.CONTRAST,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          isFocus && {color: colors.dark.PRIMARY},
        ]}
        selectedStyle={{}}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={{backgroundColor: colors.dark.CONTRAST}}
        itemTextStyle={styles.itemTextStyle}
        labelField="label"
        valueField="value"
        // props
        data={data}
        value={value}
        search={search}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        maxHeight={300}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.dark.PRIMARY,
    height: convert(150),
    width: convert(425),
    // backgroundColor: 'transparent',
    padding: 16,
  },
  containerStyle: {
    // color: 'black',
    // backgroundColor: 'blue',
  },
  dropdown: {
    backgroundColor: colors.dark.PRIMARY,
    // width: convert(300),
    height: 50,
    // borderWidth: 0.5,
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
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark.CONTRAST,
    fontSize: convert(35),
    // fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark.CONTRAST,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark.PRIMARY,

    // height: 40,
    // fontSize: 16,
    // backgroundColor: colors.dark.CONTRAST,
  },
  itemTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark.PRIMARY,
  },
});
