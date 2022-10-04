import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreatePage = () => {
  const [category, setCategory] = useState("Choose Category");
  const [url, setUrl] = useState();

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
        .post(`/${url}`, {
          ...data,
          url: url,
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
    setCategory(e.target.value);
    setUrl(e.target.id);
  };

  return (
    <React.Fragment>
      <section>
        <div className="blue-background">
          <div className="item-card">
            <h1>{category}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="radio-row">
                <div className="radio-input-wrapper">
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
                  <label htmlFor="Food">Food</label>
                  {errors.category && (
                    <small role="alert">{errors.category.message}</small>
                  )}
                </div>
                <div className="radio-input-wrapper">
                  <input
                    type="radio"
                    name="category"
                    id="misc"
                    value="Miscellaneous"
                    onClick={categoryHandler}
                    data-cy="misc-radio-input"
                    {...register("category")}
                  />
                  <label htmlFor="misc">Miscellaneous</label>
                </div>
              </div>
              <div className="text-row">
                <div className="title-input-wrapper">
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
                <div className="amount-input-wrapper">
                  <span>
                    $
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
                  </span>
                  {errors.amount && (
                    <small role="alert">{errors.amount.message}</small>
                  )}
                </div>
              </div>

              <div className="btn-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="my-btn btn-blue"
                  data-cy="submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreatePage;
