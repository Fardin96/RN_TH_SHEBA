import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
// components
import SalahTracker from './Salah/SalahTracker';
import BottomSlider from '../BottomSlider/BottomSlider';
import {colors} from '../../assets/colors/colors';

const Salah = () => {
  // useEffect(() => {
  //   console.log('SCREEN: SALAH: rendered!');
  // }, []);

  return (
    <ScrollView
      style={styles.root.style}
      contentContainerStyle={styles.root.contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <SalahTracker />

      <BottomSlider title={"Today's dua"} />
    </ScrollView>
  );
};

export default Salah;

const styles = StyleSheet.create({
  root: {
    style: {
      flex: 1,
      backgroundColor: colors.dark.PRIMARY,
      // marginHorizontal: convert(25),
    },
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'space-around',

      // borderWidth: 1,
      // borderColor: 'red',
    },
  },
});
