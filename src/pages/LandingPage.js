import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import featherPen from "../assets/feather_pen.svg";
import { Carousel, CarouselItem } from "reactstrap";

const LandingPage = ({ setUserName }) => {
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
      console.log(data.username);

      // set global user name
      setUserName(data.username);

      navigate("/table");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // CAROUSEL
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      id: 1,
      content: (
        <>
          <h5>Hi there! What is your name?</h5>
          <div className="name-input-wrapper">
            <input
              type="text"
              name="username"
              id="username"
              {...register("username")}
            />
          </div>
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
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
        </>
      ),
    },
  ];
  const slides = items.map((item) => {
    return (
      <CarouselItem className="custom-tag" tag="div" key={item.id}>
        {item.content}
      </CarouselItem>
    );
  });
  const previous = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const next = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  return (
    <React.Fragment>
      <section>
        <div className="trace-background">
          <div className="d-flex justify-content-center header_container">
            <div className="trace-logo">
              <img src={featherPen} alt="feather pen" />
            </div>

            <h1>Trace</h1>
          </div>

          <div className="feathers-container">
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
            <img src={featherPen} alt="feather pen" />
          </div>

          <form
            onSubmit={handleSubmit(beginTraceHandler)}
            className="form_container"
          >
            <div className="survey_container">
              {/* CAROUSEL */}
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={false}
                className="carousel"
              >
                {slides}
                {activeIndex === 0 && (
                  <div className="next-btn-wrapper">
                    <button type="button" onClick={next}>
                      Next &nbsp; &rarr;
                    </button>
                  </div>
                )}
              </Carousel>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || activeIndex === 0}
              className="start-button"
              data-cy="begin-trace"
            >
              Begin Trace!
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LandingPage;
