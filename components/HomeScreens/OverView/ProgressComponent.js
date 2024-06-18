import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
// assets
import {convert} from '../../../assets/dimensions/dimensions';
import {colors} from '../../../assets/colors/colors';

const ProgressComponent = ({title, totalTasks, completedTasks}) => {
  return (
    <View style={styles.daily.container}>
      <View style={styles.daily.txtcontainer}>
        <Text style={styles.daily.txt}>{title}</Text>
        <Text style={styles.daily.txt}>
          ({completedTasks}/{totalTasks})
        </Text>
      </View>

      <View style={styles.progress.container}>
        <ProgressBar
          progress={completedTasks / totalTasks}
          width={convert(620)}
          height={convert(50)}
          color={colors.dark.CONTRAST}
        />
      </View>
    </View>
  );
};

export default ProgressComponent;

const styles = StyleSheet.create({
  daily: {
    container: {
      width: convert(930),
      paddingHorizontal: convert(25),
      flexDirection: 'row',

      // borderWidth: 1,
      // borderColor: 'red',
    },
    txtcontainer: {
      alignItems: 'center',
      width: convert(230),
      marginRight: convert(20),
      marginVertical: convert(20),

      // borderWidth: 1,
      // borderColor: 'green',
    },
    txt: {
      fontFamily: 'Montserrat-SemiBold',
      color: colors.dark.CONTRAST,
    },
  },
  progress: {
    container: {justifyContent: 'center'},
  },
});
