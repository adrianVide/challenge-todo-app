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

  function doneHandler() {
    done
      ? ApiService.remove_from_done(props.match.params.id)
      : ApiService.mark_as_done(props.match.params.id);
    setDone(!done);
  }

  return (
    <div>
      <h1>ToDo List</h1>

      {data.map((singleTodo) => {
        return (
          <div key={singleTodo._id} className="card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{singleTodo.title}</h4>
                <p className="card-text">{singleTodo.body}</p>
                <div>
                  {singleTodo.done ? (
                    <button onCLick={doneHandler} className="btn btn-sm btn-success">done</button>
                  ) : (
                    <span className="btn btn-sm btn-warning">not yet done</span>
                  )}
                  <button
                    onClick={() => delete_todo(singleTodo._id)}
                    className="mx-2 btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
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
