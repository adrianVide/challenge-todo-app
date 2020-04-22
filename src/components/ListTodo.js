import React from "react";
import ApiService from "../lib/service.js";
import axios from "axios";
import { useState, useEffect } from "react";

export const ListTodo = () => {
  const [data, setData] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //   const [done, setdone] = useState(false)

  useEffect(() => {
    ApiService.get_todos().then((apiResponse) => {
      //   console.log(apiResponse);
      console.log(apiResponse.data);
      if (apiResponse.data.length) {
        setData(apiResponse.data);
      }
    });
  }, [updateState]);

  const delete_todo = (id) => {
    ApiService.delete_todo(id).then((responseFromAPI) => {
      // console.log(responseFromAPI)

      setUpdateState(!updateState);
    });
  };

  async function handleFormSubmit(event) {

    event.preventDefault();
    
    try {
      await axios.post("http://localhost:4000/api/v1/todos", { title, body });
      // await (ApiService.new_todo(), { title, body });
      setTitle("");
      setBody("");
      setUpdateState(!updateState);

    } catch (error) {
      console.log(error);
      setUpdateState(!updateState);

    }
  }

  return (
    <div>
      <h1>ToDo List</h1>
      {data.map((singleTodo) => {
        return (
          <div key={singleTodo._id}>
            <h2>{singleTodo.title}</h2>
            <h3>{singleTodo.body}</h3>
            <button
              onClick={() => delete_todo(singleTodo._id)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        );
      })}
      <div>
        <h1>Add a new Task</h1>
        <div className="d-flex justify-content-center">
          <form
            className="d-flex flex-column justify-content-center text-center align-items-center"
            onSubmit={handleFormSubmit}
          >
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Body:</label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
