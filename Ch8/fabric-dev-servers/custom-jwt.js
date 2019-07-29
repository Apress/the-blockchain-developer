// based on:
// https://github.com/hyperledger/composer/issues/2038

const passportJwt = require('passport-jwt');
const util = require('util');

function CustomJwtStrategy(options, verify) {
  options.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
  passportJwt.Strategy.call(this, options, verify);
}

util.inherits(CustomJwtStrategy, passportJwt.Strategy);

module.exports = {
  Strategy: CustomJwtStrategy
};
