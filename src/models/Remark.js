export const Remark = (sequelize, DataTypes) => {
	const Remark = sequelize.define('remarks', {
		content: DataTypes.STRING,
	});

	return Remark;
};
