import React from "react";
import ApiService from "../lib/service.js";
import axios from "axios";
import { useState, useEffect } from "react";

export const ListTodo = (props) => {
  const [data, setData] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    ApiService.get_todos().then((apiResponse) => {
      //   console.log(apiResponse);
      // console.log(apiResponse.data);
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

  async function doneHandler(id) {
    ApiService.done_handler(id);

    await setUpdateState(!updateState);
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <div className="row container">
        <div className="col s12 l4 m4 ">
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

              <button
                type="submit"
                value="Add task"
                class="btn-floating btn-large"
              >
                <i class="material-icons">add</i>
              </button>
            </form>
          </div>
        </div>
        {/* <div className="row">
        <div className="col s12 m6 l4 xl4"> */}
        <div className="col s12 l8 m8 row">
          {data.map((singleTodo) => {
            return (
              <div className="card-horizontal col m6 s12 l6 xl6" key={singleTodo.id}>
                <div className="card-image">
                  <img
                    src={`https://loremflickr.com/320/180/${singleTodo.title}`}
                  />
                  <span className="card-title">{singleTodo.title}</span>
                  <a className="btn-floating halfway-fab waves-effect waves-light"></a>
                </div>
                <div className="card-content">
                  <p>{singleTodo.body}</p>
                  <button
                    onClick={() => delete_todo(singleTodo._id)}
                    className="waves-effect waves-light btn-small red"
                  >
                    Delete
                  </button>
                  {singleTodo.done ? (
                    <div>
                      <p>
                        <label>
                          <input
                            onClick={() => doneHandler(singleTodo)}
                            type="checkbox"
                          />
                          <span>Done</span>
                        </label>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <label>
                          <input
                            onClick={() => doneHandler(singleTodo)}
                            type="checkbox"
                          />
                          <span>To be done</span>
                        </label>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};
