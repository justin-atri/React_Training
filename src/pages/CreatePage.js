import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [category, setCategory] = useState("Choose Category");

  const navigate = useNavigate();

  const createSubmitHandler = (e) => {
    e.preventDefault();

    let title = e.target.title.value;
    let amount = e.target.amount.value;
    let category = e.target.category.value;

    const createNewItem = {
      title: title,
      amount: amount,
      category: category,
    };

    try {
      axios
        .post(`http://localhost:8000/${category}`, {
          ...createNewItem,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      // Catch error of axios request
      console.log(error);
    }

    navigate("/table");

    console.log(createNewItem);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.id);
  };

  return (
    <React.Fragment>
      <h1>{category}</h1>
      <form onSubmit={createSubmitHandler}>
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" required />
        </label>
        <label htmlFor="amount">
          $
          <input type="number" id="amount" name="amount" step="0.01" required />
        </label>
        <div>
          <label htmlFor="Food">
            <input
              type="radio"
              name="category"
              id="Food"
              value="food"
              onClick={categoryHandler}
              required
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
              required
            />
            Miscellaneous
          </label>
        </div>
        <button>Create</button>
      </form>
    </React.Fragment>
  );
};

export default CreatePage;
