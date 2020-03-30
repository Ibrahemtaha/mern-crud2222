import React, {useEffect, useState} from "react";
import "./App.css";
import Nav from "./Nav";
import axios from "axios";
import {Link} from "react-router-dom";

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/posts`);
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = async id => {
        let answer = window.confirm("Are you sure you want to delete this post?");
        if (answer) {
            await deletePost(id);
        }
    };

    const deletePost = async id => {
        try {
            const result = await axios
                .delete(`http://localhost:3000/api/post/${id}`);
            fetchPosts().then();
        } catch (error) {
            alert(`Error deleting ${error} post`)
        }

    };

    return (
        <div className="container py-5">
            <Nav/>
            <h1>Mern Stack!!!!</h1>
            <hr/>
            {/* {JSON.stringify(posts)} */}
            {posts.map((post, i) => (
                <div
                    className="row"
                    key={post.post_id}
                    style={{border: "1px solid silver"}}
                >
                    <div className="col pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-10">
                                <Link to={`/post/${post.post_id}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p className="lead">{post.content.substring(0, 100)}</p>
                                <p>
                                    Author{" "}
                                    <span className="badge">
                    {post.user} Published on{" "}
                                        <span className="badge">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </span>
                                </p>
                            </div>
                            <div className="col-md-2">
                                <Link
                                    to={`/post/update/${post.post_id}`}
                                    className="btn btn-sm btn-outline-warning"
                                >
                                    Update
                                </Link>
                                <button
                                    onClick={() => deleteConfirm(post.post_id)}
                                    className="btn btn-sm btn-outline-danger ml-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
