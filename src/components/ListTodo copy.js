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

    
      {data.map((singleTodo) => {
        return (
          <div >
            <div className="row">
              <div className="col s12 m6">
                <div className="card" key={singleTodo.id}>
                  <div className="card-image">
                    <img src="images/sample-1.jpg" />
                    <span className="card-title">Card Title</span>
                    <a className="btn-floating halfway-fab waves-effect waves-light red">
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
                    </a>
                  </div>
                  <div className="card-content">
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <li className="collection-item avatar">
              <img src="" className="circle" alt="" />
              <span className="title">Title</span>
              <p>
                First Line <br />
                Second Line
              </p>

              <button
                onClick={() => delete_todo(singleTodo._id)}
                className="btn-floating btn-large waves-effect waves-light red"
              >
                Delete
              </button>
              <a href="#!" className="secondary-content">
                <i className="material-icons">grade</i>
              </a>
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
            </li>
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
