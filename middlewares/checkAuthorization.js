const UNAUTHORIZED = 401;

function checkToken(request, response, next) {
  const token = request.headers.authorization;
  try {
    if (!token) { throw new Error('Token não encontrado'); }
    if (token.length < 16) { throw new Error('Token inválido'); }
    next();
  } catch (error) {
    response.status(UNAUTHORIZED).json({ message: error.message });
  }
}

module.exports = checkToken;