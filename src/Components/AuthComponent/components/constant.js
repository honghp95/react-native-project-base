export const FIELDS = [
  {
    placeholder: 'Name',
    key: 'name',
    messageError: 'signUpScreen.fullName',
    editable: false,
  },
  {
    placeholder: 'Phone Number',
    key: 'phone',
    messageError: 'signUpScreen.pleasePhone',
    editable: false,
    keyboardType: 'number-pad',
  },
  {
    placeholder: 'email@domain.com',
    key: 'email',
    messageError: 'signUpScreen.pleaseEmail',
  },
  {
    placeholder: 'Nickname',
    key: 'nickname',
    messageError: 'signUpScreen.pleaseUsername',
  },
  {
    placeholder: 'Password',
    key: 'password',
    messageError: 'signUpScreen.pleasePassword',
    secureTextEntry: true,
  },
  {
    placeholder: 'Confirm Password',
    key: 'confirmPassword',
    messageError: 'signUpScreen.pleaseConfirmPassword',
    secureTextEntry: true,
  },
]
