import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Axios } from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/appSlice";
const postSchema = yup.object().shape({
  description: yup.string().required("required"),
  picture: yup.string(),
});

const CreatePost = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const handleAddPost = async (values, formActions) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name || "");
    const posts = await Axios.post("/posts", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts(posts.data.reverse()));
    formActions.resetForm();
  };
  const formikPost = useFormik({
    initialValues: {
      description: "",
      picture: "",
    },
    validationSchema: postSchema,
    onSubmit: handleAddPost,
  });
  return (
    <div className="md:px-4 pb-2 w-full">
      <form autoComplete="off" onSubmit={formikPost.handleSubmit}>
        <input
          className="dark:bg-black dark:text-white w-full min-h-[8vh] p-2 border-4 border-b-2"
          placeholder="Write short sentence about your photo..."
          onChange={formikPost.handleChange}
          value={formikPost.values.description}
          name="description"
          onBlur={formikPost.handleBlur}
        />
        <Dropzone
          multiple={false}
          accept={{
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
          }}
          onDrop={(acceptedFiles) =>
            formikPost.setFieldValue("picture", acceptedFiles[0])
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="cursor-pointer p-1 h-20 flex flex-col items-center justify-center border-4"
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop picture here, or click to select files</p>
              <p>{formikPost.values.picture?.name}</p>
            </div>
          )}
        </Dropzone>
        <button
          type="submit"
          className="border-4 w-1/5 float-right mt-2 uppercase p-2"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
