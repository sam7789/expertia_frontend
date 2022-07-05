import "./AddJob.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

export const AddJob = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="addjob">
      <div className="addjob_container">
        <h1 className="addjob_title">Add a new Job</h1>
        <form className="addjob_form">
          <div className="addjob_form_section">
            <label className="addjob_label" htmlFor="song-name">
              Song Name
            </label>
            <input
              className="addjob_input"
              type="text"
              id="name"
              placeholder="Enter song name"
              required
            />
          </div>

          <div className="addjob_form_bottom_section">
            <div className="addjob_form_buttons_section">
              <input
                type="button"
                value="Cancel"
                className="addjob_form_cancelbtn"
                onClick={() => navigate("/")}
              />
              <input type="submit" className="addjob_form_submitbtn" />
            </div>
            <p
              className="addjob_form_add_artist"
              onClick={() => {
                setIsVisible(true);
              }}
            >
              + Add Artist
            </p>
          </div>
        </form>
      </div>
      <div className={isVisible ? "techstack" : "techstack display-none"}>
        <div className="techstack_innerdiv">
          <div className="techstack_container">
            <div className="techstack_topdiv">
              <h1 className="techstack_title">Add a new Tech-Stack</h1>
              <GrClose
                className="techstack_closebtn"
                onClick={() => {
                  setIsVisible(false);
                }}
              />
            </div>
            <form className="techstack_form">
              <div className="techstack_form_section">
                <label className="techstack_label" htmlFor="artist-name">
                  Name
                </label>
                <input
                  className="techstack_input"
                  type="text"
                  id="name"
                  placeholder="Name of Tech Stack"
                  required
                />
              </div>
              <div className="techstack_form_section">
                <label className="techstack_label" htmlFor="artist-Bio">
                  Description
                </label>
                <textarea
                  className="techstack_input"
                  type="text"
                  id="bio"
                  placeholder="Enter a short description"
                  required
                />
              </div>
              <div className="techstack_bottomdiv">
                <input
                  type="button"
                  value="Cancel"
                  className="techstack_cancelbtn"
                />
                <input type="submit" className="techstack_submitbtn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
