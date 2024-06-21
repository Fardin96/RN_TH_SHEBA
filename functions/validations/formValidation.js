export const passwordValidation = password => {
  // const passPattern = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

  if (typeof password !== 'undefined' && password !== '') {
    // console.log('valid  pass');
    return true;
  } else {
    // console.log(user);
    // console.log('invalid  pass');
    return false;
  }
};

export const emailValidation = email => {
  if (typeof email !== 'undefined' && email !== '') {
    // console.log('valid user');
    return true;
  } else {
    // console.log('validation func: invalid email');
    return false;
  }
};

export const formValidation = (input, setErr) => {
  // email validation
  if (!emailValidation(input.email)) {
    setErr('Please enter a valid email address');
    return false;
  }

  // password matching
  if (
    input.confirmPassword !== undefined &&
    input.password !== input.confirmPassword
  ) {
    setErr("Passwords don't match!");
    return;
  }

  if (!passwordValidation(input.password)) {
    setErr('Please enter valid name and password');
    return false;
  }

  if (
    input.confirmPassword !== undefined &&
    !passwordValidation(input.confirmPassword)
  ) {
    setErr('Please enter valid name and password');
    return false;
  }

  return true;
};
