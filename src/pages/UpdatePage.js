import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdatePage = () => {
  // deconstruct useParams
  const { itemId, category } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [loadedItem, setLoadedItem] = useState();

  // Load original item info as placeholder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${category}/${itemId}`);
        const item = response.data;

        setLoadedItem(item);

        console.log(item);
      } catch (error) {}
    };

    fetchData();
  }, [itemId, category]);

  const updateHandler = (data) => {
    try {
      axios
        .patch(`/${category}/${itemId}`, {
          ...data,
        })
        .then((res) => {
          console.log(res);
          navigate("/table");
        })
        .catch((err) => {
          alert(err.message);
          throw err;
        });
    } catch (err) {}
  };

  const deleteHandler = () => {
    axios
      .delete(`/${category}/${itemId}`)
      .then(() => {
        navigate("/table");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <React.Fragment>
      {loadedItem && (
        <>
          <form onSubmit={handleSubmit(updateHandler)}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={loadedItem.title}
                {...register("title", {
                  required: "Please update your title",
                })}
              />
              {errors.title && (
                <small role="alert">{errors.title.message}</small>
              )}
            </label>
            <label htmlFor="amount">
              $
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                defaultValue={loadedItem.amount}
                {...register("amount", {
                  required: "Please update your amount",
                })}
              />
              {errors.amount && (
                <small role="alert">{errors.amount.message}</small>
              )}
            </label>

            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </form>

          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </React.Fragment>
  );
};

export default UpdatePage;
