const STATUS_MESSAGE = {
  DISPLAYNAME_IS_INVALID: '"displayName" length must be at least 8 characters long',
  EMAIL_IS_INVALID: '"email" must be a valid email',
  EMAIL_IS_REQUIRED: '"email" is required',
  PASSWORD_IS_INVALID: '"password" length must be 6 characters long',
  PASSWORD_IS_REQUIRED: '"password" is required',
  EMAIL_EXIST: 'User already registered',
  EMAIL_IS_EMPTY: '"email" is not allowed to be empty',
  PASSWORD_IS_EMPTY: '"password" is not allowed to be empty',
  INVALID_FIELDS: 'Invalid fields',
  MISSING_TOKEN: 'Token not found',
  MALFORMED_TOKEN: 'Expired or invalid token',
  USER_NOT_EXIST: 'User does not exist',
};

module.exports = STATUS_MESSAGE;
