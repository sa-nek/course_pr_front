import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Axios } from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { delPost, setPost } from "../store/appSlice";
import { useEffect, useState } from "react";

const Post = ({ post, hideButton = true, userId, getPosts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const currentUserId = useSelector((state) => state.user._id);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const deletePost = async (id) => {
    await Axios.delete(`posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(delPost(id));
  };
  const likePost = async (id) => {
    const response = await Axios.patch(
      `posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let likes = Object.keys(response.data.likes);
    if (likes.includes(currentUserId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setLikes(likes.length);
    dispatch(setPost(response.data));
  };
  useEffect(() => {
    setLikes(Object.keys(post.likes || {}).length);
    if (Object.keys(post.likes || {}).includes(currentUserId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post]);

  return (
    <div className="md:px-2 pb-4 w-full md:w-1/2">
      <div className="border-4 p-4 gap-2 flex flex-col h-full justify-between">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-full h-16 w-16 sm:h-28 object-cover sm:w-28"
            src={`http://localhost:3001/assets/${
              post?.userPicturePath || "default.png"
            }`}
          />
          <div>
            <p
              className="underline cursor-pointer"
              onClick={() => {
                navigate(`/profile/${post.userId}`);
              }}
            >
              {post.firstName} {post.lastName}
            </p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
        </div>
        {post?.picturePath && (
          <img
            onClick={() => {
              window.open(
                `http://localhost:3001/assets/${post?.picturePath}`,
                "_blank"
              );
            }}
            className="rounded-md object-contain cursor-pointer"
            src={`http://localhost:3001/assets/${post?.picturePath}`}
          />
        )}
        <p className="w-full text-center break-words">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <FaHeart
              className={` ${
                isLiked ? "text-red-800" : "text-gray-500"
              } text-2xl cursor-pointer`}
              onClick={(e) => {
                likePost(post._id);
              }}
            />
            <p className="text-2xl">{likes}</p>
          </div>
          {!hideButton ? (
            <button
              className="p-4 border-2"
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
            >
              Open full post
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="p-4 border-2"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Home
              </button>
              {post.userId === userId && (
                <button
                  className="p-4 border-2"
                  onClick={() => {
                    deletePost(post._id);
                    navigate(`/`);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
