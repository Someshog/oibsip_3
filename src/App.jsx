import { useState } from "react";
import "./App.css";
import tick from "./assets/tick.svg";
import del from "./assets/delete.svg";
import cross from "./assets/cross.svg";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); // State for current todo input
  const [todos, setTodos] = useState([]); // State for list of todos
  const [done, setDone] = useState([]); // State for completed todos
  const [showdropdown, setShowdropdown] = useState(false); // State for showing completed tasks drawer
  const [styles, setStyles] = useState({
    // State for dynamic theming
    backgroundColor: "black",
    color: "white",
    filter: "invert(0)",
  });

  // Function to handle toggling of todo completion
  const handlechange = (e) => {
    let newtodos = [...todos];
    let id = e.target.alt;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    let completed = newtodos.filter((item) => item.iscompleted === true);
    setTodos(newtodos);
    setDone(completed);
  };

  // Function to handle deletion of a todo
  const handledelete = async (e) => {
    let id = e.target.alt;
    let newtodos = todos.filter((e) => e.id !== id);
    let completed = newtodos.filter((item) => item.iscompleted === true);
    setDone(completed);
    setTodos(newtodos);
  };

  // Function to toggle between light and dark theme
  const toggletheme = (e) => {
    if (styles.color == "white") {
      setStyles({
        backgroundColor: "white",
        color: "black",
        filter: "invert(1)",
      });
      {
        document.querySelectorAll(".toggle-label")[0].style.backgroundColor =
          "black";
      }
    } else {
      setStyles({
        backgroundColor: "black",
        color: "white",
        filter: "invert(0)",
      });
      {
        document.querySelectorAll(".toggle-label")[0].style.backgroundColor =
          "white";
        document.querySelectorAll(".toggle-label")[0].style.backgroundColor =
          "white";
      }
    }
  };

  return (
    <>
      {/* Main container with dynamic background and text color */}
      <div
        id="root"
        className="root"
        style={{ backgroundColor: styles.backgroundColor, color: styles.color }}
      >
        <input
          type="checkbox"
          onClick={toggletheme}
          id="toggle"
          className="toggle-checkbox"
        ></input>
        <label
          htmlFor="toggle"
          className="toggle-label absolute top-8 left-10 "
        ></label>

        {/* Button to toggle completed tasks drawer */}
        <button
          onClick={() => {
            setShowdropdown(!showdropdown);
          }}
          className="absolute right-8 top-7 text-white font-medium rounded-3xl text-sm px-5 py-2 bg-purple-500"
        >
          Completed tasks
        </button>

        {/* Main content container */}
        <div className="container md:w-[50%] lg:w-[50%] xl:w-[40%] pt-5 sm:pt-0 flex flex-col items-center justify-center text-white gap-y-8  mx-auto h-[100vh] ">
          <h1
            className="header transition-all duration-500 ease-linear text-6xl sm:top-11 md:text-7xl lg:text-8xl"
            style={{
              backgroundColor: styles.backgroundColor,
              color: styles.color,
            }}
          >
            Just do it.
          </h1>

          {/* Todo input and submit button container */}
          <div className="w-full h-14 flex gap-1 justify-center ">
            <input
              id="inputbox"
              placeholder="Enter Goals!"
              value={todo}
              style={{
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                border: `2px solid ${styles.color}`,
              }}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              className="text-xl px-3.5 transition-all duration-500 ease-linear w-full h-full rounded-l-3xl border-none text-black"
            />
            <button
              onClick={() => {
                setTodos([
                  ...todos,
                  { id: uuidv4(), name: todo, iscompleted: false },
                ]);
                setTodo("");
              }}
              className="submit hover:bg-purple-500 border h-full flex justify-center items-center w-1/4 rounded-r-3xl bg-purple-400 font-bold sm:text-xl transition-all"
              style={{ border: `2px solid ${styles.color}` }}
            >
              I got this!
            </button>
          </div>

          {/* Container for displaying todos */}
          <div className="todos text-2xl sm:mb-0 items-center gap-2 flex flex-col w-full h-1/2 overflow-auto">
            {todos.map((item) => (
              <div
                key={item.id}
                className="todo text-xl transition-all duration-500 ease-linear bg-opacity-45 w-[80%] h-[17%] 2xl:h-[13%] items-center p-2 bg-gray-500 rounded-3xl justify-between flex"
                style={{
                  backgroundColor: styles.backgroundColor,
                  color: styles.color,
                  border: `3px solid ${styles.color}`,
                }}
              >
                <div
                  className={
                    item.iscompleted
                      ? "line-through decoration-purple-500  decoration-4"
                      : ""
                  }
                  onClick={(e) => { // To EDIT todo's on clicking on them.
                    if(!item.iscompleted){
                    setTodo(`${item.name}`);
                    let newtodos = todos.filter((e) => e.id !== item.id);
                    setTodos(newtodos);}
                  }}
                >
                  {item.name}
                </div>

                {/* Buttons for marking todo as done and deleting todo */}
                <div className="buttons flex items-center justify-center">
                  <button onClick={handlechange}>
                    <img
                      width="30px"
                      src={tick}
                      alt={item.id}
                      style={{ filter: styles.filter }}
                    />
                  </button>
                  <button onClick={handledelete}>
                    <img
                      width="30px"
                      src={del}
                      alt={item.id}
                      style={{ filter: styles.filter }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer for displaying completed tasks */}
        <div
          style={{
            backgroundColor: styles.backgroundColor,
            color: styles.color,
          }}
          className={`fixed border text-center w-full top-0 sm:w-[28%] md:w-[28%] 2xl:w-[20%] right-0 h-full ${
            showdropdown ? "-translate-x" : "translate-x-full"
          } p-4 overflow-y-auto transition-transform`}
        >
          <img
            className="cursor-pointer"
            width={40}
            src={cross}
            onClick={() => {
              setShowdropdown(false);
            }}
            style={{ filter: styles.filter }}
            alt=""
          />

          {/* Container for displaying list of completed tasks */}
          <div className="text-3xl m-4">Completed Tasks</div>
          <div className="py-3 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                {done.map((item) => (
                  <div
                    key={item.id}
                    className="m-auto my-2 text-xl w-[90%] h-12 items-center rounded-3xl justify-center flex "
                    style={{
                      backgroundColor: styles.backgroundColor,
                      color: styles.color,
                      border: `3px solid ${styles.color}`,
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <footer className="absolute bottom-0 m-auto text-sm 2xl:text-lg text-center w-full h-8">
          <p>&copy; 2024 Just do it. {"(Todo App)"} All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App; // Exporting the App component
