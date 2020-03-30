import React, {useEffect, useState} from "react";
import axios from "axios";
import Nav from "./Nav";

const SinglePost = props => {
    const [post, setPost] = useState("");

    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/post/${props.match.params.id}`
            );
            setPost(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPost().then();
    }, []);

    // return <div>{JSON.stringify(props)}</div>;

    return (
        <div className="container py-5">
            <Nav/>
            <h1>Mern Stack!!!!</h1>
            <hr/>
            {/* <h1>{JSON.stringify(post)}</h1> */}
            <h1>{post.title}</h1>
            <p className="lead">{post.content}</p>
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
    );
};
export default SinglePost;
