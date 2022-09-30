import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/undraw_join_re_w1lh.svg";
import featherPen from "../assets/feather_pen.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Form submit requires user inputs to move on to the next page.
  // Upon submission, navigate user to the Table page.
  const beginTraceHandler = (data) => {
    try {
      console.log(data);

      navigate("/table");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <React.Fragment>
      <section className="hidden">
        <img src={landingImg} alt="LandingImg" />
        <h3>Loading up Justin's React Demo..!</h3>
        <footer>
          <span>3 Oct. 2022</span>
          <span>Alzheimer's Therapeutic Research Institute</span>
          <span>Informatics</span>
        </footer>
      </section>

      <section>
        <div className="trace-background">
          <div className="d-flex justify-content-center header_container">
            <div className="trace-logo">
              <img src={featherPen} alt="feather pen" />
            </div>

            <h1>Trace</h1>
          </div>

          <form
            onSubmit={handleSubmit(beginTraceHandler)}
            className="form_container"
          >
            <div className="survey_container">
              <h5>Lets start by choosing you area of interests!</h5>
              <div className="checkbox_container">
                <label htmlFor="checkbox-1">
                  <input
                    type="checkbox"
                    name="checkbox-1"
                    value="Track record of my spendings"
                    id="checkbox-1"
                    {...register("checkbox-1")}
                  />
                  Track record of my spendings
                </label>
                <label htmlFor="checkbox-2">
                  <input
                    type="checkbox"
                    name="checkbox-2"
                    value="Build healthy spending habit"
                    id="checkbox-2"
                    {...register("checkbox-2")}
                  />
                  Build healthy spending habit
                </label>
                <label htmlFor="checkbox-3">
                  <input
                    type="checkbox"
                    name="checkbox-3"
                    value="Control over my finance"
                    id="checkbox-3"
                    {...register("checkbox-3")}
                  />
                  Control over my finance
                </label>
                <label htmlFor="checkbox-4">
                  <input
                    type="checkbox"
                    name="checkbox-4"
                    value="Investing & saving"
                    id="checkbox-4"
                    {...register("checkbox-4")}
                  />
                  Investing & saving
                </label>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Begin Trace!
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LandingPage;
