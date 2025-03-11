import React, { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import FilterSelect from "./FilterSelect";

// define Task type
interface Task {
    id: number;
    subject: string;
    desc: string,
    completed: boolean;
    inHistory: boolean;
    showDesc: boolean;
}

const ToDoApp: React.FC = () => {

    // initiate the tasks and history arrays according to local storage data
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [history, setHistory] = useState<Task[]>(() => {
        const savedHistory = localStorage.getItem("history");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [filterTerm, setFilterTerm] = useState("All");// => initiate filter term to display all


    // update tasks on local storage on every relevant change
    useEffect(() => {
        try{
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        catch(error){
            console.error("Error fetching data from local storage:\n",error);
            return alert("Something went wrong, try reload the page");
        }
    }, [tasks]);
    useEffect(() => {
        try{
            localStorage.setItem("history", JSON.stringify(history));
        }
        catch(error){
            console.error("Error fetching data from local storage:\n",error);
            return alert("Something went wrong, try reload the page");
        }
    }, [history]);


    // if filter is history => rturns the history array
    // else filter the tasks according to filter selected, for all => returns all
    // else for open filter returns the completed=false, and otherwise for close
    const filteredTasks = filterTerm === "History" ? history : tasks.filter(task => {
        if (filterTerm === "All") return true;
        return filterTerm === "Open" ? !task.completed : task.completed;
    });

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="upperSection">
                <AddTaskForm setTasks={setTasks} tasks={tasks}/>
                <FilterSelect setFilterTerm={setFilterTerm}/>
            </div>
            <ul>
                {filteredTasks.length>0 ? filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} setHistory={setHistory} history={history}/>
                )): <h1>Empty...</h1>}
            </ul>
        </div>
    );
};

export default ToDoApp;
