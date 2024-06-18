import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// assets
import {convert} from '../../assets/dimensions/dimensions';
import {colors} from '../../assets/colors/colors';
import {FontSize} from '../../assets/fonts/fonts';

const DateCircle = ({date}) => {
  return (
    <View style={styles.root}>
      <View style={styles.circle.root}>
        <View style={styles.circleInner}>
          <Text style={styles.dateTxt}>{date.day}</Text>
        </View>
      </View>

      <View style={styles.month.container}>
        <Text style={styles.text}>{date.month}</Text>
      </View>
    </View>
  );
};

export default DateCircle;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'green',
  },
  circle: {
    root: {
      right: convert(-23),
      height: convert(150),
      width: convert(150),
      borderRadius: convert(110),
      backgroundColor: colors.dark.WHITE,
      borderWidth: convert(10),
      borderColor: colors.dark.ACCENT,
    },
  },
  circleInner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: convert(130),
    width: convert(130),
    borderRadius: convert(100),
  },
  text: {color: colors.dark.BLACK, fontFamily: 'Montserrat-ExtraBold'},
  dateTxt: {
    color: colors.dark.BLACK,
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: FontSize.dateTxt,
  },
  month: {
    container: {
      height: convert(80),
      width: convert(200),
      borderTopEndRadius: convert(30),
      borderBottomEndRadius: convert(30),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.dark.WHITE,

      borderWidth: 1,
      borderLeftColor: colors.dark.WHITE,
      borderRightColor: colors.dark.ACCENT,
      borderTopColor: colors.dark.ACCENT,
      borderBottomColor: colors.dark.ACCENT,

      // borderColor: 'blue',
    },
  },
});
