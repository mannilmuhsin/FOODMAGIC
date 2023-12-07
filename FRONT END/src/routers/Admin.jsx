import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdimnProfile from "../pages/Admin/Profile/AdimnProfile";
import Userlist from "../pages/Admin/Uesrlist/Userlist";
import AdminAllCourses from "../pages/Admin/AdminAllCourses/AdminAllCourses";
import ChefList from "../pages/Admin/ChefList/ChefList";
import Payments from "../pages/Admin/Payments/Payments";
const Role=1000

function Admin() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}>
        <Route exact path="/" element={<AdminHome />} />
        <Route path="/profile" element={<AdimnProfile/>} />
        <Route path="/userlist" element={<Userlist/>}/>
        <Route path="/allcourses" element={<AdminAllCourses/>}/>
        <Route path="/cheflist" element={<ChefList/>}/>
        <Route path="/payments" element={<Payments/>} />
      </Route>
    </Routes>
  );
}

export default Admin;
