import { useParams } from "react-router-dom";
import { Axios } from "../../config/axios";
import Post from "../../Components/Post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirstThoughts from "../../Components/FirstThoughts";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const getPostById = async () => {
    const post = await Axios.get(`posts/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPost(post.data);
  };
  useEffect(() => {
    getPostById();
  }, []);
  return (
    <div className="mt-2 px-2 flex flex-col items-center justify-center">
      <Post post={post} hideButton={true} userId={userId} />
      <FirstThoughts post={post} token={token} />
    </div>
  );
};

export default PostPage;
