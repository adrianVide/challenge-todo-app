import axios from "axios";

class apiService {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000/api/v1",
      withCredentials: true,
    });
  }

  get_todos() {
    return this.auth.get("/todos");
  }
  
  new_todo() {
    return this.auth.post("/todos");
  }

  delete_todo(id) {
    return this.auth.delete(`/todos/${id}`);
  }

  done_handler(object) {
    
    const toDoID = object._id
    const toDoDone = object.done
    // console.log('etsoy en service!', object.toDoID, object.toDoDone);
    return this.auth.put(`/todos/done/${toDoID}`,{toDoDone});
  }


}

const ApiService = new apiService();
export default ApiService;
