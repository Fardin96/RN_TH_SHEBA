/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
// components
import SalahTrackerView from './SalahTrackerView';
// rtk-slices
import {getArabicDate} from '../../../redux-toolkit/features/arabic-date/arabicDate';
import {useGetSalahCheckListQuery} from '../../../redux-toolkit/features/salah-checklist/salah-checklist-slice';
import {setAllSalahInfo} from '../../../redux-toolkit/features/salah-checklist/salah-info';
// assets
import {FontSize} from '../../../assets/fonts/fonts';
import {colors} from '../../../assets/colors/colors';

const SalahTracker = () => {
  const dispatch = useDispatch();
  const day = useSelector(getArabicDate);

  const {
    data = {},
    error,
    isError,
    isLoading,
  } = useGetSalahCheckListQuery({
    year: parseInt(day.year, 10),
    month: parseInt(day.monthNumber, 10),
    day: parseInt(day.day, 10),
  });

  useEffect(() => {
    // if (isError) {
    //   console.error('SCREEN:SALAH: get salah checklist error: ', error);
    //   console.error('SCREEN:SALAH: get salah checklist error: ', error.data);
    // }

    if (!isLoading && data) {
      // console.log('SCREEN:SALAH: get salah checklist data: ', data);
      dispatch(setAllSalahInfo(data));
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return (
      <View style={styles.loading.root}>
        <ActivityIndicator
          animating={true}
          color={colors.dark.CONTRAST}
          size={'large'}
        />
      </View>
    );
  }

  return (
    <>
      <SalahTrackerView data={data} />
    </>
  );
};

export default SalahTracker;

const styles = StyleSheet.create({
  loading: {
    root: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    txt: {fontSize: FontSize.secondaryTitle, color: colors.dark.BLACK},
  },
});
