import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { setFriends } from "../store/appSlice";

const Profile = ({ isMe }) => {
  const dispatch = useDispatch();
  const [userFriends, setUserFriends] = useState([]);
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState({});
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const getProfile = async () => {
    if (userId === user._id || userId === "me" || isMe) {
      setCurrentUser(user);
    } else {
      const userProfile = await Axios.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(userProfile.data);
    }
  };
  const addOrDeleteFriend = async (id) => {
    const response = await Axios.patch(
      "/users/friend",
      { friendId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUserFriends(response.data);
    dispatch(setFriends({ friends: response.data }));
  };
  useEffect(() => {
    getProfile();
  }, [isMe, userId]);
  useEffect(() => {
    setUserFriends(user.friends);
  }, [userFriends]);
  return (
    <div className="border-4 h-full w-full flex flex-col items-center justify-center p-4 gap-2">
      <p
        className="underline cursor-pointer"
        onClick={() => {
          navigate(`/profile/${currentUser._id}`);
        }}
      >
        {currentUser.firstName} {currentUser.lastName}
      </p>
      <img
        className="rounded-full h-28 object-cover w-28"
        src={`http://localhost:3001/assets/${
          currentUser?.picturePath || "default.png"
        }`}
      />
      <div className="p-2">
        {userId === user._id || userId === "me" || isMe ? (
          "Your profile"
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              addOrDeleteFriend(currentUser._id);
            }}
          >
            {userFriends.includes(currentUser._id) ? (
              <FaUserMinus className="text-3xl" />
            ) : (
              <FaUserPlus className="text-3xl" />
            )}
          </div>
        )}
      </div>
      <p className="w-full underline">Location: </p>
      <p>{currentUser.location}</p>
      <p className="w-full underline">Occupation: </p>
      <p>{currentUser.occupation}</p>
      <p className="w-full underline">With us since: </p>
      <p>{new Date(currentUser.createdAt).toDateString()}</p>
      <p className="w-full underline">Views: </p>
      <p>{currentUser.viewedProfile}</p>
    </div>
  );
};

export default Profile;
