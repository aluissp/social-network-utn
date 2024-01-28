import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secretKey, allowedPaths, specialPaths } from '../config/constants.js';

const init = () => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: secretKey,
	};

	passport.use(new JwtStrategy(opts, (decoded, done) => done(null, decoded)));
};

const protectWithJwt = (req, res, next) => {
	if (allowedPaths.includes(req.path)) return next();

	if (req.path.startsWith(specialPaths.profile)) return next();

	if (req.path.startsWith(specialPaths.post)) return next();

	return passport.authenticate('jwt', { session: false })(req, res, next);
};

export default {
	init,
	protectWithJwt,
};
