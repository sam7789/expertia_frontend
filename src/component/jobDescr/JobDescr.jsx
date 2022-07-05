import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./JobDescr.css";
import {
  getJobDetails,
  fetchJobDetailReset,
} from "../../redux/selectedJob/action";
import { Navigate, useParams } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";

export const JobDescr = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const jobDetails = useSelector((state) => state.jobDetails.jobData?.job);
  const [visible, setVisible] = useState(false);
  const [apply, setApply] = useState({});

  useEffect(() => {
    dispatch(getJobDetails(param.id));
    return () => {
      dispatch(fetchJobDetailReset());
    };
  }, [param.id, dispatch]);

  const handleApply = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://expertiaapi.herokuapp.com/api/jobs/${param.id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) =>
          res.json().then((data) => {
            setApply(data);
            setVisible(true);
          })
        )
        .catch((err) => alert(err.message));
    } else {
      alert("Please login to apply");
      Navigate("/login");
    }
  };

  console.log(jobDetails);

  return (
    <section className="job-description">
      <h1 className="job_heading">JOB DETAILS</h1>
      <div className="job-description__container">
        <p className="job_company">{jobDetails?.company.name}</p>
        <h1 className="job_title">{jobDetails?.title}</h1>
        <p className="job_descr">{jobDetails?.description}</p>
        <p className="job_location">{jobDetails?.location}</p>
        <p>{jobDetails?.createdAt.slice(0, 10)}</p>
        <p className="job_salary">
          {jobDetails?.salaryRange.min +
            "LPA" +
            " - " +
            jobDetails?.salaryRange.max +
            "LPA"}
        </p>
        {jobDetails?.techStack?.map((e) => (
          <p className="job_tech">{e.name}</p>
        ))}

        <button onClick={handleApply}>Apply</button>
      </div>
      {visible ? (
        <div
          className={
            apply.message === "Applied" ? "job_appliedtrue" : "job_appliedfalse"
          }
        >
          <span>{apply.message}</span>
          <BsFillPatchCheckFill />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
