import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
// rtk-slices
import {useSetRecitationInfoMutation} from '../../../redux-toolkit/features/recitation-Info/recitation-info-slice';
import {getArabicDate} from '../../../redux-toolkit/features/arabic-date/arabicDate';
// functions
import {inputError} from '../../../functions/validations/recitationValidation';
import {convert} from '../../../assets/dimensions/dimensions';
// assets
import {surahInfo} from '../../../assets/constants/surahInfo';
import {colors} from '../../../assets/colors/colors';
// components
import CompletedToday from './CompletedToday';
import BgBox from './BgBox';
import LastRead from './LastRead';
import RegularTarget from './RegularTarget';

const QuranTrackerView = ({data}) => {
  const day = useSelector(getArabicDate);
  const [setRecitationInfo] = useSetRecitationInfoMutation();

  //* REGULAR TARGET
  const [regularTarget, setRegularTarget] = useState({
    unit: '',
    value: '',
  });

  //* LAST READ
  const [lastread, setLastread] = useState({
    unit: '',
    value: '',
  });

  //* COMPLETED TODAY
  const [today, setToday] = useState({
    unit: '',
    value: '',
  });

  const [err, setErr] = useState('');
  const handleError = info => {
    setErr(info);
  };

  const [loading, setLoading] = useState(false);
  function loadingHandler() {
    setLoading(prev => !prev);
  }

  function regularTargetDDPlaceholer() {
    return data.unit === '' ? 'ayat/page/para' : data.unit;
  }

  const regularTargetInputPlaceholer = () => {
    return data.target_value === null ? 'value' : data.target_value;
  };

  const lastReadDDPlaceholder = () => {
    let value = 'Surah';

    if (!(JSON.stringify(data) === '{}')) {
      surahInfo.map((i, idx) => {
        if (data.last_read_surah === idx + 1) {
          value = i.value;
        }
      });
    }

    return value;
  };

  const lastReadInputPlaceholer = () => {
    return data?.last_read_value === null ? 'Ayat no.' : data.last_read_value;
  };

  function completedTodayInputPlaceholder() {
    return data.completed_value === null ? 'value' : data.completed_value;
  }

  const handleSubmit = async () => {
    const input = {
      unit: regularTarget.unit ?? data.unit,
      last_read_surah: parseInt(lastread.unit ?? data.last_read_surah, 10),
      // todo: update last_read_value according to regular target value & completed today value
      last_read_value: parseInt(lastread.value ?? data.last_read_value, 10),
      target_value: parseInt(regularTarget.value ?? data.target_value, 10),
      completed_value: parseInt(today.value ?? data.completed_value, 10),
    };

    // console.log('input: ', input);

    //* inputError -> true; error exists
    if (inputError(input, handleError)) {
      return;
    } else {
      handleError('');
    }

    try {
      // console.log('SCREEN: QURAN: info: ', input);
      loadingHandler();
      const response = await setRecitationInfo({
        data: input,
        year: parseInt(day.year, 10),
        month: parseInt(day.monthNumber, 10),
        day: parseInt(day.day, 10),
      });
      loadingHandler();
      // console.log('SCREEN:QURAN: set recitation info: ', response);

      if (response.error) {
        handleError('Error updating data');
        return;
      }

      if (response.data.message === 'Checklist updated') {
        handleError('Recitation tracker updated!');
      }
    } catch (issue) {
      console.error('SCREEN: QURAN: ERROR: ', issue);
    }
  };

  useEffect(() => {
    let duration = 3500;

    const timeout = setTimeout(() => {
      setErr('');
    }, duration);

    return () => clearTimeout(timeout);
  }, [err]);

  return (
    <View style={styles.root}>
      <BgBox title={'Regular Target'}>
        <RegularTarget
          dropDownPlaceholder={regularTargetDDPlaceholer()}
          inputPlaceholder={regularTargetInputPlaceholer()}
          setter={setRegularTarget}
        />
      </BgBox>

      <BgBox title={'Last Read'}>
        <LastRead
          dropDownPlaceholder={lastReadDDPlaceholder()}
          inputPlaceholder={lastReadInputPlaceholer()}
          setter={setLastread}
          data={surahInfo}
        />
      </BgBox>

      <BgBox title={'Completed today'}>
        <CompletedToday
          dropDownPlaceholder={regularTargetDDPlaceholer()}
          inputPlaceholder={completedTodayInputPlaceholder()}
          setter={setToday}
        />
      </BgBox>

      {err !== '' ? (
        <View style={styles.err.container}>
          <Text style={styles.err.msg}>{err}</Text>
        </View>
      ) : (
        <View style={styles.err.container} />
      )}

      <Button
        title={'+ ADD TARGET'}
        loading={loading}
        loadingProps={{size: 'small', color: colors.dark.PRIMARY}}
        buttonStyle={styles.btn.buttonStyle}
        titleStyle={styles.btn.titleStyle}
        containerStyle={styles.btn.containerStyle}
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

export default QuranTrackerView;

const styles = StyleSheet.create({
  root: {
    width: convert(950),
    alignItems: 'center',
    paddingTop: convert(25),
    borderRadius: convert(25),

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  btn: {
    buttonStyle: {
      height: convert(100),
      width: convert(890),
      marginBottom: convert(58),
      borderRadius: convert(25),
      backgroundColor: colors.dark.CONTRAST,

      // borderWidth: convert(10),
      // borderColor: colors.dark.ACCENT,
    },
    titleStyle: {
      fontFamily: 'Montserrat-SemiBold',
      color: colors.dark.PRIMARY,
    },
  },
  err: {
    msg: {
      fontFamily: 'Montserrat-SemiBold',
      color: colors.dark.ERROR,
    },
    container: {
      height: convert(80),
      width: convert(1000),
      alignItems: 'center',
      justifyContent: 'center',

      // borderWidth: 1,
      // borderColor: 'blue',
    },
  },
});
