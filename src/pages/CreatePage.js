import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreatePage = () => {
  const [category, setCategory] = useState("Choose Category");

  const navigate = useNavigate();

  // Use react-hook-form to create new table item
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    // DEV PURPOSE: Check disabled submit button while processing data submission
    // await new Promise((r) => setTimeout(r, 1000));

    try {
      axios
        .post(`/${data.category}`, {
          ...data,
        })
        .then((res) => {
          console.log(res);
          navigate("/table");
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
          throw err;
        });
    } catch (err) {
      alert(err);
    }
  };

  const categoryHandler = (e) => {
    setCategory(e.target.id);
  };

  return (
    <React.Fragment>
      <section>
        <div className="blue-background">
          <div className="create-card">
            <h1>{category}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="title">
                <div className="error-style">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter your title here"
                    data-cy="title-input"
                    {...register("title", {
                      required: "Please type in your title",
                    })}
                  />
                  {errors.title && (
                    <small role="alert">{errors.title.message}</small>
                  )}
                </div>
              </label>
              <label htmlFor="amount">
                <div className="dollar-sign">$</div>
                <div className="error-style">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.01"
                    placeholder="0.00"
                    data-cy="amount-input"
                    {...register("amount", {
                      required: "Please type in your amount",
                    })}
                  />
                  {errors.amount && (
                    <small role="alert">{errors.amount.message}</small>
                  )}
                </div>
              </label>
              <div className="radio-container">
                <label htmlFor="Food" className="radio-btn">
                  <div className="error-style">
                    <input
                      type="radio"
                      name="category"
                      id="Food"
                      value="food"
                      onClick={categoryHandler}
                      data-cy="food-radio-input"
                      {...register("category", {
                        required: "Please choose your category",
                      })}
                    />
                    <span>Food</span>
                    {errors.category && (
                      <small role="alert">{errors.category.message}</small>
                    )}
                  </div>
                </label>
                <label htmlFor="Miscellaneous" className="radio-btn">
                  <input
                    type="radio"
                    name="category"
                    id="Miscellaneous"
                    value="misc"
                    onClick={categoryHandler}
                    data-cy="misc-radio-input"
                    {...register("category")}
                  />
                  <span>Miscellaneous</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                data-cy="submit-btn"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreatePage;
