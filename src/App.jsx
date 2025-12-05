"use client"
import React, { useEffect, useRef, useState } from "react";
import { TodoList } from "./components/TodoItem";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import themeFunction from "./components/ThemeToggle";



const App = () =>{
  const [todo, setTodo] = useState([])
  const [error, setError] = useState(false)
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("all")
  const dragPerson = useRef(0)
  const dragedOverPerson = useRef(0)
  const {theme, toggleTheme} = themeFunction()

  useEffect(()=>{
    const TodoList = async() =>{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`);
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setTodo(data.map(t => ({ ...t, completed: Boolean(t.completed) })));
      }catch (error){
        setError(true)
        console.log(error)
      }
    }
    TodoList()
  }, [])

  const AddTask = async(e)=>{
        if(e.key === "Enter"){
          if(!input.trim()){
            toast.warn("Task text cannot be empty")
            return 
          }

          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({text: input})
            })

            if(!response.ok){
              throw new Error("Failed to add task!")
            }
            const newtask = await response.json()
            setTodo([{ ...newtask, completed: Boolean(newtask.completed) }, ...todo]);
            setInput("")
          }catch (error) {
            toast.error("😭Oops!, Something went wrong while add task!");
            console.log(error)
          }
      }
  }

  const handleDelete = async ()=>{
      const completedTasks = todo.filter(i => Boolean(i.completed));
      if (completedTasks.length === 0) {
        toast.warning("🤞No completed tasks to clear!");
        return;
      }
    try {
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/clear`, {method: "DELETE"});
      if(!res.ok){
        throw new Error("Failed to clear completed tasks")
      }
      setTodo(todo.filter(i => !Boolean(i.completed)))
    } catch (error) {
      console.log(error)
      toast.error("🥶Failed to clear completed tasks!")
    }
  }

  useEffect(()=>{
    if(error){
      toast.error("Something went wrong while fetching todos.")
    }
  }, [error])

  const handleComplete = async (id)=>{

    const task = todo.find((t) => t.id === id)
    
    const updatedtask = !Boolean(task.completed);
    setTodo(todo.map((i) => i.id === id ? {...i, completed: updatedtask} : i));
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
        method: "PUT", 
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({completed: updatedtask})
      })
      if(!res.ok){
        throw new Error("Failed to Update Completed task!")
      }
      const result = await res.json()
      // toast.success(`Task: ${result.id} completed`)
    }catch(error){
      console.log(error)
      toast.error("Failed to Update Completed task!")
    }

  }
  const taskLeft = todo.filter(task => !task.completed).length;
  const filteredTodos = todo.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; 
  });

  const handleSort =()=>{
    const peopleClone = [...filteredTodos]
    const temp = peopleClone[dragPerson.current]
    peopleClone[dragPerson.current] = peopleClone[dragedOverPerson.current]
    peopleClone[dragedOverPerson.current] = temp;
    setTodo(peopleClone)
  }


  return(
    <div className="w-full h-screen flex flex-col relative reduce">
      <div className={`flex-1 bg-no-repeat bg-cover bg-center transition-opacity duration-800 ease-in-out ${ theme === "light" ? "bg-[url(/whitemood.png)] opacity-100" : "bg-[url(/darkmood.png)] opacity-100"}`}></div>


      <div className="absolute gap-2.5 flex flex-col left-1/2 top-1/2 h-auto transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg shadow-xl rounded-2xl container">
        <div className="w-full items-center justify-between flex">
          <h1 className="select-none text-[40px] text-white font-bold">UT-AB</h1>
          <span className="select-none" onClick={toggleTheme}>
            
           {theme === "light" ? (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z" fill="white"/>
            </svg>)
            :
            (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V1ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13ZM13 21C12.4477 21 12 21.4477 12 22V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V22C14 21.4477 13.5523 21 13 21ZM25 12C25.5523 12 26 12.4477 26 13C26 13.5523 25.5523 14 25 14H22C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12H25ZM5 13C5 12.4477 4.55228 12 4 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13ZM20.7782 3.80761C21.1687 3.41709 21.8019 3.41709 22.1924 3.80761C22.5829 4.19814 22.5829 4.8313 22.1924 5.22183L20.0711 7.34315C19.6805 7.73367 19.0474 7.73367 18.6569 7.34315C18.2663 6.95262 18.2663 6.31946 18.6569 5.92893L20.7782 3.80761ZM7.34315 18.6569C6.95262 18.2663 6.31946 18.2663 5.92893 18.6569L3.80761 20.7782C3.41709 21.1687 3.41709 21.8019 3.80761 22.1924C4.19814 22.5829 4.8313 22.5829 5.22183 22.1924L7.34315 20.0711C7.73367 19.6805 7.73367 19.0474 7.34315 18.6569ZM22.1924 20.7782C22.5829 21.1687 22.5829 21.8019 22.1924 22.1924C21.8019 22.5829 21.1687 22.5829 20.7782 22.1924L18.6569 20.0711C18.2663 19.6805 18.2663 19.0474 18.6569 18.6569C19.0474 18.2663 19.6805 18.2663 20.0711 18.6569L22.1924 20.7782ZM7.34315 7.34315C7.73367 6.95262 7.73367 6.31946 7.34315 5.92893L5.22183 3.80761C4.8313 3.41709 4.19814 3.41709 3.80761 3.80761C3.41709 4.19814 3.41709 4.8313 3.80761 5.22183L5.92893 7.34315C6.31946 7.73367 6.95262 7.73367 7.34315 7.34315Z" fill="white"/>
            </svg>)}

          </span>
        </div>

        <div className="w-full rounded-lg bg-white">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={AddTask} className={`w-full border-none ${theme === "light" ? "bg-white text-gray-700" : "bg-[#25273D] text-[#C8CBE7]"} p-3 focus:outline-violet-500`} type="text" placeholder="Create a new todo…"/>
        </div>


        <div className={`relative overflow-hidden flex flex-col h-[440px] w-full ${theme === "light" ? "bg-white" : "bg-[#25273D]"}`}>
          <div className={`flex-1 overflow-y-auto overflow-x-hidden scroll-auto flex flex-col w-full hideScrol`}>
            {error ? (
                <>
                  <p className="text-red-500 flex h-full items-center justify-center text-shadow-2xs w-full font-bold">Failed to load todos. Please try again.</p>
                </>
              ) 
              : 
               filteredTodos.length === 0 ? (
                <p className="text-gray-400 flex h-full items-center justify-center w-full font-semibold">
                  No task available.
                </p>
              ) 
              :
              (filteredTodos.map((item, i) => (
                  <div 
                    key={item.id || i} 
                    className="w-full gap-2.5 flex p-4 border-b border-[#E3E4F1]" 
                    draggable
                    onDragStart={() => (dragPerson.current = i)}
                    onDragEnter={()=> (dragedOverPerson.current = i)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <TodoList item={item} handleComplete={handleComplete} theme={theme}/>
                  </div>
                ))
              )}
          </div>



          <div className="flex p-[1em] border-t border-[#E3E4F1] items-center justify-between w-full">
            <div className="font-normal cursor-pointer text-[14px] text-[#9495A5] reducefont">
              {todo.length !== 0 ? `${taskLeft} items left` : "0 items left"}
            </div>
            <div className="flex items-center justify-center gap-5">
               <button
                  onClick={() => setFilter("all")}
                  className={`text-[14px] font-bold ${filter === "all" ? "text-[#3A7CFD]" : "text-[#9495A5]"} reducefont`}>
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`text-[14px] font-bold ${filter === "active" ? "text-[#3A7CFD]" : "text-[#9495A5]"} reducefont`}>
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`text-[14px] font-bold ${filter === "completed" ? "text-[#3A7CFD]" : "text-[#9495A5]"} reducefont`}>
                  Completed
                </button>
            </div>
            <button onClick={handleDelete} className="font-normal text-[14px] text-[#9495A5] reducefont">Clear Completed</button>
          </div>
        </div>

      </div>

      <div className={`flex-2 pb-2 flex align-end justify-center ${theme === "light" ? "bg-white" : "bg-[#171823]"}`}>
        <p className={`font-normal items-end flex text-[14px] ${theme === "light" ? "text-[#9495A5]" : "text-[#5B5E7E]"}`}>Drag and drop to reorder list</p>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000}/>
    </div>
  )
}

export default App;




