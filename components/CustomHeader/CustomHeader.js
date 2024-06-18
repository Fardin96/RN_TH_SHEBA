/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
// asstes
import {convert} from '../../assets/dimensions/dimensions';
import {colors} from '../../assets/colors/colors';
// components
import DateCircle from './DateCircle';
import TopRightContainer from './TopRightContainer';
import SalahTimings from './SalahTimings';
// functions
import {hijriDate} from '../../functions/HijriDate';
import {getTimeNLocation} from '../../functions/CurrentTimeNLocation';
// rtk-slices
import {setArabicDate} from '../../redux-toolkit/features/arabic-date/arabicDate';

const CustomHeader = () => {
  const [timeNLocation, setTimeNLocation] = useState({
    location: {
      city: '',
    },
    time: {
      seheriIftarTimes: {
        seheri: {
          hour: '',
          minute: '',
        },
        iftar: {
          hour: '',
          minute: '',
        },
      },
      prayerTimes: {
        fajr: {
          hour: '',
          minute: '',
        },
        duhr: {
          hour: '',
          minute: '',
        },
        asr: {
          hour: '',
          minute: '',
        },
        magrib: {
          hour: '',
          minute: '',
        },
        isha: {
          hour: '',
          minute: '',
        },
      },
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const hijriDateToday = hijriDate();
    dispatch(setArabicDate(hijriDateToday));
    getTimeNLocation(setTimeNLocation);
  }, []);

  const allSalahTimings = [
    {
      startTime: `${timeNLocation.time.prayerTimes.fajr.hour} : ${timeNLocation.time.prayerTimes.fajr.minute}`,
      meridiem: 'AM',
      icon: 'sunrise',
      name: 'Fajr',
    },
    {
      startTime: `${timeNLocation.time.prayerTimes.duhr.hour} : ${timeNLocation.time.prayerTimes.duhr.minute}`,
      meridiem: 'PM',
      icon: 'sun',
      name: "Duh'r",
    },
    {
      startTime: `${timeNLocation.time.prayerTimes.asr.hour} : ${timeNLocation.time.prayerTimes.asr.minute}`,
      meridiem: 'PM',
      icon: 'sunset',
      name: 'Asr',
    },
    {
      startTime: `${timeNLocation.time.seheriIftarTimes.iftar.hour} : ${timeNLocation.time.seheriIftarTimes.iftar.minute}`,
      meridiem: 'PM',
      icon: 'moon',
      name: 'Magrib',
    },
    {
      startTime: `${timeNLocation.time.prayerTimes.isha.hour} : ${timeNLocation.time.prayerTimes.isha.minute}`,
      meridiem: 'PM',
      icon: 'moon',
      name: 'Isha',
    },
  ];

  return (
    <LinearGradient
      style={styles.root}
      colors={[colors.dark.GRADIENT_START, colors.dark.GRADIENT_END]}>
      <View style={styles.timedate}>
        <DateCircle date={hijriDate()} />

        <TopRightContainer
          seheri={timeNLocation.time.seheriIftarTimes.seheri}
          iftar={timeNLocation.time.seheriIftarTimes.iftar}
          city={timeNLocation.location.city}
        />
      </View>

      <View style={styles.salahtime}>
        {allSalahTimings.map((i, idx) => {
          return (
            <SalahTimings
              key={idx}
              meridiem={i.meridiem}
              startTime={i.startTime}
              icon={i.icon}
              name={i.name}
            />
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  root: {
    paddingBottom: convert(30),
    borderBottomLeftRadius: convert(50),
    borderBottomRightRadius: convert(50),
  },
  timedate: {
    height: convert(250),
    width: convert(1000),
    paddingRight: convert(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  salahtime: {
    width: convert(1000),
    flexDirection: 'row',
    paddingHorizontal: convert(25),
    backgroundColor: 'transparent',

    // borderWidth: 1,
    // borderColor: 'red',
  },
});
