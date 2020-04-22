import React from "react";
import axios from "axios";
// import ApiService from "../lib/service.js";
import { useState } from "react";

export const CreateTodo = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleFormSubmit(event) {

    event.preventDefault();
    console.log(title);
    console.log(body);

    try {
      await axios.post("http://localhost:4000/api/v1/todos", { title, body })
      // await (ApiService.new_todo(), { title, body });
      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
  );
};
