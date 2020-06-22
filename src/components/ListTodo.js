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
      <h1 className='text-center'>ToDo List</h1>
      <div className="container">
        <div className="margin-top container col s12 l12 m4 xl5">
          <h5>Add a new Task</h5>
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
        <div className="col s12 l5 m8 row margin-top">
          {data.map((singleTodo) => {
            return (
              <div>
                <ul className="collection">
                  <li className="collection-item avatar">
                    <img
                      src={`https://loremflickr.com/320/180/${singleTodo.title}`}
                      alt=""
                      className="circle responsive-img"
                    />
                    <span className="title">{singleTodo.title}</span>
                    <p>{singleTodo.body}</p>
                    {/* <a href="#!" className="secondary-content">
                      <i className="material-icons">grade</i>
                    </a> */}
                    <div>
                      <span>
                        <button
                          onClick={() => delete_todo(singleTodo._id)}
                          className="waves-effect waves-light btn-small red inline"
                        >
                          Delete
                        </button>
                      </span>
                      <span>
                        <form
                          onChange={() => doneHandler(singleTodo)}
                          action=""
                          className="inline"
                        >
                          <p>
                            <label>
                              {singleTodo.done ? (
                                <div>
                                  <input
                                    // onClick={() => doneHandler(singleTodo)}
                                    type="checkbox"
                                    checked="checked"
                                  />
                                  <span>Done</span>
                                </div>
                              ) : (
                                <div>
                                  <input
                                    // onClick={() => doneHandler(singleTodo)}
                                    type="checkbox"
                                  />
                                  <span>To be done</span>
                                </div>
                              )}
                            </label>
                          </p>
                        </form>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
