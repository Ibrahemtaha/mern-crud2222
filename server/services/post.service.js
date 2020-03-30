var Post = require("../models/post");

exports.getPosts = async function () {
    const query = {
        limit: 10,
        order: [["createdAt", "DESC"]]
    };

    try {
        return await Post.findAll(query);
    } catch (e) {
        throw Error("Error while getting Posts");
    }
};

exports.createPost = async function (entity) {
    try {
        return await Post.create(entity);
    } catch (error) {
        if (error) {
            throw Error("Error when creating post");
        }
    }
};


exports.readPost = async function (id) {
    try {
        return await Post.findOne({where: {post_id: id}});
    } catch (e) {
        throw Error('Error fetching post with id: ' + id);
    }
};


exports.updatePost = async function (entity, id) {
    try {
       return  await Post.update(
            entity,
            {
                where: {
                    post_id: id
                }
            }
        );
    } catch (err) {
        if (err) {
            throw Error("Error while updating the post");
        }
    }
};

exports.delete = async function (id) {
    try {
        return await Post.destroy({
            where: {
                post_id: id
            }
        });
    } catch (e) {
        throw Error('Error while deleting post with id:' + id);
    }
};