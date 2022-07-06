import { Home } from "../component/home/Home";
import { Route, Routes } from "react-router-dom";
import { Login } from "../component/login/Login";
import { Signup } from "../component/register/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { PrivateRoute } from "./PrivateRoute";
import { userToken } from "../redux/userData/action";
import { fetchJobs } from "../redux/jobData/action";
import { AddJob } from "../component/addjobs/AddJob";
import { JobDescr } from "../component/jobDescr/JobDescr";

export const AllRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userToken());
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job-details/:id" element={<JobDescr />} />
      </Routes>
    </>
  );
};
