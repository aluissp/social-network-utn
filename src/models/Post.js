export const Post = (sequelize, DataTypes) => {
	const Post = sequelize.define('posts', {
		urlImage: DataTypes.STRING,
		description: DataTypes.STRING,
		likes: DataTypes.INTEGER,
	});

	return Post;
};
