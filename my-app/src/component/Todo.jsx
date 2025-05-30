import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

function Todo() {
  const [getTodos, setGetTodos] = useState([]);
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!itemName || !date) {
      setError("Please fill in both fields");
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/insert", {
        itemName,
        date,
      })
      .then((res) => {
        console.log("Todo added:", res.data);
        setItemName("");
        setDate("");
        toast.success("Added Todo Successfully");
        getAllTodos()
      })
      .catch((err) => {
        console.error(
          "Error adding todo:",
          err.response ? err.response.data : err.message
        );
      });
  };

  const getAllTodos = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/todos/view");
      setGetTodos(result.data.data);
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const deleteTodos = async (id) => {
    await axios.delete(`http://localhost:8000/api/todos/delete/${id}`)
      .then(() => {
        toast.success("Item Deleted Successfully")
        getAllTodos()
    })
  }

  return (
    <div id="todo">
      <div className="todo-content">
        <ToastContainer />
        <h2>TODO-APP</h2>

        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          type="text"
          placeholder="Enter your todos"
        />

        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
        <button id="add" onClick={handleAdd}>Add</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {getTodos.length === 0 ? <p>Add Todos To Your List</p> : <p>Your Todos List Here</p>}
      {getTodos.map((item) => {
        return (
          <div id="todo-list" key={item._id}>
            <p>{item.itemName}</p>
            <p>{item.date}</p>
            <div className="btns">
              <button id="dlt-btn" onClick={()=> deleteTodos(item._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
