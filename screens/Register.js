import React, {useEffect, useState} from 'react';
// components
import AuthenticationForm from '../components/AuthScreens/AuthenticationForm';
// rtk-slices
import {useRegistrationMutation} from '../redux-toolkit/features/authentication/auth-slice';
// functions
import {registerFormValidation} from '../functions/validations/formValidation';

const Register = ({navigation}) => {
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [registration] = useRegistrationMutation();

  const loadingHandler = () => {
    setLoading(prev => !prev);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErr('');
    }, 3500);

    return () => clearTimeout(timeout);
  }, [err]);

  // todo: pref: 1. useMemo, useCallback, lazy loading
  // remove console.logs -> use lib
  // profiling -> flipper, rn-debugger
  // check if using hermes
  const onSubmit = async input => {
    // console.log('screen: register: input ->', input);

    // handle wrong input
    if (!registerFormValidation(input, setErr)) {
      //! todo: uncomment
      return;
    } else {
      setErr('');
    }

    // todo: cache to asyncStorage -> clear on logout!
    //! todo: uncomment
    try {
      loadingHandler();
      const response = await registration(input);
      loadingHandler();

      if (response?.error) {
        const error = 'Error registering!';
        setErr(error);
        return;
      }

      if (response?.data) {
        if (
          response.data.message === 'Registration successful. Please login.'
        ) {
          navigation.navigate('Login');
        }
      }

      // console.log('SCREEN:REGISTER: REGISTER API OUTPUT: ', response);
    } catch (error) {
      console.error('SCREEN:REGISTER: REGISTER API ERR: ', error);
    }

    //! todo: uncomment
    // navigation.navigate('Login');
  };

  function handleLoginNav() {
    navigation.navigate('Login');
  }

  return (
    <AuthenticationForm
      title={'Register'}
      btnTitle={'Sign Up'}
      onSubmit={onSubmit}
      handleLoginNav={handleLoginNav}
      err={err}
      loading={loading}
    />
  );
};

export default Register;
