/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox, SearchBar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
// assets
import {colors} from '../../../assets/colors/colors';
import {convert} from '../../../assets/dimensions/dimensions';
import {FontSize} from '../../../assets/fonts/fonts';
// rtk-slices
import {useSetSalahCheckListMutation} from '../../../redux-toolkit/features/salah-checklist/salah-checklist-slice';
import {setSalahInfo} from '../../../redux-toolkit/features/salah-checklist/salah-info';
import {getArabicDate} from '../../../redux-toolkit/features/arabic-date/arabicDate';

const SalahTrackerView = ({data}) => {
  const dispatch = useDispatch();
  const day = useSelector(getArabicDate);

  const [setSalahCheckList] = useSetSalahCheckListMutation();

  //* handeling race conditions with queue
  const stateUpdateQueue = useRef([]);
  const [processingQueue, setProcessingQueue] = useState(false);

  const addToQueue = (field, value) => {
    stateUpdateQueue.current.push({field, value});
    if (!processingQueue) {
      processQueue();
    }
  };

  const processQueue = async () => {
    setProcessingQueue(true);

    while (stateUpdateQueue.current.length > 0) {
      const {field, value} = stateUpdateQueue.current[0];
      try {
        const response = await setSalahCheckList({
          field,
          value,
          year: parseInt(day.year, 10),
          month: parseInt(day.monthNumber, 10),
          day: parseInt(day.day, 10),
        });

        // console.log('SALAH TRACKER RACE QUEUE: response: ', response);
        // console.log(
        //   'SALAH TRACKER RACE QUEUE: response: ',
        //   response.error.data.detail,
        // );

        // sync db & state
        dispatch(setSalahInfo({field: field, value: value}));

        // Remove processed state from the queue
        stateUpdateQueue.current.shift();
      } catch (error) {
        console.error('Error updating state:', error);
        break;
      }
    }

    setProcessingQueue(false);
  };

  //   todo: think of a alternative solution than using 13 useState in a single component
  const [fajr, setFajr] = useState(data.fardh_fajr);
  const [fajrSunnah, setFajrSunnah] = useState(data.sunnah_fajr);
  const [johr, setJohr] = useState(data.fardh_duhr);
  const [johrSunnah, setJohrSunnah] = useState(data.sunnah_duhr);
  const [asr, setAsr] = useState(data.fardh_asr);
  const [asrSunnah, setAsrSunnah] = useState(data.sunnah_asr);
  const [magrib, setMagrib] = useState(data.fardh_maghrib);
  const [magribSunnah, setMagribSunnah] = useState(data.sunnah_maghrib);
  const [esha, setEsha] = useState(data.fardh_isha);
  const [eshaSunnah, setEshaSunnah] = useState(data.sunnah_isha);
  const [taraweeh, setTaraweeh] = useState(data.sunnah_taraweeh);
  const [tahajjut, setTahajjut] = useState(data.sunnah_tahajjud);
  const [salahDuha, setSalahDuha] = useState(data.sunnah_duha);

  const checkFajr = async () => {
    let newValue = !fajr;

    setFajr(newValue);
    addToQueue('fardh_fajr', newValue);
  };

  const checkFajrSunnah = async () => {
    let newValue = !fajrSunnah;

    setFajrSunnah(newValue);
    addToQueue('sunnah_fajr', newValue);
  };

  const checkJohr = async () => {
    let newValue = !johr;

    setJohr(newValue);
    addToQueue('fardh_duhr', newValue);
  };

  const checkJohrSunnah = async () => {
    let newValue = !johrSunnah;

    setJohrSunnah(newValue);
    addToQueue('sunnah_duhr', newValue);
  };

  const checkAsr = async () => {
    let newValue = !asr;

    setAsr(newValue);
    addToQueue('fardh_asr', newValue);
  };

  const checkAsrSunnah = async () => {
    let newValue = !asrSunnah;

    setAsrSunnah(newValue);
    addToQueue('sunnah_asr', newValue);
  };

  const checkMagrib = async () => {
    let newValue = !magrib;

    setMagrib(newValue);
    addToQueue('fardh_maghrib', newValue);
  };

  const checkMagribSunnah = async () => {
    let newValue = !magribSunnah;

    setMagribSunnah(newValue);
    addToQueue('sunnah_maghrib', newValue);
  };

  const checkEsha = async () => {
    let newValue = !esha;

    setEsha(newValue);
    addToQueue('fardh_isha', newValue);
  };

  const checkEshaSunnah = async () => {
    let newValue = !eshaSunnah;

    setEshaSunnah(newValue);
    addToQueue('sunnah_isha', newValue);
  };

  const checkTaraweeh = async () => {
    let newValue = !taraweeh;

    setTaraweeh(newValue);
    addToQueue('sunnah_taraweeh', newValue);
  };

  const checkTahajjut = async () => {
    let newValue = !tahajjut;

    setTahajjut(newValue);
    addToQueue('sunnah_tahajjud', newValue);
  };

  const checkSalahDuha = async () => {
    let newValue = !salahDuha;

    setSalahDuha(newValue);
    addToQueue('sunnah_duha', newValue);
  };

  const salah = [
    {
      salahName: 'Fajr',
      farj: true,
      checked: fajr,
      checkedSunnah: fajrSunnah,
      farjCheck: checkFajr,
      sunnahCheck: checkFajrSunnah,
    },
    {
      salahName: 'Johr',
      farj: true,
      checked: johr,
      checkedSunnah: johrSunnah,
      farjCheck: checkJohr,
      sunnahCheck: checkJohrSunnah,
    },
    {
      salahName: 'Asr',
      farj: true,
      checked: asr,
      checkedSunnah: asrSunnah,
      farjCheck: checkAsr,
      sunnahCheck: checkAsrSunnah,
    },
    {
      salahName: 'Magrib',
      farj: true,
      checked: magrib,
      checkedSunnah: magribSunnah,
      farjCheck: checkMagrib,
      sunnahCheck: checkMagribSunnah,
    },
    {
      salahName: 'Esha',
      farj: true,
      checked: esha,
      checkedSunnah: eshaSunnah,
      farjCheck: checkEsha,
      sunnahCheck: checkEshaSunnah,
    },
    {
      salahName: 'Taraweeh',
      farj: false,
      checked: '',
      checkedSunnah: taraweeh,
      farjCheck: null,
      sunnahCheck: checkTaraweeh,
    },
    {
      salahName: 'Tahajjut',
      farj: false,
      checked: '',
      checkedSunnah: tahajjut,
      farjCheck: null,
      sunnahCheck: checkTahajjut,
    },
    {
      salahName: 'Salatuh duha',
      farj: false,
      checked: '',
      checkedSunnah: salahDuha,
      farjCheck: null,
      sunnahCheck: checkSalahDuha,
    },
  ];

  return (
    <View style={styles.trackerContainer}>
      {/* ROW TITLE */}
      <View style={styles.salahRowContainer}>
        <View style={{...styles.smallBox, marginHorizontal: convert(30)}} />

        <View style={styles.smallBox}>
          <Text style={styles.title}>Farj</Text>
        </View>
        <View style={styles.smallBox}>
          <Text style={styles.title}>Sunnah</Text>
        </View>
      </View>
      {/* ROW TITLE */}

      {/* ROWS */}
      {salah.map((i, idx) => {
        return (
          <View key={idx} style={styles.salahRowContainer}>
            <View style={styles.rows.container}>
              <Text style={styles.rows.txt}>{i.salahName}</Text>
            </View>

            <View style={styles.smallBox}>
              {i.farj ? (
                <CheckBox
                  checked={i.checked}
                  onPress={() => i.farjCheck()}
                  checkedColor={colors.dark.CONTRAST}
                  size={FontSize.semiMedium}
                />
              ) : (
                <></>
              )}
            </View>

            <View style={styles.smallBox}>
              <CheckBox
                checked={i.checkedSunnah}
                onPress={() => i.sunnahCheck()}
                checkedColor={colors.dark.CONTRAST}
                size={FontSize.semiMedium}
              />
            </View>
          </View>
        );
      })}
      {/* ROWS */}
    </View>
  );
};

export default SalahTrackerView;

const styles = StyleSheet.create({
  trackerContainer: {
    width: convert(950),
    height: convert(1150),

    borderWidth: convert(5),
    borderRadius: convert(25),
    borderColor: colors.dark.CONTRAST,
    // borderColor: 'green',
  },
  smallBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark.CONTRAST,
    fontSize: FontSize.medium,
  },
  salahRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: convert(125),

    // borderWidth: 1,
    // borderColor: 'black',
  },
  rows: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: convert(90),
      marginHorizontal: convert(30),
      borderRadius: convert(25),
      backgroundColor: colors.dark.CONTRAST,

      // borderWidth: 1,
      // borderColor: 'red',
    },
    txt: {
      fontFamily: 'Montserrat-SemiBold',
      color: colors.dark.PRIMARY,
    },
  },
});
