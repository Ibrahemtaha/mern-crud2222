var PostService = require("../services/post.service");

const controllers = {};

var sequelize = require("../models/db");
var Post = require("../models/post");

sequelize.sync();

exports.create = async function (req, res) {
    const {title, user, content} = req.body;
    if (!title || !user || !content) {
        return res.status(400).json({
            error: "title and user and content is requred"
        });
    }
    try {
        var post = await PostService.createPost({title, user, content});
        return res.status(200).json({
            status: 201,
            data: post,
            message: "SuccessFully post created"
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.list = async function (req, res, next) {
    // 201 -- when new object created
    // 404 --- not found
    // 200 --- it's ok
    // 404 -- something bad hapened
    // 500 -- some exceptions happens
    try {
        const posts = await PostService.getPosts();
        return res.status(200).json({
            status: 200,
            data: posts,
            message: "SuccessFully user Retrived"
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};


exports.read = async function (req, res, next) {
    const {id} = req.params;
    try {
        const post = await PostService.readPost(id);
        return res.status(200).json({
            status: 200,
            data: post,
            message: "Successfully retrieved singe post"
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.update = async function (req, res, next) {
    const {id} = req.params;
    const {title, user, content} = req.body;
    console.log(title, user, content);
    try {
        const result = await PostService.updatePost({title, user, content}, id);
        return res.status(200).json({
            status: 200,
            data: result,
            message: `Successfully updated with id ${id}`
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.remove = async function (req, res, next) {
    const {id} = req.params;
    try {
        const post = await PostService.delete(id);
        return res.status(200).json({
            status: 200,
            data: post,
            message: `Successfully deleted with id ${id}`
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};
