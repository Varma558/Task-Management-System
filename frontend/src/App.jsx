import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");


  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  // CREATE TASK
  const handleSubmit = async (e) => {
  e.preventDefault();

  const taskData = {
    title,
    description,
    dueDate,
  };

  try {
    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/tasks/${editingId}`,
        taskData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/tasks",
        taskData
      );
    }

    fetchTasks();

    setTitle("");
    setDescription("");
    setDueDate("");
    setEditingId(null);

  } catch (error) {
    console.log(error);
  }
};

  //update
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setEditingId(task._id);
  };


  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };


  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          completed: !task.completed,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };


  // LOAD TASKS
  useEffect(() => {
    fetchTasks();
  }, []);


  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.completed;
    }

    if (filter === "Pending") {
      return !task.completed;
    }

    return true;
  });


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Task Management System
      </h1>


      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
          style={styles.input}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          required
          style={styles.textarea}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          required
          style={styles.input}
        />

        <button style={styles.addButton}>
      {editingId ? "Update Task" : "Add Task"}
      </button>
      </form>


      {/* FILTER BUTTONS */}
      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter("All")}
          style={styles.filterButton}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Completed")}
          style={styles.filterButton}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("Pending")}
          style={styles.filterButton}
        >
          Pending
        </button>
      </div>


      {/* TASK LIST */}
      <div>
        {filteredTasks.length === 0 && (
  <p
    style={{
      textAlign: "center",
      color: "#666",
    }}
  >
    No tasks found
  </p>
)}
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            style={styles.taskCard}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Due:
              {" "}
              {new Date(
                task.dueDate
              ).toLocaleDateString()}
            </p>

            <div
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: task.completed ? "green" : "orange",
              }}
            >
              Status: {task.completed ? "Completed" : "Pending"}
            </div>

  <div style={styles.buttonGroup}>

  <button
    onClick={() => handleEdit(task)}
    style={styles.editButton}
  >
    Edit
  </button>
  
  <button
    onClick={() =>
      toggleComplete(task)
    }
    style={styles.completeButton}
  >
    Toggle Status
  </button>

  <button
    onClick={() =>
      deleteTask(task._id)
    }
    style={styles.deleteButton}
  >
    Delete
  </button>

</div>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#222",
    fontSize: "40px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },

  input: {
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  textarea: {
    padding: "14px",
    fontSize: "16px",
    minHeight: "120px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  addButton: {
    padding: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  filterContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
  },

  filterButton: {
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  taskCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "15px",
  },

  completeButton: {
    padding: "10px 14px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "10px 14px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editButton: {
  padding: "10px 14px",
  backgroundColor: "orange",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
},
};


export default App;