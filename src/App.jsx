import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout";
import { useSelector } from "react-redux";
import Error from "./Pages/Error";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PostPage from "./Pages/Post/PostPage";
import { useRef } from "react";

function App() {
  const mode = useSelector((state) => state.mode);
  const currentUser = useSelector((state) => state.user);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const LoggedAlready = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const mainDivRef = useRef(null);
  return (
    <div ref={mainDivRef}>
      <Routes>
        <Route path="/" element={<Layout mainDiv={mainDivRef} />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="post/:postId"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <LoggedAlready>
              <Login />
            </LoggedAlready>
          }
        />
        <Route
          path="/reg"
          element={
            <LoggedAlready>
              <Register />
            </LoggedAlready>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
