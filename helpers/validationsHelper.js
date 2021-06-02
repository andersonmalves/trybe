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
  if (typeof displayName === 'undefined' || displayName.length < EIGHT) {
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
  if (typeof email === 'undefined') {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.EMAIL_IS_REQUIRED,
    });
  }
};

const emailIsEmpty = (email) => {
  if (email === '') {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.EMAIL_IS_EMPTY,
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
  if (typeof password === 'undefined') {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.PASSWORD_IS_REQUIRED,
    });
  }
};

const passwordIsEmpty = (password) => {
  if (password === '') {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.PASSWORD_IS_EMPTY,
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

const issoNonEcziste = (verifyEmail) => {
  if (!verifyEmail) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_FIELDS,
    });
  }
};

const userIdExist = (result) => {
  if (!result) {
    throw new CustomError({
      status: STATUS_CODE.NOT_FOUND,
      message: STATUS_MESSAGE.USER_NOT_EXIST,
    });
  }
};

const categoryNameExist = (name) => {
  if (!name) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.NAME_IS_REQUIRED,
    });
  }
};

const titleExist = (title) => {
  if (!title) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.TITILE_IS_REQUIRED,
    });
  }
};

const contentExist = (content) => {
  if (!content) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.CONTENT_IS_REQUIRED,
    });
  }
};

const categoryExist = (categoryIds) => {
  if (!categoryIds) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.CATEGORY_IS_REQUIRED,
    });
  }
};

const checkIfCategoryAlreadyExist = (categories, categoryIds) => { // Compara o tamanho de retorno do banco e das categorias enviadas.
  if (categories.length !== categoryIds.length) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.CATEGORY_NOT_FOUND,
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
  emailIsEmpty,
  passwordIsEmpty,
  issoNonEcziste,
  userIdExist,
  categoryNameExist,
  titleExist,
  contentExist,
  categoryExist,
  checkIfCategoryAlreadyExist,
};