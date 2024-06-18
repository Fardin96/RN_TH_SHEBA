/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// assets
import {colors} from '../../assets/colors/colors';
import {convert} from '../../assets/dimensions/dimensions';

const CustomTopTab = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.root}>
      {state.routes.map((route, idx) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === idx;

        function onPress() {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.7}
            onPress={onPress}
            style={{
              ...styles.btn.container,
              flex: label === 'OverView' ? null : 1,
              borderWidth: label === 'OverView' ? null : convert(5),
              backgroundColor: isFocused ? colors.dark.CONTRAST : null,
            }}>
            {label === 'OverView' ? (
              <Icon
                name="clipboard-text-outline"
                size={30}
                color={isFocused ? colors.dark.PRIMARY : colors.dark.CONTRAST}
              />
            ) : (
              <Text
                style={{
                  ...styles.btn.txt,
                  color: isFocused ? colors.dark.PRIMARY : colors.dark.CONTRAST,
                }}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTopTab;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: convert(25),
    backgroundColor: colors.dark.PRIMARY,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  btn: {
    container: {
      height: convert(78),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: convert(25),
      borderWidth: convert(5),
      borderColor: colors.dark.CONTRAST,
      marginHorizontal: convert(7),
      marginVertical: convert(22),
    },
    txt: {
      fontFamily: 'Montserrat-SemiBold',
    },
  },
});
