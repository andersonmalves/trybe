const { CustomError } = require('./errorHelper'); // tem que fazer ref ao arquivo diretamente
const STATUS_CODE = require('./statusHelper');
const STATUS_MESSAGE = require('./messageHelper');

/*
  - Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro: User already registered
  - Caso contrário, retornar a mesma resposta do endpoint de /login, um token JWT:
*/

const SIX = 6;
const EIGHT = 8;

const displayNameIsValid = (displayName) => {
  if (displayName.length < EIGHT) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.DISPLAYNAME_IS_INVALID,
    });
  }
};

const emailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.EMAIL_IS_INVALID,
    });
  }
};

const emailExist = (email) => {
  if (!email) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.EMAIL_IS_REQUIRED,
    });
  }
};

const passwordIsValid = (password) => {
  if (password && password.length < SIX) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.PASSWORD_IS_INVALID,
    });
  }
};

const passwordExist = (password) => {
  if (!password || password === null) {
    console.log(typeof password);
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.PASSWORD_IS_REQUIRED,
    });
  }
};

const checkIfEmailExist = (verifyEmail) => {
  if (verifyEmail) {
    throw new CustomError({
      status: STATUS_CODE.CONFLICT,
      message: STATUS_MESSAGE.EMAIL_EXIST,
    });
  }
};

module.exports = {
  displayNameIsValid,
  emailIsValid,
  emailExist,
  passwordIsValid,
  passwordExist,
  checkIfEmailExist,
};