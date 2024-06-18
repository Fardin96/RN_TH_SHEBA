import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// assets
import {convert} from '../../assets/dimensions/dimensions';
import {colors} from '../../assets/colors/colors';
import {FontSize} from '../../assets/fonts/fonts';
import {IFTAR_TXT, SEHERI_TXT} from '../../assets/texts/staticText';

const TopRightContainer = ({seheri, iftar, city}) => {
  return (
    <View style={styles.root}>
      <View style={styles.topBoxContainer}>
        {/* sahri iftar component */}
        <View style={styles.topbox}>
          <Text style={styles.text}>
            {SEHERI_TXT}
            <Text style={styles.time}>
              {' '}
              {seheri.hour} : {seheri.minute}
              {' AM'}
            </Text>
          </Text>

          <View style={styles.iftar.container}>
            <Text style={styles.text}>
              {IFTAR_TXT}
              <Text style={styles.time}>
                {' '}
                {iftar.hour} : {iftar.minute}
                {' PM'}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.location.container}>
        <Icon name={'location-pin'} size={20} color={colors.dark.WHITE} />
        <Text style={styles.location.txt}>{city}</Text>
      </View>
    </View>
  );
};

export default TopRightContainer;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'green',
  },
  topBoxContainer: {
    height: convert(200),
    justifyContent: 'center',
    marginRight: convert(20),

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  topbox: {
    justifyContent: 'center',
    height: convert(92.5),
  },
  text: {color: colors.dark.BLACK, fontFamily: 'Montserrat-Bold'},
  time: {
    fontSize: FontSize.mgsBottom,
    fontWeight: 'bold',
    color: colors.dark.PRIMARY,
  },
  iftar: {
    container: {alignSelf: 'flex-end'},
  },
  location: {
    container: {
      height: convert(100),
      width: convert(200),
      paddingHorizontal: convert(5),
      marginLeft: convert(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: convert(40),
      backgroundColor: colors.dark.PRIMARY,

      // borderWidth: 1,
      // borderColor: 'red',
    },
    txt: {
      fontFamily: 'Montserrat-ExtraBold',
      color: colors.dark.WHITE,
      fontSize: convert(27),
    },
  },
});
