import { useParams } from "react-router-dom";
import Posts from "../../Components/Posts";
import Profile from "../../Components/Profile";

const ProfilePage = () => {
  const { userId } = useParams();
  return (
    <div className="flex w-full gap-2 p-4 flex-col md:flex-row">
      <div className="flex flex-col md:w-1/5 h-full">
        <Profile />
      </div>
      <div className="md:w-4/5">
        <Posts userId={userId} />
      </div>
    </div>
  );
};

export default ProfilePage;
