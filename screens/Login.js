import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// components
import AuthenticationForm from '../components/AuthScreens/AuthenticationForm';
// rtk-slices
import {setAuthToken} from '../redux-toolkit/features/authentication/authToken';
import {useLoginMutation} from '../redux-toolkit/features/authentication/auth-slice';
// functions
import {loginFormValidation} from '../functions/validations/formValidation';

// const Login = ({navigation}) => {
const Login = () => {
  const disptach = useDispatch();
  const navigation = useNavigation();
  const [login] = useLoginMutation();

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const loadingHandler = () => {
    setLoading(prev => !prev);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErr('');
    }, 3500);

    return () => clearTimeout(timeout);
  }, [err]);

  const onSubmit = async input => {
    // console.log('screen: login: input ->', input);

    // form validation
    // if (!loginFormValidation(input, setErr)) {
    //   //! todo: uncomment!
    //   return;
    // } else {
    //   setErr('');
    // }

    //! todo: uncomment!
    // todo: set to asyncStorage -> clear cache logic on login/out, appstate change
    try {
      loadingHandler();
      const response = await login(input);
      loadingHandler();

      if (response.error) {
        const error =
          response.error.data.detail === 'Invalid credentials'
            ? 'Error logging in!'
            : '';

        // console.log('LOGIN: ERROR: from res: ', response.error);
        // const error = 'Error logging in!';

        setErr(error);
      }

      if (response.data && response.data.token) {
        // console.log('token? :', response.data.access_token);
        disptach(setAuthToken(response.data.token));
        console.log('login successful');
        navigation.navigate('Home');
      }

      // console.log('LOGIN: RESPONSE: ', response);
    } catch (error) {
      console.error('LOGIN: ERROR: ', error);
    }
  };

  function handleRegistrationNav() {
    navigation.navigate('Register');
  }

  return (
    <AuthenticationForm
      title={'Login'}
      btnTitle={'Log in'}
      onSubmit={onSubmit}
      handleRegistrationNav={handleRegistrationNav}
      err={err}
      loading={loading}
      navigation={navigation}
    />
  );
};

export default Login;
