import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import Profile from "../pages/User/Profile/Profile";
const Role=2000

function User() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}>
        <Route exact path="/profile" element={<Profile />} />
        
      </Route>
    </Routes>
  );
}

export default User;
