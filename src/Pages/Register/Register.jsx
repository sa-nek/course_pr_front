import { Axios } from "../../config/axios";
import { useFormik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string(),
});

const Register = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const navigate = useNavigate();
  const movementCheckHandler = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };
  const handleFormSubmit = async (values, formActions) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name || "");
    const userData = await Axios.post("auth/register", formData);
    formActions.resetForm();
    if ((await userData).data) {
      navigate("/login");
    }
  };
  const formikReg = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      location: "",
      occupation: "",
      picture: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div
        onMouseMove={movementCheckHandler}
        className={`grow flex justify-center items-center bg-reg bg-contain bg-fixed`}
        style={{
          backgroundPositionX: 0 - mouseX / 200,
          backgroundPositionY: -200 - mouseY / 200,
          backgroundSize: `${window.innerWidth < 800 ? 400 : 110}%`,
        }}
      >
        <div className="w-full backdrop-blur-sm flex justify-center items-center place-self-stretch p-4 md:p-20">
          <div className="bg-reg bg-cover bg-top place-self-stretch w-full rounded-lg flex">
            <div className="w-full flex-col justify-between p-5 hidden md:flex">
              <h2 className="text-white font-extrabold text-3xl">
                You are welcome!
              </h2>
              <div className="w-full gap-6 flex items-center">
                <span className="text-white">Have an account?</span>
                <Link to="/login" className="text-white underline">
                  Login
                </Link>
              </div>
            </div>
            <form
              autoComplete="off"
              onSubmit={formikReg.handleSubmit}
              className="flex justify-evenly items-center flex-col bg-white bg-opacity-80 w-full rounded-lg md:rounded-l-none py-5"
            >
              <span className="p-2 md:text-lg">Create new user account</span>
              <div className="flex flex-col gap-3 w-full h-full py-3 px-5 lg:px-20 justify-center items-center">
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="First name"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.firstName}
                  name="firstName"
                  onBlur={formikReg.handleBlur}
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Last name"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.lastName}
                  name="lastName"
                  onBlur={formikReg.handleBlur}
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Email"
                  type="email"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.email}
                  name="email"
                  onBlur={formikReg.handleBlur}
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Password"
                  type="password"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.password}
                  onBlur={formikReg.handleBlur}
                  name="password"
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Location"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.location}
                  name="location"
                  onBlur={formikReg.handleBlur}
                />
                <input
                  className="p-1 h-12 w-full border-2"
                  placeholder="Occupation"
                  onChange={formikReg.handleChange}
                  value={formikReg.values.occupation}
                  name="occupation"
                  onBlur={formikReg.handleBlur}
                />
                <Dropzone
                  multiple={false}
                  accept={{
                    "image/jpeg": [],
                    "image/jpg": [],
                    "image/png": [],
                  }}
                  onDrop={(acceptedFiles) =>
                    formikReg.setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-black w-full p-2 flex flex-col items-center justify-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop profile picture here</p>
                      <p>{formikReg.values.picture?.name}</p>
                    </div>
                  )}
                </Dropzone>
                <button
                  type="submit"
                  className="border-2 bg-white w-3/4 uppercase p-2"
                >
                  Register
                </button>
                <Link to="/login" className="underline md:invisible">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <form autoComplete="off" onSubmit={formikReg.handleSubmit}>
    //     <input
    //       placeholder="first name"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.firstName}
    //       name="firstName"
    //       onBlur={formikReg.handleBlur}
    //     />
    //     <input
    //       placeholder="last name"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.lastName}
    //       name="lastName"
    //       onBlur={formikReg.handleBlur}
    //     />
    //     <input
    //       placeholder="email"
    //       type="email"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.email}
    //       name="email"
    //       onBlur={formikReg.handleBlur}
    //     />
    //     <input
    //       placeholder="password"
    //       type="password"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.password}
    //       onBlur={formikReg.handleBlur}
    //       name="password"
    //     />
    //     <input
    //       placeholder="location"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.location}
    //       name="location"
    //       onBlur={formikReg.handleBlur}
    //     />
    //     <input
    //       placeholder="occupation"
    //       onChange={formikReg.handleChange}
    //       value={formikReg.values.occupation}
    //       name="occupation"
    //       onBlur={formikReg.handleBlur}
    //     />
    //     <Dropzone
    //       multiple={false}
    //       accept={{
    //         "image/jpeg": [],
    //         "image/jpg": [],
    //         "image/png": [],
    //       }}
    //       onDrop={(acceptedFiles) =>
    //         formikReg.setFieldValue("picture", acceptedFiles[0])
    //       }
    //     >
    //       {({ getRootProps, getInputProps }) => (
    //         <div {...getRootProps()}>
    //           <input {...getInputProps()} />
    //           <p>Drag 'n' drop some files here, or click to select files</p>
    //           {formikReg.values.picture?.name}
    //         </div>
    //       )}
    //     </Dropzone>
    //     <button type="submit">submit</button>
    //   </form>
    // </div>
  );
};

export default Register;
