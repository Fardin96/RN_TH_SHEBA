import React, {useEffect, useState} from 'react';
// components
import AuthenticationForm from '../components/AuthScreens/AuthenticationForm';
// rtk-slices
import {useRegistrationMutation} from '../redux-toolkit/features/authentication/auth-slice';
// functions
import {formValidation} from '../functions/validations/formValidation';

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

  const onSubmit = async input => {
    // handle empty input
    if (!formValidation(input, setErr)) {
      return;
    } else {
      setErr('');
    }

    try {
      loadingHandler();
      const response = await registration(input);
      loadingHandler();

      // handle registration error
      if (response?.error) {
        const error = 'Error registering!';
        setErr(error);
        return;
      }

      // handle registration response
      if (response?.data && response.data.token) {
        // console.log('login successful: msg:', response.data);

        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('SCREEN:REGISTER: REGISTER API ERR: ', error);
    }
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
