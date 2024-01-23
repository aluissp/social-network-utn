import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secretKey } from '../config/constants.js';

const init = () => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: secretKey,
	};

	passport.use(new JwtStrategy(opts, (decoded, done) => done(null, decoded)));
};

const protectWithJwt = (req, res, next) => {
	if (req.path == '/' || req.path == '/auth/login') return next();

	return passport.authenticate('jwt', { session: false })(req, res, next);
};

export default {
	init,
	protectWithJwt,
};
