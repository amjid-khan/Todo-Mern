import { useState } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

function Todo() {
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [error , setError] = useState("")

  const handleAdd = () => {
  if (!itemName || !date) {
  setError("Please fill in both fields");
  return; // Stop here
}
  axios.post("http://localhost:8000/api/todos/insert", {
    itemName,
    date
  })
  .then(res => {
    console.log("Todo added:", res.data);
    setItemName("");
    setDate("");
    toast.success("Added Todo Successfully")
  })
  .catch(err => {
       console.error("Error adding todo:", err.response ? err.response.data : err.message);
  });
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
        <button onClick={handleAdd}>Add</button>
          {error && <p style={{ color: "red" }}>{error}</p>}

   
      </div>
    </div>
  );
}

export default Todo;
