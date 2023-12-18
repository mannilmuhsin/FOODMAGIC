import Home from "./pages/Home/Home";
import GoogleAuthComponent from "./pages/Login/Auth";
import Login from "./pages/Login/Login";
import OTP from "./pages/OTP/OTP";
import Signup from "./pages/Signup/Signup";
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Layouts from "./features/Layouts";
import Unotherised from "./pages/Unotherised/Unotherised";
import Chef from "./routers/Chef";
import Admin from "./routers/admin";
import User from "./routers/user";
import "./index.css";
import RequerRout from "./features/RequerRout";
import RequerHome from "./features/RequerHome";
import AllCourses from "./pages/User/AllCourses/AllCourses";
import CourseDetails from "./pages/User/CourseDetails/CourseDetails";
import CommunityChat from "./pages/CommunityChat/CommunityChat";
import Chat from "./components/Chat/Chat";
import NewChat from "./components/Chat/NewChat";
import ErrorBoundary from "./features/ErrorBoundary ";
import Blogs from "./pages/Blogs/Blogs";
import BlogForm from "./pages/AddBlog/AddBlog";

function App() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layouts />}>
          <Route path="/user/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/chef/*" element={<Chef />} />
          {/* <Route element={<RequerRout />}> */}
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} replace />
          <Route path="/blog" element={<Blogs/>} />
          <Route path="/addblog" element={<BlogForm/>} />
          <Route
            path="/chat"
            element={
              <ErrorBoundary>
                <Chat />
              </ErrorBoundary>
            }
          />
          {/* </Route> */}
          {/* <Route element={<RequerHome/>}> */}
          <Route exact path="/" element={<Home />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
          {/* </Route> */}
          <Route exact path="/uno" element={<Unotherised />} />
          <Route exact path="/*" element={<Unotherised />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
