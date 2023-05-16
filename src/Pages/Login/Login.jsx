import { useFormik } from "formik";
import * as yup from "yup";
import { Axios } from "../../config/axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const navigate = useNavigate();
  const movementCheckHandler = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };
  const dispatch = useDispatch();
  const handleFormSubmit = async (values, formActions) => {
    const userData = await Axios.post("auth/login", JSON.stringify(values), {
      headers: { "Content-Type": "application/json" },
    });
    formActions.resetForm();
    if (userData?.data) {
      dispatch(
        setLogin({ user: userData.data.user, token: userData.data.token })
      );
      navigate("/");
    }
  };
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div
        onMouseMove={movementCheckHandler}
        className={`grow flex justify-center items-center bg-login bg-contain bg-fixed`}
        style={{
          backgroundPositionX: 0 - mouseX / 200,
          backgroundPositionY: -200 - mouseY / 200,
          backgroundSize: `${window.innerWidth < 800 ? 400 : 110}%`,
        }}
      >
        <div className="w-full backdrop-blur-sm flex justify-center items-center md:place-self-stretch p-2 md:p-20">
          <div className="bg-login md:bg-cover bg-bottom place-self-stretch w-full rounded-lg flex">
            <div className="w-full flex-col justify-between p-5 hidden md:flex">
              <h2 className="text-stone-100 bg-slate-500 p-1 rounded-lg w-fit bg-opacity-50 stroke-1 font-extrabold text-3xl">
                You are welcome!
              </h2>
              <div className="w-full gap-6 flex items-center">
                <span className="text-white">Don`t have an account?</span>
                <Link to="/reg" className="text-white underline">
                  Register
                </Link>
              </div>
            </div>
            <form
              autoComplete="off"
              onSubmit={formikLogin.handleSubmit}
              className="flex justify-evenly items-center flex-col bg-white bg-opacity-50 w-full rounded-lg md:rounded-l-none py-5"
            >
              <span className="p-2 text-sm md:text-lg">
                Log in to your account
              </span>
              <div className="flex flex-col gap-3 w-full h-full py-3 px-5 lg:px-20 justify-center items-center">
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Email"
                  type="email"
                  onChange={formikLogin.handleChange}
                  value={formikLogin.values.email}
                  name="email"
                  onBlur={formikLogin.handleBlur}
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Password"
                  type="password"
                  onChange={formikLogin.handleChange}
                  value={formikLogin.values.password}
                  onBlur={formikLogin.handleBlur}
                  name="password"
                />
                <button
                  type="submit"
                  className="border-2 bg-white w-3/4 uppercase"
                >
                  Login
                </button>
              </div>
              <Link to="/reg" className="md:invisible underline">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
