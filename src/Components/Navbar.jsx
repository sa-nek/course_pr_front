import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../store/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaHouseUser, FaAdjust } from "react-icons/fa";
import { useEffect } from "react";

const Navbar = ({ mainDiv }) => {
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    mainDiv.current.classList = mode;
  }, [mode]);
  return (
    <div className="flex w-full justify-between min-h-[5vh] items-center py-2 px-4 bg-gradient-to-b from-neutral-300 to-neutral-50 dark:from-black dark:to-black sticky top-0">
      <Link to="/" className="text-xl font-semibold dark:text-white">
        SOCIAL
      </Link>
      <div className="flex justify-center items-center gap-4">
        <FaAdjust
          className="text-3xl z-10 dark:rotate-180 text-gray-900 dark:text-white px-1 cursor-pointer bg-neutral-300 md:bg-opacity-0 bg-opacity-60 rounded-sm md:w-auto md:h-auto h-20 w-12 fixed md:static top-40 right-4"
          onClick={() => {
            dispatch(setMode());
          }}
        />
        <FaHouseUser
          className="text-3xl z-10 text-gray-900 px-1 dark:text-white cursor-pointer bg-neutral-300 md:bg-opacity-0 bg-opacity-60 rounded-sm md:w-auto md:h-auto h-20 w-12 fixed md:static top-64 right-4"
          onClick={() => {
            navigate(`/profile/me`);
          }}
        />
        <div className="flex justify-end items-center gap-2">
          <img
            src={`https://course-pr-api.onrender.com/assets/${
              user?.picturePath || "default.png"
            }`}
            className="h-14 w-14 object-cover rounded-full hidden sm:block"
          />
          <p className="hidden sm:block dark:text-white">
            {user ? `${user.firstName} ${user.lastName}` : "none"}
          </p>
          <button
            className="border-2 p-2 rounded-xl bg-white shadow-lg dark:text-black"
            onClick={() => dispatch(setLogout())}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
