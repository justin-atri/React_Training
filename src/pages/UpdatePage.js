import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdatePage = () => {
  // deconstruct useParams
  const { itemId, categoryURL } = useParams();

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
        const response = await axios.get(`/${categoryURL}/${itemId}`);
        const item = response.data;

        setLoadedItem(response.data);

        console.log(item);
      } catch (error) {}
    };

    fetchData();
  }, [itemId, categoryURL]);

  const updateHandler = (data) => {
    try {
      axios
        .patch(`/${categoryURL}/${itemId}`, {
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
      .delete(`/${categoryURL}/${itemId}`)
      .then(() => {
        navigate("/table");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <React.Fragment>
      <div className="blue-background">
        <div className="item-card">
          {loadedItem && (
            <>
              <h1>{loadedItem.category}</h1>
              <form onSubmit={handleSubmit(updateHandler)}>
                <div className="text-row">
                  <div className="title-input-wrapper">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={loadedItem.title}
                      placeholder="Enter your title here"
                      data-cy="title-input"
                      {...register("title", {
                        required: "Please update your title",
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
                        defaultValue={loadedItem.amount}
                        placeholder="0.00"
                        data-cy="amount-input"
                        {...register("amount", {
                          required: "Please update your amount",
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
                    className="my-btn btn-yellow"
                    data-cy="update-btn"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={deleteHandler}
                    className="my-btn btn-red"
                    data-cy="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdatePage;
