import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
// components
import AuthenticationForm from '../components/AuthScreens/AuthenticationForm';
// rtk-slices
import {setAuthToken} from '../redux-toolkit/features/authentication/authToken';
import {useLoginMutation} from '../redux-toolkit/features/authentication/auth-slice';
// functions
import {formValidation} from '../functions/validations/formValidation';

const Login = ({navigation}) => {
  const disptach = useDispatch();
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
    // handle empty input
    if (!formValidation(input, setErr)) {
      return;
    } else {
      setErr('');
    }

    try {
      loadingHandler();
      const response = await login(input);
      console.log('login response: ', response);
      loadingHandler();

      // handle login error
      if (response.error) {
        const error =
          response.error.data === 'Please enter correct name and password'
            ? 'Error logging in!'
            : '';
        setErr(error);
      }

      // handle login response
      if (response.data && response.data.token) {
        disptach(setAuthToken(response.data.token));
        navigation.push('Home');
      }
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
