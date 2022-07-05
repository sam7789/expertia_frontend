import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchJobs, fetchJobsDataReset } from "../../redux/jobData/action";
import { debounce } from "lodash";
export const Home = () => {
  const [params, setParams] = useSearchParams();
  const search = params.get("q");
  const [q, setq] = useState(search?.trim() || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobsdata = useSelector((state) => state.jobs.jobsData.jobs);

  const handleClick = (id) => {
    navigate(`/job-details/${id}`);
  };

  const handleChange = debounce((e) => {
    const { value } = e.target;
    setq(value);
  }, 1000);

  useEffect(() => {
    let param = {};
    q && (param.q = q);
    setParams(param);
    dispatch(fetchJobs(q));
    return () => {
      dispatch(fetchJobsDataReset());
    };
  }, [q, dispatch, setParams]);

  return (
    <section>
      <section className="jobs">
        <div className="home__container">
          <div className="topjobs_container">
            <div className="table-top">
              <h2 className="table-top__title">All Jobs</h2>
              <input
                type="text"
                className="searchjobs"
                placeholder="Search jobs"
                onChange={handleChange}
              />
            </div>
            <table className="topjobs_table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Tech Stack</th>
                  <th>Location</th>
                  <th>Salary Range</th>
                </tr>
              </thead>
              <tbody>
                {jobsdata?.map((job) => (
                  <tr key={job._id} onClick={() => handleClick(job._id)}>
                    <td>{job.company.name}</td>
                    <td>{job.title}</td>
                    <td>{job.techStack?.map((e) => e.name + ", ")}</td>
                    <td>{job.location}</td>
                    <td>
                      {job.salaryRange.min +
                        "LPA" +
                        " - " +
                        job.salaryRange.max +
                        "LPA"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};
