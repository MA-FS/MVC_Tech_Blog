// Require other all Models for blog functionality
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User hasMany Posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Post belongsTo User
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

// Comment belongsTo User
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

// User hasMany Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

// Post hasMany Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { User, Post, Comment };
