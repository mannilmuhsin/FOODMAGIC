import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import Profile from "../pages/User/Profile/Profile";
import MyLearnigs from "../pages/User/MyLearnigs/MyLearnigs";
import CourseFullChapters from "../pages/User/CourseFullChapters/CourseFullChapters";
const Role=2000

function User() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}>
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/mylearnigs" element={<MyLearnigs/>} />
        <Route path="/coursefullvideos" element={<CourseFullChapters/>} />
        
      </Route>
    </Routes>
  );
}

export default User;
