export const nameValidation = name => {
  //* allowed char -> not start with . or, _
  //*               -> 3 to 20 chars
  //*               -> upper/lower case and all digits allowed
  //*               -> can't start with , . or, spaces

  const namePattern =
    /^(?=[a-zA-Z0-9._\s]{3,20}$)(?!.*[_.\s]{2})[^_.\s].*[^_.\s]$/;

  if (typeof name !== 'undefined' && namePattern.test(name)) {
    // console.log('valid name');
    return true;
  } else {
    // console.log('invalid name');
    return false;
  }
};

export const passwordValidation = password => {
  //* allowed char  -> at least one digit and 1 letter
  //*               -> 8 to 32 chars
  //*               -> upper/lower case and all digits allowed

  const passPattern = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

  if (typeof password !== 'undefined' && passPattern.test(password)) {
    // console.log('valid  pass');
    return true;
  } else {
    // console.log(user);
    // console.log('invalid  pass');
    return false;
  }
};

export const emailValidation = email => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (typeof email !== 'undefined' && emailPattern.test(email)) {
    // console.log('valid user');
    return true;
  } else {
    // console.log('validation func: invalid email');
    return false;
  }
};

export const digitValidation = input => {
  const digitPattern = /^[0-9]+$/;

  if (typeof input !== 'undefined' && digitPattern.test(input)) {
    // console.log('valid digits', input);
    return true;
  } else {
    // console.log('validation func: invalid digit', input);
    return false;
  }
};

export const registerFormValidation = (input, setErr) => {
  // user name validation
  if (!nameValidation(input.first_name)) {
    setErr('Please enter valid name and password');
    return false;
  }

  if (!nameValidation(input.last_name)) {
    setErr('Please enter valid name and password');
    return false;
  }

  // email validation
  if (!emailValidation(input.email)) {
    setErr('Please enter a valid email address');
    return false;
  }

  // password validation
  if (input.password1 !== input.password2) {
    setErr("Passwords don't match!");
    return;
  }

  if (!passwordValidation(input.password1)) {
    setErr('Please enter valid name and password');
    return false;
  }

  if (!passwordValidation(input.password2)) {
    setErr('Please enter valid name and password');
    return false;
  }

  return true;
};

export const loginFormValidation = (input, setErr) => {
  // password validation
  if (!passwordValidation(input.password)) {
    setErr('Please enter valid email and password');
    return false;
  }

  // email validation
  if (!emailValidation(input.email)) {
    setErr('Please enter a valid email address');
    return false;
  }

  return true;
};
