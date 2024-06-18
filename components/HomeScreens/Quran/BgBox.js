import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import {convert} from '../../../assets/dimensions/dimensions';

const BgBox = ({title, children, styleprop}) => {
  const styles = StyleSheet.create({
    root: {
      width: convert(935),
      marginBottom: title === 'Completed today' ? null : convert(41),
      paddingTop: convert(35),
      paddingBottom: title === 'Today' ? convert(35) : null,
      alignItems: 'center',
      justifyContent: 'center',

      borderWidth: convert(5),
      borderRadius: convert(25),
      borderColor: colors.dark.CONTRAST,
    },
    title: {
      bg: {
        paddingHorizontal: convert(50),
        backgroundColor: colors.dark.PRIMARY,
        position: 'absolute',
        top: -12,
        alignItems: 'center',
      },
      txt: {
        fontFamily: 'Montserrat-SemiBold',
        color: colors.dark.CONTRAST,

        // fontSize: FontSize.secondaryTitle,
        // fontWeight: 'bold',
      },
    },
    children: {
      // borderWidth: 1,
      // borderColor: 'red',
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.title.bg}>
        <Text style={styles.title.txt}>{title}</Text>
      </View>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

export default BgBox;
