import { useEffect, useState } from "react";
import { Axios } from "../config/axios";
import { useDispatch } from "react-redux";
import { setPost } from "../store/appSlice";

const FirstThoughts = ({ post, token }) => {
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const dispatch = useDispatch();
  const postComment = async (e) => {
    e.preventDefault();
    if (thought && thought.trim().length > 2) {
      const response = await Axios.patch(
        `posts/${post._id}/comment`,
        { comment: thought.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPost(response.data));
      setThoughts(response.data.comments);
      setThought("");
    }
  };
  useEffect(() => {
    setThoughts(post.comments);
  }, [post]);
  return (
    <div className="md:px-2 w-full md:w-1/2 pb-2">
      <div className="border-4 p-4 gap-2 flex flex-col h-full justify-between">
        <p className="underline">First Thoughts:</p>
        <div className="flex gap-2 flex-wrap">
          {thoughts?.length ? (
            thoughts.map((th, index) => (
              <p className="border-x-2 px-2" key={index}>
                {th}
              </p>
            ))
          ) : (
            <p>Write smth..</p>
          )}
        </div>
        <form>
          <div className="w-full">
            <input
              className="w-full min-h-[8vh] p-2 border-4 dark:bg-black dark:text-white"
              type="text"
              value={thought}
              onChange={(e) => {
                setThought(e.target.value);
              }}
            />
            <button
              type="submit"
              className="border-4 md:w-1/5 float-right mt-2 uppercase p-2"
              onClick={postComment}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstThoughts;
