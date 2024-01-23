import bcrypt from 'bcrypt';

export const hashPassword = (plainTextPwd, done) => {
	bcrypt.hash(plainTextPwd, 10, done);
};

export const hashPasswordSync = plainTextPwd => bcrypt.hashSync(plainTextPwd, 10);

export const comparePassword = (plainPassword, hashPassword, done) => {
	bcrypt.compare(plainPassword, hashPassword, done);
};
