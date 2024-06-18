import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {convert} from '../../assets/dimensions/dimensions';
import {colors} from '../../assets/colors/colors';
import {FontSize} from '../../assets/fonts/fonts';

const SalahTimings = ({startTime, meridiem, icon, name}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{startTime}</Text>
      <Text style={styles.txt}>{meridiem}</Text>
      <Icon name={`${icon}`} size={30} color={colors.dark.WHITE} />
      <Text style={styles.txt}>{name}</Text>
    </View>
  );
};

export default SalahTimings;

const styles = StyleSheet.create({
  root: {
    height: convert(280),
    width: convert(180),
    marginHorizontal: convert(5),
    paddingVertical: convert(30),
    borderRadius: convert(50),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.dark.PRIMARY,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  txt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: FontSize.small,
    color: colors.dark.WHITE,
  },
});
