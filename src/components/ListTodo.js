import React from "react";
import ApiService from "../lib/service.js";
import { useState, useEffect } from "react";

export const ListTodo = () => {

  const [data, setData] = useState([]);
//   const [done, setdone] = useState(false)

  useEffect(() => {
    ApiService.get_todos().then((apiResponse) => {
    //   console.log(apiResponse);
      console.log(apiResponse.data);
      if (apiResponse.data.length) {
        setData(apiResponse.data);
      }
    });

  }, []);

  return <div>
  <h1>ToDo List</h1> 
      {data.map((singleTodo) => {
          return (
              <div key={singleTodo._id}>
              <h2>{singleTodo.title}</h2> 
              <h3>{singleTodo.body}</h3> 
              </div>
          )
      })}
  </div>;
};
