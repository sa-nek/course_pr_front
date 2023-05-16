import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/appSlice";
import { Axios } from "../config/axios";
import { useEffect } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

const Posts = ({ userId }) => {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const getPosts = async () => {
    if (userId) {
      if (userId === "me") {
        userId = user._id;
      }
      const userPosts = await Axios.get(`/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setPosts(userPosts.data.reverse()));
    } else {
      const allPosts = await Axios.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setPosts(allPosts.data.reverse()));
    }
  };
  useEffect(() => {
    getPosts();
  }, [userId]);
  return (
    <div className="flex flex-row flex-wrap md:px-2">
      {posts.map((post) => (
        <Post key={post._id} post={post} hideButton={false} />
      ))}
    </div>
  );
};

export default Posts;
