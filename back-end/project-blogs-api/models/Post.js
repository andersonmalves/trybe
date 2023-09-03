const defineBlogPostsModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return Post;
};

module.exports = defineBlogPostsModel;
