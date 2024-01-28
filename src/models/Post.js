export const Post = (sequelize, DataTypes) => {
	const Post = sequelize.define('posts', {
		title: DataTypes.STRING,
		imageUrl: DataTypes.STRING,
		description: DataTypes.STRING,
		likes: DataTypes.INTEGER,
	});

	return Post;
};
