import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
// components
import AuthenticationForm from '../components/AuthScreens/AuthenticationForm';
// rtk-slices
import {setAuthToken} from '../redux-toolkit/features/authentication/authToken';
import {useLoginMutation} from '../redux-toolkit/features/authentication/auth-slice';
// functions
import {loginFormValidation} from '../functions/validations/formValidation';

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
    // console.log('screen: login: input ->', input);

    // handle wrong input
    if (!loginFormValidation(input, setErr)) {
      //! todo: uncomment!
      return;
    } else {
      setErr('');
    }

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

      if (response.data) {
        if (response.data.access_token) {
          // console.log('token? :', response.data.access_token);
          disptach(setAuthToken(response.data.access_token));
          navigation.navigate('Home');
        }
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
