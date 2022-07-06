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
  const pages = params.get("page");
  const [q, setq] = useState(search?.trim() || "");
  const [page, setPage] = useState(pages ? Number(pages) : 1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobsdata = useSelector((state) => state.jobs.jobsData.jobs);
  const total = useSelector((state) => state.jobs.jobsData.total);

  const handleClick = (id) => {
    navigate(`/job-details/${id}`);
  };

  const handleChange = debounce((e) => {
    const { value } = e.target;
    setq(value);
    setPage(1);
  }, 1000);

  useEffect(() => {
    let param = {};
    q && (param.q = q);
    page && (param.page = page);
    setParams(param);
    dispatch(fetchJobs(q, page));
    return () => {
      dispatch(fetchJobsDataReset());
    };
  }, [q, page, dispatch, setParams]);

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
        <button
          disabled={page === total}
          className="btn-load"
          onClick={() => {
            if (page < total) {
              setPage(page + 1);
            }
            return;
          }}
        >
          Next
        </button>
        <button
          disabled={page === 1}
          className="btn-load"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
            return;
          }}
        >
          Previous
        </button>
      </section>
    </section>
  );
};
