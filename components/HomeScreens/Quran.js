import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
// components
import QuranTracker from './Quran/QuranTracker';
import BottomSlider from '../BottomSlider/BottomSlider';
// assets
import {colors} from '../../assets/colors/colors';

const Quran = () => {
  // useEffect(() => {
  //   console.log('SCREEN: QURAN: rendered!');
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.root.contentContainerStyle}
      style={styles.root.style}
      showsVerticalScrollIndicator={false}>
      <QuranTracker />

      <BottomSlider title={"Today's dua"} />
    </ScrollView>
  );
};

export default Quran;

const styles = StyleSheet.create({
  root: {
    style: {
      flex: 1,
      backgroundColor: colors.dark.PRIMARY,

      // borderWidth: 1,
      // borderColor: 'red',
    },
    contentContainerStyle: {
      alignItems: 'center',
    },
  },
});
