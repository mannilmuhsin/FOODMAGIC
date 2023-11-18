import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import ChefHome from "../pages/Chef/Home/ChefHome";
import ChefProfile from "../pages/Chef/Profile/ChefProfile";
const Role=3000

function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}>
        <Route exact path="/" element={<ChefHome />} />
        <Route path="/profile" element={<ChefProfile/>} />
      </Route>
    </Routes>
  );
}

export default Chef;
