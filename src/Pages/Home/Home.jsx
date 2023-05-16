import CreatePost from "../../Components/CreatePost";
import Friends from "../../Components/Friends";
import Posts from "../../Components/Posts";
import Profile from "../../Components/Profile";

const Home = () => {
  return (
    <div className="flex w-full gap-2 p-4 flex-col md:flex-row">
      <div className="flex flex-col w-full md:w-1/5 h-full gap-2">
        <Profile isMe={true} />
        <Friends />
      </div>
      <div className="w-full md:w-4/5 flex flex-col">
        <CreatePost />
        <Posts userId={null} />
      </div>
    </div>
  );
};

export default Home;
