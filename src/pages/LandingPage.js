import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import landingImg from "../assets/undraw_join_re_w1lh.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  // Form submit requires user inputs to move on to the next page.
  // Upon submission, navigate user to the Table page.
  const formSubmitHandler = (e) => {
    e.preventDefault();

    let entity = e.target.entity.value;

    const surveyData = {
      entity: entity,
    };

    console.log(surveyData);

    navigate("/table");
  };

  return (
    <React.Fragment>
      <section>
        <h3>Welcome to Justin's ATRI React Demo!</h3>
        <h1>$crooge</h1>
        <img src={landingImg} alt="LandingImg" />
      </section>
      <section>
        <form onSubmit={formSubmitHandler}>
          <h3>Choose your entity</h3>
          <label htmlFor="personal">
            <input
              type="radio"
              name="entity"
              value="Personal"
              id="personal"
              required
            />
            Personal
          </label>
          <label htmlFor="business">
            <input
              type="radio"
              name="entity"
              value="Business"
              id="business"
              required
            />
            Business
          </label>
          <Button color="primary">Click to Start</Button>
        </form>
      </section>
    </React.Fragment>
  );
};

export default LandingPage;
