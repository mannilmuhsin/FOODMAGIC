import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import ChefHome from "../pages/Chef/Home/ChefHome";
import ChefProfile from "../pages/Chef/Profile/ChefProfile";
import Addcourses from "../pages/Chef/Addcourses/Addcourses";
import Mycoureses from "../pages/Chef/Mycourses/Mycoureses";
import ChefVideos from "../pages/Chef/ChefVideos/ChefVideos";
import VideoDetailes from "../pages/VideoDetailes/VideoDetailes";
import AddChapter from "../pages/Chef/AddChapter/AddChapter";
import ChefPayments from "../pages/Chef/ChefPayments/ChefPayments";
const Role = 3000;

function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}>
        <Route exact path="/" element={<ChefHome />} />
        <Route path="/profile" element={<ChefProfile />} />
        <Route path="/addchapter" element={<AddChapter />} />
        <Route path="/addcourse" element={<Addcourses />} />
        <Route path="/mycourses" element={<Mycoureses />} />
        <Route path="/videos" element={<ChefVideos />} />
        <Route path="/videodetailes" element={<VideoDetailes />} />
        <Route path="/payments" element={<ChefPayments />} />
      </Route>
    </Routes>
  );
}

export default Chef;
