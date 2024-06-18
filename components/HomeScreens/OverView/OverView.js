import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
// components
import BgBox from '../../HomeScreens/Quran/BgBox';
import ProgressComponent from './ProgressComponent';
// assets
import {colors} from '../../../assets/colors/colors';
import {convert} from '../../../assets/dimensions/dimensions';
import {FarjSalahCompletion} from '../../../functions/SalahFunctions';
// rtk-slice
import {getSalahInfo} from '../../../redux-toolkit/features/salah-checklist/salah-info';

const OverView = () => {
  const salahInfo = useSelector(getSalahInfo);

  const farjSalahCount = 5;
  const farjSalahCompletionCount = FarjSalahCompletion(salahInfo);

  // console.log(salahInfo);
  // console.log(farjSalahCompletionCount);

  return (
    <View style={styles.root}>
      <BgBox title={'Today'}>
        <ProgressComponent
          title={'Salah'}
          totalTasks={farjSalahCount}
          completedTasks={farjSalahCompletionCount}
        />

        <ProgressComponent
          title={'Quran'}
          totalTasks={15}
          completedTasks={14}
        />

        <ProgressComponent
          title={'Daily Target'}
          totalTasks={5}
          completedTasks={1}
        />
      </BgBox>
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: convert(25),
    backgroundColor: colors.dark.PRIMARY,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
});
