import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { selectCurrentUser } from "../../context/authReducer";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useAddblogMutation } from "../../api/chefApiSlice";
import toast, { Toaster } from "react-hot-toast";
import AddBlogModal from "../../components/Modal/AddBlogModal";

const BlogForm = () => {
  const [image, setImage] = useState(false);
  const [content, setContent] = useState("");
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const editor = useRef();
  const [addblog] = useAddblogMutation();
  const [openModal, setOpenModal] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEditorOpen = () => {
    setIsEditorOpen(true);
  };

  const handleEditorClose = () => {
    setBlog({ ...blog, content: content });
    setIsEditorOpen(false);
  };

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
    // setContent(editor.current.getContents())
  };

  const setCodeHandle = () => {
    setContent(editor.current.getContents());
    console.log(content);
  };

  const [blog, setBlog] = useState({
    heading: "",
    image: null,
    description: "",
    creator: user,
    content:null
  });
  const handleaddblogSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);

    try {
      //   setOpenlottie(true);
      if (!validateForm()) {
        return;
      }
      const formData = new FormData();
      formData.append("formdata", JSON.stringify(blog));
      formData.append("image", blog.image);

      await addblog(formData).then((response) => {
        if (response.error) {
          console.log(response.error.data.message);
          //   setOpenlottie(false);
          toast.error(response.error.data.message);
        } else {
          toast.success(response.data.message);
          navigate("/blog");
        }
      });

      // Reset the form if needed
      // e.target.reset();
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.log(error.resqust);
        toast.error(error.message);
      } else {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    console.log("hhhhhhhhhhh");
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
  }, []);

  const isImage = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];

    if (selectedImage && isImage(selectedImage)) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setBlog({ ...blog, image: selectedImage });
      setImage(imageUrl);
    } else {
      toast.error("Invalid image type. Please choose an image file.");
      setImage(null);
    }
  };
  const validateForm = () => {
    if (!blog.heading.trim()) {
      toast.error("Please enter a Blog Heading.");
      return false;
    }

    if (!blog.description.trim()) {
      toast.error("Please enter a Blog Description.");
      return false;
    }

    if (!blog.image) {
      toast.error("Please select an image for the Blog.");
      return false;
    }

    return true;
  };
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="flex mt-8 max-w-5xl mx-auto">
        {/* Left side for image display */}
        <div className="flex-shrink-0 flex justify-center items-center w-1/3 p-8 bg-gray-100">
          {image ? (
            <div className="relative rounded overflow-hidden">
              <img
                src={image}
                alt="Selected Image"
                className="w-full h-auto rounded"
              />
              <div
                onClick={() => {
                  setImage(false), setBlog({ ...blog, image: null });
                }}
                className="cursor-pointer absolute text-sm top-0 right-0 bg-transparent hover:bg-white text-gray-700 p-2 rounded-full"
              >
                X
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span className="text-4xl">&#x1F4F7;</span> {/* Camera Emoji */}
              <p className="text-lg mt-4">No image selected</p>
            </div>
          )}
        </div>

        {/* Right side for the form */}
        <div className="bg-white p-8 lg:p-12 rounded-md w-2/3 max-w-2xl shadow-md">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-gray-800">
            Create a Blog
          </h2>
          <form onSubmit={(e) => handleaddblogSubmit(e)} className="space-y-4">
            <div>
              <label
                htmlFor="heading"
                className="mb-2 text-lg block text-gray-700"
              >
                Blog Heading
              </label>
              <input
                type="text"
                id="heading"
                value={blog.heading}
                onChange={(e) => setBlog({ ...blog, heading: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-base focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 text-lg block text-gray-700"
              >
                Blog Description
              </label>
              <textarea
                id="description"
                value={blog.description}
                onChange={(e) =>
                  setBlog({ ...blog, description: e.target.value })
                }
                className="w-full h-24 p-2 border border-gray-300 rounded text-base resize-none focus:outline-none focus:ring focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="image"
                className="mb-2 text-lg block text-gray-700"
              >
                Blog Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded p-2 text-base focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            
            <div className="flex justify-between">
              {" "}
              {/* space-x-4 adds horizontal spacing between buttons */}
              <button
                type="button"
                onClick={handleEditorOpen}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 text-lg focus:outline-none focus:ring focus:border-blue-500"
              >
                Add More Content
              </button>
              <button
                type="submit"
                // onClick={(e)=>handleaddblogSubmit(e)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 text-lg focus:outline-none focus:ring focus:border-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {isEditorOpen && (
          <>
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)",
              }}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-screen-lg">
                <SunEditor
                  getSunEditorInstance={getSunEditorInstance}
                  onChange={setCodeHandle}
                  setContents={content}
                  setOptions={{
                    width: "100%", // Full width
                    minHeight: "300px", // Or any other minimum height you want
                    maxHeight: "70vh", // Set a maximum height to prevent it from expanding too much
                    overflowY: "auto",
                    buttonList: [
                      ["undo", "redo", "font", "fontSize", "formatBlock"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                        "removeFormat",
                      ],
                      [
                        "fontColor",
                        "hiliteColor",
                        "outdent",
                        "indent",
                        "align",
                        "horizontalRule",
                        "list",
                        "table",
                      ],
                      [
                        "link",
                        "image",
                        "video",
                        "fullScreen",
                        "showBlocks",
                        "codeView",
                        "preview",
                        "print",
                        "save",
                      ],
                    ],
                  }}
                />
                <button
                  onClick={handleEditorClose}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 text-lg focus:outline-none focus:ring focus:border-red-500"
                >
                  Close Editor
                </button>
              </div>
            </div>
          </>
        )}
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default BlogForm;
