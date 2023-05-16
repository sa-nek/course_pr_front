import { useSelector } from "react-redux";
import { Axios } from "../config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    const response = await Axios.get(`/users/${user._id}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFriends(response.data);
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div className="border-4 h-full w-full flex flex-col items-start justify-center p-4 gap-2">
      <p className="underline">Friends:</p>
      {friends.length ? (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-start gap-2"
          >
            <img
              className="rounded-full h-14 object-cover w-14"
              src={`http://localhost:3001/assets/${
                friend.picturePath || "default.png"
              }`}
            />
            <p
              className="cursor-pointer underline"
              onClick={() => {
                navigate(`/profile/${friend._id}`);
              }}
            >
              {friend.firstName} {friend.lastName}
            </p>
          </div>
        ))
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
};

export default Friends;
