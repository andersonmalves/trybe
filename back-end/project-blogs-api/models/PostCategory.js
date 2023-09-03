const definePostsCategoriesModel = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostsCategories', {
      categoryId: { type: DataTypes.INTEGER },
      postId: { type: DataTypes.INTEGER },
    },
    { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postCategory;
};

module.exports = definePostsCategoriesModel;