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
        .post(`http://localhost:8000/${data.category}`, {
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
    } catch (error) {
      console.log(error);
    }
  };

  const categoryHandler = (e) => {
    setCategory(e.target.id);
  };

  return (
    <React.Fragment>
      <h1>{category}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Type your title here"
            {...register("title", {
              required: "Please type in your title",
            })}
          />
          {errors.title && <small role="alert">{errors.title.message}</small>}
        </label>
        <label htmlFor="amount">
          $
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            {...register("amount", { required: "Please type in your amount" })}
          />
          {errors.amount && <small role="alert">{errors.amount.message}</small>}
        </label>
        <div>
          <label htmlFor="Food">
            {errors.category && (
              <small role="alert">{errors.category.message}</small>
            )}
            <input
              type="radio"
              name="category"
              id="Food"
              value="food"
              onClick={categoryHandler}
              {...register("category", {
                required: "Please choose your category",
              })}
            />
            Food
          </label>
          <label htmlFor="Miscellaneous">
            <input
              type="radio"
              name="category"
              id="Miscellaneous"
              value="misc"
              onClick={categoryHandler}
              {...register("category")}
            />
            Miscellaneous
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          Create
        </button>
      </form>
    </React.Fragment>
  );
};

export default CreatePage;
