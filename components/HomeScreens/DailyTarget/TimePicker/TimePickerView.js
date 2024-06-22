import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TimerPickerModal} from 'react-native-timer-picker';
import {formatTime} from '../../../../functions/FormatTime/FormatTime';

const TimePickerView = ({alarmString, setAlarmString}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View
      style={{
        // backgroundColor: '#514242',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View style={{alignItems: 'center'}}>
          {alarmString !== null ? (
            <View>
              <Text style={{color: 'black', fontSize: 30}}>{alarmString}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}>
            <View>
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
