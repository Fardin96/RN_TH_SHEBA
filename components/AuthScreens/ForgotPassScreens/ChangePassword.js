import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Button} from 'react-native-elements';
// assets
import {colors} from '../../../assets/colors/colors';
import {convert} from '../../../assets/dimensions/dimensions';
import {FontSize} from '../../../assets/fonts/fonts';
import CustomTextInput from '../../TextInput/CustomTextInput';
import {Text} from 'react-native';
import {passwordValidation} from '../../../functions/validations/formValidation';
import {Image} from 'react-native';
import {useResetPassMutation} from '../../../redux-toolkit/features/authentication/auth-slice';

const ChangePassword = () => {
  // const route = useRoute();
  // const {params} = route.params;

  const [resetPass] = useResetPassMutation();

  // console.log('SCREEN: CHANGE PASS: getting info: ', params);

  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const [hidden, sethidden] = useState(true);
  const [hidden2, sethidden2] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  function handleLoading() {
    setLoading(prev => !prev);
  }

  function eyePressHandler() {
    sethidden(prev => !prev);
  }

  function eyePressHandler2() {
    sethidden2(prev => !prev);
  }

  async function handleSubmit() {
    const input = {
      // ? placeholer
      uid: 'Mg',
      // ? placeholer
      token: 'c3msb7-975354aa73a5758f7277a826e71ad6f6',
      new_password1: passRef.current?.value,
      new_password2: confirmPassRef.current?.value,
    };
    // console.log('Password change requested!', input);

    if (!(input.new_password1 === input.new_password2)) {
      setErr("Passwords don't match!");
    }

    if (!passwordValidation(input.new_password1)) {
      setErr('Please set a valid password!');
    }

    handleLoading();
    const response = await resetPass(input);
    // console.log('response: ', response);
    handleLoading();

    if (response.data.message === 'Invalid token.') {
      setErr('Error resetting password!');
      return;
    }

    if (response.data.message === 'Password reset successful.') {
      setErr(response.data.message);
    }
  }

  useEffect(() => {
    let duration = 3500;

    const timeout = setTimeout(() => {
      setErr('');
    }, duration);

    return () => clearTimeout(timeout);
  }, [err]);

  return (
    <View style={styles.root}>
      <View style={styles.bg.container}>
        <Image
          source={require('../../../assets/images/auth-bg.png')}
          style={styles.bg.img}
          resizeMode="contain"
        />
      </View>

      <CustomTextInput
        defaultValue="something1"
        refProp={passRef}
        hidden={hidden}
        rightIcon={true}
        placeholder={'Set New Password'}
        maxLength={32}
        eyePressHandler={eyePressHandler}
        // errorStyle={styles.error}
        // errorMessage={errorMessage ? errorMessage : ''}
        hint={'*case-sensitive | 8-32 characters | min 1 letter & 1 digit'}
      />

      <CustomTextInput
        defaultValue="something1"
        refProp={confirmPassRef}
        hidden={hidden2}
        rightIcon={true}
        placeholder={'Confirm Password'}
        maxLength={32}
        eyePressHandler={eyePressHandler2}
        // errorStyle={styles.error}
        // errorMessage={errorMessage ? errorMessage : ''}
      />

      {err !== '' ? (
        <View style={styles.err.errContainer}>
          <Text style={styles.err.msg}>{err}</Text>
        </View>
      ) : (
        <View style={styles.err.errContainerEmpty} />
      )}

      <Button
        title={'Reset Password'}
        loading={loading}
        loadingProps={{size: 'small', color: colors.dark.WHITE}}
        buttonStyle={styles.btn.buttonStyle}
        titleStyle={styles.btn.titleStyle}
        containerStyle={styles.btn.containerStyle}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.PRIMARY,
  },

  bg: {
    container: {
      position: 'absolute',
      top: convert(500),
      opacity: 0.03,
    },
    img: {height: convert(700), width: convert(500)},
  },

  btn: {
    buttonStyle: {
      backgroundColor: colors.dark.ACCENT,
      height: convert(110),
      borderRadius: convert(75),
      width: convert(425),
      borderwidth: 1,
      borderColor: 'red',
    },
    titleStyle: {
      fontSize: FontSize.btnTitle,
      fontFamily: 'Montserrat-Bold',
    },
    containerStyle: {
      marginTop: convert(80),
      borderRadius: convert(75),
    },
  },

  error: {color: colors.dark.ERROR},
  err: {
    msg: {
      color: colors.dark.ERROR,
      fontFamily: 'Montserrat-Bold',
      fontSize: FontSize.mgsBottom,
    },
    errContainer: {
      width: convert(1000),
      alignItems: 'center',
      marginTop: convert(10),
      // borderWidth: 1,
      // borderColor: 'black',
    },
    errContainerEmpty: {
      width: convert(1000),
      alignItems: 'center',
      marginTop: convert(60),
      // borderWidth: 1,
      // borderColor: 'black',
    },
  },
});
