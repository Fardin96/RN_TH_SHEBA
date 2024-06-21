import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
// assets
import {convert} from '../../assets/dimensions/dimensions';
import {colors} from '../../assets/colors/colors';
import {FontSize} from '../../assets/fonts';
import {APP_NAME} from '../../assets/texts/StaticText';
import {Image} from 'react-native';
// component
import CustomTextInput from '../TextInput/CustomTextInput';

const AuthenticationForm = ({
  errorMessage,
  title,
  btnTitle,
  onSubmit,
  handleRegistrationNav,
  handleLoginNav,
  loading,
  err,
  navigation,
}) => {
  const styles = StyleSheet.create({
    root: {
      containerStyle: {
        width: convert(1000),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dark.PRIMARY,

        // borderWidth: 1,
        // borderColor: 'blue',
      },
    },
    logo: {
      container: {
        borderwidth: 1,
        borderColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
      },
      img: {
        marginTop: convert(150),
        height: convert(200),
        width: convert(600),
      },
    },
    form: {
      flex: 1,
      paddingTop: title === 'Login' ? convert(300) : convert(100),
      width: convert(1000),
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
      // borderColor: 'blue',
    },
    titleTop: {
      // marginVertical: convert(200),
      marginTop: convert(50),
      color: colors.dark.ACCENT,
      fontFamily: 'NovaMono-Regular',
      fontSize: convert(70),
    },
    bg: {
      container: {
        position: 'absolute',
        top: title === 'Register' ? convert(175) : convert(100),
        opacity: 0.03,
      },
      img: {height: convert(700), width: convert(500)},
    },
    bottom: {
      width: '100%',
      justifyContent: 'center',
      marginTop: convert(50),
      marginBottom: convert(300),
      alignItems: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
    },
    titleBottom: {
      opacity: 0.5,
      color: colors.dark.CONTRAST,
      fontFamily: 'Montserrat-Regular',
    },
    touchtitleBottom: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: FontSize.mgsBottom,
      color: colors.dark.CONTRAST,
    },
    touchtitleBottomContainer: {
      borderwidth: 1,
      borderColor: 'blue',
      height: convert(150),
      width: title === 'Register' ? convert(300) : null,
      alignItems: 'center',
    },
    error: {color: colors.dark.ERROR},
    btn: {
      buttonStyle: {
        backgroundColor: colors.dark.ACCENT,
        height: convert(110),
        borderRadius: convert(75),
        width: convert(425),
        // borderwidth: 1,
        // borderColor: 'red',
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
    info: {color: colors.dark.PRIMARY, fontSize: FontSize.hint},
    infoContainer: {
      width: convert(1000),
      paddingLeft: convert(25),
      // borderWidth: 1,
      // borderColor: 'black',
    },
    forgotPass: {
      container: {
        width: convert(1000),
        paddingLeft: convert(155),
        marginTop: convert(100),
        // borderwidth: 5,
        // borderColor: 'red',
      },
      txt: {
        fontFamily: 'Montserrat-Bold',
        color: colors.dark.CONTRAST,
        fontSize: FontSize.mgsBottom,
        // fontWeight: 'bold',
      },
    },
  });

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);

  const eyePressHandler = () => {
    setHidden(prev => !prev);
  };
  const eyePressHandler2 = () => {
    setHidden2(prev => !prev);
  };

  //* focus inputbox
  // useEffect(() => {
  //   if (title === 'Login') {
  //     // emailRef.current.focus();
  //   }

  //   if (title === 'Register') {
  //     // nameRef.current.focus();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSubmit = () => {
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const email = emailRef.current?.value;

    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
    };

    onSubmit(userData);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.root.containerStyle}
      showsVerticalScrollIndicator={false}>
      <View style={styles.logo.container}>
        <Image
          source={require('../../assets/images/sheba_logo.png')}
          resizeMode="contain"
          style={styles.logo.img}
        />

        <Text style={styles.titleTop}>{APP_NAME}</Text>
      </View>

      <View style={styles.form}>
        {title === 'Register' ? (
          <>
            <CustomTextInput
              refProp={nameRef}
              placeholder="Name"
              maxLength={20}
              errorStyle={styles.error}
              errorMessage={errorMessage ? errorMessage : ''}
            />
            {/* <CustomTextInput
              refProp={lastNameRef}
              placeholder="Last Name"
              maxLength={20}
              errorStyle={styles.error}
              errorMessage={errorMessage ? errorMessage : ''}
            /> */}
          </>
        ) : (
          <></>
        )}
        <CustomTextInput
          defaultValue="fardinshuvro96@gmail.co"
          refProp={emailRef}
          placeholder="Email"
          errorStyle={styles.error}
          errorMessage={errorMessage ? errorMessage : ''}
          hint={'*case-sensitive'}
        />
        {/* <View style={styles.bg.container}>
          <Image
            source={require('../../assets/images/auth-bg.png')}
            style={styles.bg.img}
            resizeMode="contain"
          />
        </View> */}
        <CustomTextInput
          defaultValue="something1"
          refProp={passwordRef}
          hidden={hidden}
          rightIcon={true}
          placeholder={'Password'}
          maxLength={32}
          eyePressHandler={eyePressHandler}
          errorStyle={styles.error}
          errorMessage={errorMessage ? errorMessage : ''}
          hint={'*case-sensitive | 8-32 characters | min 1 letter & 1 digit'}
        />
        {title === 'Register' ? (
          <CustomTextInput
            // defaultValue="something1"
            refProp={confirmPasswordRef}
            hidden={hidden2}
            rightIcon={true}
            placeholder={'Confirm Password'}
            maxLength={32}
            eyePressHandler={eyePressHandler2}
            errorStyle={styles.error}
            errorMessage={errorMessage ? errorMessage : ''}
          />
        ) : (
          <></>
        )}

        <View style={styles.forgotPass.container} />

        {err !== '' ? (
          <View style={styles.err.errContainer}>
            <Text style={styles.err.msg}>{err}</Text>
          </View>
        ) : (
          <View style={styles.err.errContainerEmpty} />
        )}

        <Button
          title={btnTitle}
          loading={loading}
          loadingProps={{size: 'small', color: colors.dark.WHITE}}
          buttonStyle={styles.btn.buttonStyle}
          titleStyle={styles.btn.titleStyle}
          containerStyle={styles.btn.containerStyle}
          onPress={handleSubmit}
        />
        {title === 'Register' ? (
          <View style={styles.bottom}>
            <Text style={styles.titleBottom}>or,</Text>
            <TouchableOpacity
              onPress={handleLoginNav}
              style={styles.touchtitleBottomContainer}>
              <Text style={styles.touchtitleBottom}>Log In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottom}>
            <Text style={styles.titleBottom}>or,</Text>
            <TouchableOpacity
              onPress={handleRegistrationNav}
              style={styles.touchtitleBottomContainer}>
              <Text style={styles.touchtitleBottom}>Create an account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AuthenticationForm;
