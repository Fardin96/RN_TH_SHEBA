import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TimerPickerModal} from 'react-native-timer-picker';
import {formatTime} from '../../../../functions/FormatTime/FormatTime';
// import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
// import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
// import * as Haptics from "expo-haptics"; // for haptic feedback

const TimePickerView = ({alarmString, setAlarmString}) => {
  const [showPicker, setShowPicker] = useState(false);
  // const [alarmString, setAlarmString] = useState('');

  return (
    <View
      style={{
        // backgroundColor: '#514242',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Text style={{fontSize: 18, color: 'black'}}>
        {alarmString !== '' ? 'Alarm set for' : 'No alarm set'}
      </Text> */}

      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View style={{alignItems: 'center'}}>
          {alarmString !== null ? (
            <View
            // style={{borderWidth: 1, borderColor: 'blue'}}
            >
              <Text style={{color: 'black', fontSize: 30}}>{alarmString}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}>
            <View
            // style={{marginTop: 30}}
            >
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                  overflow: 'hidden',
                  borderColor: 'black',
                  color: 'black',
                }}>
                Set Alarm 🔔
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TimerPickerModal
        use12HourPicker
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={pickedDuration => {
          setAlarmString(formatTime(pickedDuration));
          setShowPicker(false);
        }}
        modalTitle="Set Alarm"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        // Audio={Audio}
        // LinearGradient={LinearGradient}
        // Haptics={Haptics}
        styles={{
          theme: 'dark',
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
};

export default TimePickerView;
