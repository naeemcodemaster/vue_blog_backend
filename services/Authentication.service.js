const httpStatus = require("http-status");
const { UserModel, BlogPostModel, ContactModel } = require("../models");
const ApiError = require("../utils/ApiError");
const GenerateToken = require("../utils/jwt.utils");
const cloudnary = require("../utils/cloudnary");

const uploadOnCloudnary = async (path) => {
  const result = await cloudnary.uploader.upload(path, {
    folder: "blogs",
  });
  return result;
};

// Register User Service
const register = async (body) => {
  const { name, email, password } = body;

  const existUser = await UserModel.findOne({ email: email });

  if (existUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const user = await UserModel.create({
    name: name,
    email: email,
    password: password,
  });

  // return user;
  return { msg: "User register successfully" };
};

// Login User Service
const login = async (body) => {
  const { email, password } = body;

  const existUser = await UserModel.findOne({ email: email });
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Exist");
  }

  const isMatch = await existUser.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Crendentials");
  }

  // return existUser;
  const token = await GenerateToken(existUser);
  return { msg: "Login Success", token };
};

// User Profile Service
const UserProfile = async (id) => {
  return await UserModel.findById(id).select("-password");
};

// Create single Post
const createPost = async (user, body, file) => {
  const { title, content, description } = body;
  const existTitle = await BlogPostModel.findOne({ title });
  if (existTitle) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Title already exist,Try Another Name"
    );
  }
  const newTitle = title.split(" ").join("-");
  const result = await uploadOnCloudnary(file.path);
  const model = await BlogPostModel.create({
    title: title,
    slug: newTitle,
    content: content,
    description: description,
    image: {
      image_url: result.secure_url,
      cloudnary_id: result.public_id,
    },
    user: user,
  });

  return {
    msg: "Post added successfully",
  };
};

// Get All Post
const AllPosts = async () => {
  const posts = await BlogPostModel.find({}).select("-content");
  // const posts = await BlogPostModel.find({ id, isDeleted: false }).populate("user", "name email");

  return { posts, total: posts.length };
};

// View Single Post
const SinglePost = async (id) => {
  // const post = await BlogPostModel.findById(id);
  const post = await BlogPostModel.findById({
    _id: id,
    isDeleted: false,
  }).populate("user", "name email");
  return { post, image: post.image.image_url };
};

// delete Post
const DeletePost = async (id) => {
  // const post = await BlogPostModel.findById(id);
  const post = await BlogPostModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return { msg: "Post Deleted" };
};

const Contact = async (body) => {
  const { name, email, message } = body;

  const model = await ContactModel.create({
    name: name,
    email: email,
    message: message,
  });

  return {
    msg: "Thank You for contacting :) ",
  };
};

module.exports = {
  register,
  login,
  UserProfile,
  createPost,
  AllPosts,
  SinglePost,
  DeletePost,
  Contact,
};
